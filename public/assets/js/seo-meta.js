
// SEO: Update meta tags dynamically for category pages
function updateMetaTags(category) {
    if (!category) return;
    
    const categoryName = category.name;
    const providerCount = category.providers ? category.providers.length : 0;
    
    // Update title (keep under 60 chars)
    const pageTitle = `Best ${categoryName} in Bhuj (2026) – Contact Numbers | bhuj.kutchonline.com`;
    document.title = pageTitle;
    document.getElementById('page-title').textContent = pageTitle;
    
    // Update description (keep under 155 chars)
    const description = `Find verified ${categoryName} in Bhuj with contact numbers, ratings, and addresses. Search top-rated local ${categoryName.toLowerCase()} serving Madhapar, Sanskar Nagar.`;
    const descEl = document.getElementById('page-description');
    if (descEl) descEl.setAttribute('content', description);
    
    // Update canonical URL
    const canonicalUrl = `https://bhuj.kutchonline.com/${category.id}-in-bhuj.html`;
    const canonicalEl = document.getElementById('page-canonical');
    if (canonicalEl) canonicalEl.setAttribute('href', canonicalUrl);
    
    // Update Open Graph tags
    const ogTitle = `Best ${categoryName} in Bhuj | bhuj.kutchonline.com`;
    const ogDesc = `Find verified ${categoryName} providers in Bhuj with contact details and reviews.`;
    
    document.getElementById('og-url')?.setAttribute('content', canonicalUrl);
    document.getElementById('og-title')?.setAttribute('content', ogTitle);
    document.getElementById('og-description')?.setAttribute('content', ogDesc);
    
    // Update Twitter Card tags
    document.getElementById('twitter-url')?.setAttribute('content', canonicalUrl);
    document.getElementById('twitter-title')?.setAttribute('content', ogTitle);
    document.getElementById('twitter-description')?.setAttribute('content', ogDesc);
}
