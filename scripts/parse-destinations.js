// scripts/parse-destinations.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = 'C:\\website_project\\mykutch\\site\\destinations';
const OUT_DIR = path.join(__dirname, '..', 'src', 'data');
const OUT_FILE = path.join(OUT_DIR, 'destinations.json');

// Ensure output directory exists
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Load translations dictionary
const LANG_FILE = 'C:\\website_project\\mykutch\\site\\lang\\en.json';
let translations = {};
if (fs.existsSync(LANG_FILE)) {
  try {
    translations = JSON.parse(fs.readFileSync(LANG_FILE, 'utf8'));
  } catch (e) {
    console.error('Failed to parse translation file:', e);
  }
}

function getTranslation(key) {
  if (!key) return '';
  const parts = key.split('.');
  let current = translations;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return '';
    }
  }
  return typeof current === 'string' ? current.trim() : '';
}

function translateHTML(block) {
  if (!block) return '';
  let result = block;
  const tagRegex = /<([a-z0-9]+)\b([^>]*?)data-i18n="([^"]+)"([^>]*?)>([\s\S]*?)<\/\1>/gi;
  
  let count = 0;
  while (count < 100) {
    let replaced = false;
    result = result.replace(tagRegex, (match, tagName, before, key, after, inner) => {
      const trans = getTranslation(key);
      if (trans) {
        replaced = true;
        return `<${tagName}${before}data-i18n="${key}"${after}>${trans}</${tagName}>`;
      }
      return match;
    });
    if (!replaced) break;
    count++;
  }
  return result;
}

function getSlug(fileName) {
  let slug = fileName.replace('.html', '').toLowerCase().trim();
  if (slug === 'dhordo-white-rann') return 'dhordo';
  if (slug === 'kadia-dhrow') return 'kadiadhrow';
  if (slug === 'road-to-heaven') return 'roadtoheaven';
  if (slug === 'mata-na-madh') return 'matanamadh';
  if (slug === 'narayan-sarovar-koteshwar') return 'narayansarovar';
  return slug;
}

// Regex Helpers for extracting HTML content blocks
function matchGroup(html, regex, fallback = '') {
  const match = html.match(regex);
  return match && match[1] ? match[1].trim() : fallback;
}

function matchAll(html, regex) {
  const results = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    results.push(match[1] || match[0]);
  }
  return results;
}

// Clean copied image paths (making them root-relative)
function cleanImagePath(imgPath) {
  if (!imgPath) return '';
  return imgPath.replace(/^\.\.\/assets\/images\//, '/assets/images/')
                .replace(/^\/assets\/images\//, '/assets/images/')
                .trim();
}

function parseHTMLFile(filePath, fileName) {
  let html = fs.readFileSync(filePath, 'utf8');
  const slug = getSlug(fileName);

  // Translate all elements with data-i18n attributes in the raw HTML string
  html = translateHTML(html);

  // Extract Metadata
  const metaTitle = matchGroup(html, /<title[^>]*>([\s\S]*?)<\/title>/);
  const metaDesc = matchGroup(html, /<meta\s+content="([^"]*)"\s+data-i18n="[^"]*"\s+name="description"\/?>/) || 
                   matchGroup(html, /<meta\s+name="description"\s+content="([^"]*)"\/?>/);
  const metaKeywords = matchGroup(html, /<meta\s+content="([^"]*)"\s+name="keywords"\/?>/) ||
                       matchGroup(html, /<meta\s+name="keywords"\s+content="([^"]*)"\/?>/);

  // Extract Hero details
  const heroTitle = matchGroup(html, /<h1 class="hero-title-metallic-gold"[^>]*>([\s\S]*?)<\/h1>/);
  const rawHeroBg = matchGroup(html, /style="background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/);
  const heroImage = cleanImagePath(rawHeroBg);

  // Extract Lead text
  const leadText = matchGroup(html, /<p class="lead-text"[^>]*>([\s\S]*?)<\/p>/);

  // Extract Who should visit
  let whoShouldVisit = [];
  const whoVisitSection = matchGroup(html, /<!-- WHO_VISIT_LIST -->[\s\S]*?<ul class="styled-list">([\s\S]*?)<\/ul>/) ||
                         matchGroup(html, /who_should_visit\.title"[^>]*>[\s\S]*?<ul class="styled-list">([\s\S]*?)<\/ul>/);
  if (whoVisitSection) {
    const items = whoVisitSection.split('</li>');
    items.forEach(item => {
      const match = item.match(/<li[^>]*>([\s\S]*)/) || item.match(/>([\s\S]*)/);
      if (match && match[1]) {
        whoShouldVisit.push(match[1].trim());
      }
    });
  }

  // Extract How to reach
  let howToReach = [];
  const howReachSection = matchGroup(html, /<!-- HOW_REACH_LIST -->[\s\S]*?<ul class="styled-list">([\s\S]*?)<\/ul>/) ||
                         matchGroup(html, /how_to_reach\.title"[^>]*>[\s\S]*?<ul class="styled-list">([\s\S]*?)<\/ul>/);
  if (howReachSection) {
    const items = howReachSection.split('</li>');
    items.forEach(item => {
      const match = item.match(/<li[^>]*>([\s\S]*)/) || item.match(/>([\s\S]*)/);
      if (match && match[1]) {
        howToReach.push(match[1].trim());
      }
    });
  }

  // Extract Landmarks & Heritage
  let landmarks = [];
  const landmarksBlock = matchGroup(html, /Landmarks & Heritage\s*<\/h\d>[\s\S]*?<div class="grid-2">([\s\S]*?)<\/div>\s*<\/section>/i) ||
                         matchGroup(html, /<!-- LANDMARKS_GRID -->([\s\S]*?)<\/section>/) ||
                         matchGroup(html, /landmark_title"[^>]*>[\s\S]*?<!-- LANDMARKS_GRID -->[\s\S]*?<div class="grid-2">([\s\S]*?)<\/div>\s*<\/section>/);
  if (landmarksBlock) {
    const parts = landmarksBlock.split(/class="(?:attraction-card|nearby-card)"/);
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      const img = cleanImagePath(matchGroup(part, /src="([^"]*)"/));
      const title = matchGroup(part, /<h3[^>]*>([\s\S]*?)<\/h3>/);
      const desc = matchGroup(part, /<p[^>]*>([\s\S]*?)<\/p>/);
      if (title || desc) {
        landmarks.push({ img, title, desc });
      }
    }
  }

  // Extract Tips & Advice
  let tips = [];
  const tipsBlock = matchGroup(html, /Curated Local Advice\s*<\/h\d>([\s\S]*?)<\/section>/i) ||
                    matchGroup(html, /<!-- TIPS_GRID -->([\s\S]*?)<\/section>/) ||
                    matchGroup(html, /tips_title"[^>]*>([\s\S]*?)<\/section>/);
  if (tipsBlock) {
    const parts = tipsBlock.split(/class="tip-item"/);
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      const title = matchGroup(part, /<h4[^>]*>([\s\S]*?)<\/h4>/);
      const desc = matchGroup(part, /<p[^>]*>([\s\S]*?)<\/p>/);
      if (title || desc) {
        tips.push({ title, desc });
      }
    }
  }

  // Extract Shopping & Bazaars
  let shopping = [];
  const shoppingBlock = matchGroup(html, /Shopping & Bazaars\s*<\/h\d>[\s\S]*?<ul class="styled-list">([\s\S]*?)<\/ul>/i) ||
                        matchGroup(html, /<!-- SHOPPING_LIST -->([\s\S]*?)<\/ul>/) ||
                        matchGroup(html, /shopping_title"[^>]*>[\s\S]*?<ul class="styled-list">([\s\S]*?)<\/ul>/);
  if (shoppingBlock) {
    const items = shoppingBlock.split('</li>');
    items.forEach(item => {
      const match = item.match(/<li[^>]*>([\s\S]*)/) || item.match(/>([\s\S]*)/);
      if (match && match[1]) {
        shopping.push(match[1].trim());
      }
    });
  }

  // Extract Local Eats
  let eats = [];
  const eatsBlock = matchGroup(html, /Local Eats\s*<\/h\d>[\s\S]*?<ul class="styled-list">([\s\S]*?)<\/ul>/i) ||
                    matchGroup(html, /<!-- EATS_LIST -->([\s\S]*?)<\/ul>/) ||
                    matchGroup(html, /eats_title"[^>]*>[\s\S]*?<ul class="styled-list">([\s\S]*?)<\/ul>/);
  if (eatsBlock) {
    const items = eatsBlock.split('</li>');
    items.forEach(item => {
      const match = item.match(/<li[^>]*>([\s\S]*)/) || item.match(/>([\s\S]*)/);
      if (match && match[1]) {
        eats.push(match[1].trim());
      }
    });
  }

  // Extract When to Visit
  const whenToVisit = matchGroup(html, /When to Visit\s*<\/h\d>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i) ||
                      matchGroup(html, /when_title"[^>]*>[\s\S]*?<p[^>]*data-i18n="[^"]*when_visit_desc"[^>]*>([\s\S]*?)<\/p>/) ||
                      matchGroup(html, /when_title"[^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/);

  // Extract Suggested Itinerary
  const itinerary = matchGroup(html, /Suggested Itinerary\s*<\/h\d>[\s\S]*?<div class="itinerary-grid">([\s\S]*?)<\/div>/i) ||
                    matchGroup(html, /itinerary_title"[^>]*>[\s\S]*?<div class="itinerary-grid">([\s\S]*?)<\/div>/);

  // Extract Map iframe source
  const mapIframe = matchGroup(html, /<iframe[^>]*src="([^"]*)"[^>]*>/);

  // Extract Gallery images
  let gallery = [];
  const galleryBlock = matchGroup(html, /<div class="gallery-grid">([\s\S]*?)<\/div>/);
  if (galleryBlock) {
    const imgRegex = /<img\s+alt="([^"]*)"\s+src="([^"]*)"\/?>|<img\s+src="([^"]*)"\s+alt="([^"]*)"\/?>/g;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(galleryBlock)) !== null) {
      const alt = imgMatch[1] || imgMatch[4] || 'Kutch Gallery';
      const src = cleanImagePath(imgMatch[2] || imgMatch[3]);
      gallery.push({ src, alt });
    }
  }

  // Extract Nearby Places
  let nearby = [];
  const nearbyBlock = matchGroup(html, /Nearby Places to Visit\s*<\/h\d>[\s\S]*?<div class="(?:grid-2|nearby-grid)">([\s\S]*?)<\/div>/i) ||
                      matchGroup(html, /<!-- NEARBY_GRID -->([\s\S]*?)<\/section>/) ||
                      matchGroup(html, /nearby_title"[^>]*>[\s\S]*?<div class="grid-2">([\s\S]*?)<\/div>/);
  if (nearbyBlock) {
    const parts = nearbyBlock.split(/class="(?:attraction-card|nearby-card)"/);
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      const title = matchGroup(part, /<h3[^>]*>([\s\S]*?)<\/h3>/);
      const desc = matchGroup(part, /<p[^>]*>([\s\S]*?)<\/p>/);
      const link = matchGroup(part, /href="([^"]*)"/);
      if (title || desc) {
        nearby.push({ title, desc, link: link ? link.replace('.html', '').replace('../destinations/', '').trim() : '' });
      }
    }
  }

  return {
    slug,
    metaTitle: metaTitle || heroTitle || slug,
    metaDesc: metaDesc || leadText || '',
    metaKeywords,
    heroTitle: heroTitle || metaTitle || slug,
    heroImage: heroImage || '/assets/images/hero.webp',
    leadText,
    whoShouldVisit,
    howToReach,
    landmarks,
    tips,
    shopping,
    eats,
    whenToVisit,
    itinerary,
    mapIframe,
    gallery,
    nearby
  };
}

function run() {
  console.log(`Starting parsing from: ${SRC_DIR}`);
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source directory does not exist! Checked: ${SRC_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(SRC_DIR).filter(file => file.endsWith('.html') && !file.startsWith('_'));
  const outputData = [];

  files.forEach(file => {
    const filePath = path.join(SRC_DIR, file);
    try {
      const parsed = parseHTMLFile(filePath, file);
      outputData.push(parsed);
      console.log(`Successfully parsed: ${file} -> /explore/${parsed.slug}/`);
    } catch (e) {
      console.error(`Failed parsing file: ${file}`, e);
    }
  });

  fs.writeFileSync(OUT_FILE, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`Parsing complete! Generated database containing ${outputData.length} destinations at ${OUT_FILE}`);
}

run();
