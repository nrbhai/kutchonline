import json
import csv
import re
import os
import shutil

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
csv_path = os.path.join(ROOT_DIR, "data.csv")
json_path = os.path.join(ROOT_DIR, "src", "data", "data.json")
backup_path = os.path.join(ROOT_DIR, "src", "data", "data.json.bak")

# 1. Back up existing data.json
print(f"Creating backup of {json_path} to {backup_path}...")
shutil.copy2(json_path, backup_path)

# 2. Load JSON categories
with open(json_path, 'r', encoding='utf-8') as f:
    json_data = json.load(f)

# Clear providers in the working list to rebuild them from scratch
for cat in json_data:
    cat['providers'] = []

# Build helper dictionaries for mapping
# Group by lowercase name
json_cats_by_name = {}
for cat in json_data:
    name_clean = cat['name'].strip().lower()
    if name_clean not in json_cats_by_name:
        json_cats_by_name[name_clean] = []
    json_cats_by_name[name_clean].append(cat)

# Manual overrides for duplicates or naming variations in data.csv
manual_overrides = {
    "ca ( chartered accountants )": "ca",
    "jewellers": "jeweller",
    "laboratory": "laboratories",
    "real estate agents": "estate-agent",
    "medical store": "medical-store",
    "homeopathy": "homeopathy-doctors",
    "wireman": "electrician",
    "sanetary": "sanatary",
    "dance classes": "choreographers-dance",
    "bakery & cake shop": "bakery",
    "home baker": "bakery",
    "computer laptop sales & repair": "computer-sales-repair",
    "hair salon ( m/f )": "hair-stylist-m-f",
    "home furnishing & sofa": "foam-sofa-items",
    "auto accessories": "car-accessories"
}

# Helper to format names to Proper Case while preserving acronyms
def to_proper_case(name_str):
    if not name_str:
        return ""
    # Acronyms list that should remain capitalized
    acronyms = {"CA", "AC", "RO", "EV", "RTO", "GST", "MBBS", "MD", "III", "IV", "I", "II", "CCTV", "HDFC", "SBI", "BOB", "BOI", "BMCB", "ICICI", "IT", "GPS", "LED", "TV", "UPS", "PG", "R", "K"}
    # Conjunctions list that should stay lowercase in the middle of sentences
    conjunctions = {"and", "or", "but", "for", "with", "at", "by", "of", "to", "in", "on", "a", "an", "the", "&"}
    
    words = name_str.strip().split()
    proper_words = []
    
    for idx, word in enumerate(words):
        clean_word = re.sub(r'[^a-zA-Z]+', '', word)
        
        # If it is an acronym, keep it in uppercase
        if clean_word.upper() in acronyms:
            proper_words.append(re.sub(r'[a-zA-Z]+', lambda m: m.group(0).upper(), word))
        # If it is a conjunction (except at the start), keep it lowercase
        elif clean_word.lower() in conjunctions and idx > 0 and idx < len(words) - 1:
            proper_words.append(word.lower())
        else:
            # Capitalize the first alphabetical character, lowercase the rest
            match = re.search(r'[a-zA-Z]', word)
            if match:
                first_letter_idx = match.start()
                proper_words.append(word[:first_letter_idx] + word[first_letter_idx].upper() + word[first_letter_idx+1:].lower())
            else:
                proper_words.append(word)
                
    return " ".join(proper_words)

# Helper to find target category in JSON
def find_target_category(csv_cat_name):
    csv_cat_clean = csv_cat_name.strip()
    csv_cat_lower = csv_cat_clean.lower()
    
    # 1. Manual override check
    if csv_cat_lower in manual_overrides:
        target_id = manual_overrides[csv_cat_lower]
        target_cat = next((c for c in json_data if c['id'] == target_id), None)
        if target_cat:
            return target_cat
            
    # 2. Exact name match check
    if csv_cat_lower in json_cats_by_name:
        matched_cats = json_cats_by_name[csv_cat_lower]
        if len(matched_cats) == 1:
            return matched_cats[0]
        else:
            return matched_cats[0]
            
    # 3. Exact ID match (check if slugified CSV category matches JSON ID)
    slugified = re.sub(r'[^a-z0-9]+', '-', csv_cat_lower).strip('-')
    matched_id = next((c for c in json_data if c['id'] == slugified), None)
    if matched_id:
        return matched_id
        
    # 4. Singular / Plural check
    for cat in json_data:
        n = cat['name'].lower().strip()
        if n == csv_cat_lower + "s" or csv_cat_lower == n + "s" or (n.replace("ies", "y") == csv_cat_lower) or (csv_cat_lower.replace("ies", "y") == n):
            return cat
            
    return None

# 3. Read and process CSV
print(f"Reading listings from {csv_path}...")
with open(csv_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    csv_rows = list(reader)

total_processed = 0
total_mapped = 0
unmapped_categories = set()

for idx, row in enumerate(csv_rows):
    csv_cat = row.get('Category', '').strip()
    if not csv_cat:
        continue

    target_cat = find_target_category(csv_cat)
    total_processed += 1

    if target_cat is None:
        unmapped_categories.add(csv_cat)
        continue

    # Parse tags
    details = row.get('Tag', '').strip()
    tags = []
    if details:
        tags = [t.strip() for t in details.split(',') if t.strip()]

    # Standardize phone verification and ratings
    verified = "Yes" if row.get('Verified', '').strip().lower() == 'yes' else ""
    top_rated = "Yes" if row.get('Ratings', '').strip().lower() == 'yes' else ""

    # Format name in proper case
    raw_name = row.get('Name', '').strip()
    proper_name = to_proper_case(raw_name)

    # Formulate provider dictionary
    provider = {
        "name": proper_name,
        "phone": row.get('Phone', '').strip(),
        "area": row.get('Area', '').strip() or row.get('Locality', '').strip(),
        "tags": tags,
        "webpage": row.get('webpage', '').strip(),
        "badge": "",
        "verified": verified,
        "top_rated": top_rated,
        "address": row.get('Address', '').strip(),
        "place_id": row.get('PlaceID', '').strip()
    }
    
    # Append to target category
    target_cat['providers'].append(provider)
    total_mapped += 1

# Output mapping stats
print(f"Processed {total_processed} rows.")
print(f"Successfully mapped {total_mapped} listings to categories.")

if unmapped_categories:
    print(f"WARNING: The following {len(unmapped_categories)} categories could not be mapped:")
    for uc in sorted(unmapped_categories):
        print(f" - {uc}")
else:
    print("All categories mapped successfully with zero warnings.")

# 4. Save updated JSON data
print(f"Writing updated database to {json_path}...")
os.makedirs(os.path.dirname(json_path), exist_ok=True)
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(json_data, f, indent=2, ensure_ascii=False)

print("Database update completed successfully!")

# 5. Refresh the window.categories block in public/assets/js/data.js (drives the /bhuj/ homepage grid)
data_js_path = os.path.join(ROOT_DIR, "public", "assets", "js", "data.js")
with open(data_js_path, 'r', encoding='utf-8', newline='') as f:
    data_js = f.read()
nl = '\r\n' if '\r\n' in data_js else '\n'
start = data_js.index('window.categories = [')
end = data_js.index('];', start) + 2
categories_js = [
    {"id": c['id'], "name": c['name'], "icon": c['icon'], "gu_name": c['gu_name'], "count": len(c['providers'])}
    for c in json_data if c['providers']
]
block = 'window.categories = ' + json.dumps(categories_js, indent=2, ensure_ascii=False).replace('\n', nl) + ';'
with open(data_js_path, 'w', encoding='utf-8', newline='') as f:
    f.write(data_js[:start] + block + data_js[end:])
print(f"Refreshed {len(categories_js)} categories in {data_js_path}")
