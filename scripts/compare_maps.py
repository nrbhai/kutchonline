from PIL import Image, ImageDraw
import os

map_path = r"c:\website_project\kutchonline\public\assets\public\images\kutch-map-old.png"
output_path = r"C:\Users\Niraj\.gemini\antigravity\brain\76a3fe66-2b96-4840-9215-c15d77db548b\verified_dark_map.png"

img = Image.open(map_path).convert("RGB")
draw = ImageDraw.Draw(img)

# New calibrated coordinates for the original dark map
dark_coords = {
    "bhuj": (50.0, 50.0),
    "mandvi": (36.3, 61.2),        # moved north to land
    "mundra": (52.0, 62.0),        # moved north to land
    "kadiadhrow": (43.5, 45.0),
    "roadtoheaven": (56.8, 31.0),
    "dholavira": (62.0, 29.0),
    "anjar": (61.5, 55.5),
    "gandhidham": (65.5, 57.0),
    "jakhau": (20.8, 50.5),
    "lakhpat": (20.0, 35.4),       # moved east to land
    "matanamadh": (25.8, 41.5),
    "dhordo": (44.2, 38.5),
    "narayansarovar": (16.8, 39.2)  # moved east to land
}

for name, (px, py) in dark_coords.items():
    cx = int(px * 1024 / 100)
    cy = int(py * 1024 / 100)
    
    # Draw green dot
    draw.ellipse([(cx - 6, cy - 6), (cx + 6, cy + 6)], fill=(0, 255, 0))
    draw.text((cx + 10, cy - 5), name, fill=(100, 255, 100))

img.save(output_path)
print("Saved verified dark map with pins to verified_dark_map.png")
