export interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  icon: string;
  heroImage: string;
  itemCount: number;
  featuredStores: string[];
  subcategories: string[];
  seoTitle: string;
  seoDescription: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "hotels",
    slug: "hotels",
    name: "Hotels & Stays",
    shortDesc: "Compare luxury resorts, boutique villas & verified budget stays across Booking.com & Agoda.",
    icon: "🏨",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    itemCount: 1420,
    featuredStores: ["Booking.com", "Agoda", "MakeMyTrip", "Expedia"],
    subcategories: ["Luxury Resorts", "Boutique Hotels", "Budget Stays", "Beach Villas", "Mountain Retreats"],
    seoTitle: "Best Hotel Deals & Stays 2026 | Compare Booking.com, Agoda & MMT",
    seoDescription: "Search and compare top-rated hotels, boutique resorts, and luxury stays. Lock in exclusive lowest price guarantees with verified guest reviews."
  },
  {
    id: "electronics",
    slug: "electronics",
    name: "Electronics & Tech",
    shortDesc: "Expert-tested laptops, smartphones, noise-canceling headphones & smart appliances.",
    icon: "💻",
    heroImage: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
    itemCount: 2840,
    featuredStores: ["Amazon", "Flipkart", "Croma", "Reliance Digital"],
    subcategories: ["Laptops", "Smartphones", "Headphones & Audio", "Smartwatches", "Smart Home"],
    seoTitle: "Best Electronics Deals 2026 | Price Comparison Across Amazon & Flipkart",
    seoDescription: "Discover lowest prices on laptops, flagship phones, and 4K TVs. Verified specs, lab test comparisons, and price-drop alerts."
  },
  {
    id: "beauty",
    slug: "beauty",
    name: "Beauty & Skincare",
    shortDesc: "Dermatologist-approved skincare, clean haircare, luxury fragrance & top makeup bestsellers.",
    icon: "✨",
    heroImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    itemCount: 1980,
    featuredStores: ["Nykaa", "Sephora", "Amazon Beauty", "Tira"],
    subcategories: ["Skincare Serums", "Sunscreen & SPF", "Hair Repair", "Luxury Fragrance", "Clean Makeup"],
    seoTitle: "Best Beauty & Skincare Products 2026 | Nykaa, Sephora & Amazon Reviews",
    seoDescription: "Unbiased reviews of viral beauty serums, hair treatments, and makeup essentials. Shop verified authentic products with direct discounts."
  },
  {
    id: "fashion",
    slug: "fashion",
    name: "Fashion & Apparel",
    shortDesc: "Curated wardrobe staples, designer footwear, everyday athleisure & timeless accessories.",
    icon: "👔",
    heroImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
    itemCount: 3410,
    featuredStores: ["Myntra", "Ajio", "Tata CLiQ Luxury", "Amazon Fashion"],
    subcategories: ["Men's Essentials", "Women's Styles", "Sneakers & Footwear", "Luxury Watches", "Travel Bags"],
    seoTitle: "Curated Fashion & Apparel Deals 2026 | Myntra, Ajio & Luxury Outlets",
    seoDescription: "Handpicked premium fashion, everyday streetwear, and designer timepieces with seasonal discount coupons and size guides."
  },
  {
    id: "home",
    slug: "home",
    name: "Home & Kitchen",
    shortDesc: "High-efficiency kitchen tools, espresso machines, smart vacuums & ergonomic furniture.",
    icon: "☕",
    heroImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    itemCount: 1670,
    featuredStores: ["Amazon Home", "Flipkart", "IKEA", "Croma"],
    subcategories: ["Espresso & Coffee", "Cordless Vacuums", "Air Fryers", "Ergonomic Chairs", "Cookware Sets"],
    seoTitle: "Top Rated Home & Kitchen Appliances 2026 | Wirecutter-style Reviews",
    seoDescription: "Tested kitchen gear, coffee makers, robot vacuums, and cookware that actually last. Compare Amazon and Flipkart prices instantly."
  },
  {
    id: "ai-tools",
    slug: "ai-tools",
    name: "AI Tools & SaaS",
    shortDesc: "Generative AI writing, coding assistants, video generators & workflow automation software.",
    icon: "🤖",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    itemCount: 650,
    featuredStores: ["PartnerStack", "Impact", "AppSumo", "Direct Vendor"],
    subcategories: ["AI Writing", "AI Code Assistants", "Video Generation", "SEO & Marketing", "Productivity"],
    seoTitle: "Best AI Tools & Software Lifetime Deals 2026 | AppSumo & SaaS Coupons",
    seoDescription: "Compare the leading AI SaaS platforms. Uncover free tier limits, pricing tiers, lifetime deal promotions, and productivity benchmarks."
  },
  {
    id: "travel",
    slug: "travel",
    name: "Travel & Tours",
    shortDesc: "Curated local experiences, international flights, adventure passes & desert safaris.",
    icon: "✈️",
    heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    itemCount: 890,
    featuredStores: ["Viator", "GetYourGuide", "Klook", "MakeMyTrip"],
    subcategories: ["City Passes", "Desert Safaris", "Island Tours", "Flight Bookings", "Travel Luggage"],
    seoTitle: "Best Travel Experiences & Tour Deals 2026 | Viator & GetYourGuide",
    seoDescription: "Book memorable day tours, skip-the-line museum tickets, and adventure activities with free cancellation and lowest price guarantee."
  },
  {
    id: "hosting",
    slug: "hosting",
    name: "Web Hosting & Domains",
    shortDesc: "High-uptime WordPress hosting, cloud VPS, domain registrars & SSL certificates.",
    icon: "🌐",
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    itemCount: 420,
    featuredStores: ["Hostinger", "SiteGround", "Cloudways", "Namecheap"],
    subcategories: ["WordPress Hosting", "Managed Cloud VPS", "Domain Registrars", "Business Email", "Dedicated Servers"],
    seoTitle: "Best Web Hosting & Domain Discounts 2026 | Uptime & Speed Benchmarks",
    seoDescription: "Tested TTFB and uptime benchmarks for top hosting providers. Save up to 80% with verified promo codes and free domain inclusions."
  },
  {
    id: "deals",
    slug: "deals",
    name: "Deals & Coupons",
    shortDesc: "Real-time flash sales, price drop alerts, verified promo codes & festive mega discounts.",
    icon: "🏷️",
    heroImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    itemCount: 5200,
    featuredStores: ["Amazon Great Indian Sale", "Flipkart Big Billion Days", "Myntra EORS", "Nykaa Hot Pink"],
    subcategories: ["Flash Deals", "Under ₹999", "50%+ Off Tech", "Exclusive Coupons", "Bank Offers"],
    seoTitle: "Today's Best Online Deals & Coupon Codes 2026 | Amazon, Flipkart & Brand Coupons",
    seoDescription: "Updated every 15 minutes: verified discounts, coupon codes, and price glitches from major e-commerce networks."
  }
];
