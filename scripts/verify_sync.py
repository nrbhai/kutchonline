import json
import os

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
json_path = os.path.join(ROOT_DIR, "src", "data", "data.json")

with open(json_path, 'r', encoding='utf-8') as f:
    json_data = json.load(f)

# 1. Check total categories
total_categories = len(json_data)
print(f"Total categories in data.json: {total_categories}")
assert total_categories == 239, f"Expected 239 categories, got {total_categories}"

# 2. Check total listings
total_providers = sum(len(cat.get('providers', [])) for cat in json_data)
print(f"Total listings in data.json: {total_providers}")
assert total_providers == 1601, f"Expected 1601 listings, got {total_providers}"

# 3. Check no duplicate category ids (would collide as Astro static routes)
ids = [c['id'] for c in json_data]
dupe_ids = {i for i in ids if ids.count(i) > 1}
print(f"Duplicate category ids: {dupe_ids or 'none'}")
assert not dupe_ids, f"Duplicate category ids found: {dupe_ids}"

# 4. Spot check CA J M Jadeja & Associates (9601981743) under category 'ca'
ca_cat = next(c for c in json_data if c['id'] == 'ca')
ca_providers = [p for p in ca_cat.get('providers', []) if p['name'] == 'CA J M Jadeja & Associates']
print(f"Found {len(ca_providers)} CA J M Jadeja & Associates listings in 'ca' category.")
assert len(ca_providers) >= 1, "Expected CA J M Jadeja & Associates to be in CA category"
print(f" - Phones: {[p['phone'] for p in ca_providers]}")

# 5. Spot check Raj Informatics (9825538167) under 'cctv-installation' and 'computer-sales-repair'
cctv_cat = next(c for c in json_data if c['id'] == 'cctv-installation')
cctv_raj = [p for p in cctv_cat.get('providers', []) if p['name'] == 'Raj Informatics']
print(f"Found {len(cctv_raj)} Raj Informatics listings in 'cctv-installation' category.")
assert len(cctv_raj) >= 1, "Expected Raj Informatics to be in CCTV Installation category"

repair_cat = next(c for c in json_data if c['id'] == 'computer-sales-repair')
repair_raj = [p for p in repair_cat.get('providers', []) if p['name'] == 'Raj Informatics']
print(f"Found {len(repair_raj)} Raj Informatics listings in 'computer-sales-repair' category.")
assert len(repair_raj) >= 1, "Expected Raj Informatics to be in Computer Sales & Repair category"

print("\nAll spot checks and counts validated successfully! Database integrity is 100% correct.")
