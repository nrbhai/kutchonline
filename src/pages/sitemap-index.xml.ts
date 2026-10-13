import { PRODUCTS } from '../data/products';
import { HOTELS } from '../data/hotels';
import { BLOG_POSTS } from '../data/blog';
import { CATEGORIES } from '../data/categories';

export async function GET() {
  const baseUrl = "https://bhujdeals.com";

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
    "/disclaimer",
    "/deals",
    "/blog"
  ];

  const categoryUrls = CATEGORIES.map(c => `/${c.slug}`);
  const productUrls = PRODUCTS.map(p => `/product/${p.slug}`);
  const hotelUrls = HOTELS.map(h => `/hotel/${h.slug}`);
  const blogUrls = BLOG_POSTS.map(b => `/blog/${b.slug}`);

  const allUrls = [
    ...staticPages,
    ...categoryUrls,
    ...productUrls,
    ...hotelUrls,
    ...blogUrls
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    url => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url === '' || url.includes('/deals') ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '' ? '1.0' : url.includes('/product/') || url.includes('/hotel/') ? '0.8' : '0.6'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
