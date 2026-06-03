import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Set up ESM equivalents for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../src/data/data.json');
const PUBLIC_DIR = path.join(__dirname, '../public');
const BHUJ_PUBLIC_DIR = path.join(PUBLIC_DIR, 'bhuj');

// Ensure directories exist
if (!fs.existsSync(BHUJ_PUBLIC_DIR)) {
  fs.mkdirSync(BHUJ_PUBLIC_DIR, { recursive: true });
}

// 1. Generate Sitemap for kutchonline.com
const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kutchonline.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), mainSitemap);
console.log('Generated kutchonline.com sitemap in public/sitemap.xml');

// 2. Generate Sitemap for bhuj.kutchonline.com
// Read categories from data.json
let categories = [];
try {
  const fileContent = fs.readFileSync(DATA_PATH, 'utf8');
  const data = JSON.parse(fileContent);
  if (Array.isArray(data)) {
    categories = data.map(cat => `${cat.id}-in-bhuj.html`);
  } else {
    console.error('Error: data.json is not an array.');
  }
} catch (err) {
  console.error('Error reading or parsing data.json:', err);
}

// Define long-tail pages (from [category].html.astro)
const LONG_TAIL_PAGES = [
  'wedding-choreographer-in-bhuj.html',
  'sangeet-choreographer-in-bhuj.html',
  'dance-classes-in-bhuj.html'
];

// Define static pages for bhuj.kutchonline.com
const STATIC_PAGES = [
  '',
  'about',
  'about-bhuj',
  'create-digital-card',
  'create-webpage',
  'form',
  'jobs',
  'offers',
  'haritech.html',
  'pioneer.html'
];

const bhujUrls = [
  ...STATIC_PAGES.map(p => ({ path: p, priority: p === '' ? '1.0' : '0.8', changefreq: 'weekly' })),
  ...categories.map(c => ({ path: c, priority: '0.6', changefreq: 'weekly' })),
  ...LONG_TAIL_PAGES.map(l => ({ path: l, priority: '0.5', changefreq: 'weekly' }))
];

const today = new Date().toISOString().split('T')[0];

const bhujSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${bhujUrls.map(urlObj => {
  const fullUrl = `https://bhuj.kutchonline.com/${urlObj.path}`;
  return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${urlObj.changefreq}</changefreq>
    <priority>${urlObj.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(BHUJ_PUBLIC_DIR, 'sitemap.xml'), bhujSitemap);
console.log(`Generated bhuj.kutchonline.com sitemap with ${bhujUrls.length} URLs in public/bhuj/sitemap.xml`);
