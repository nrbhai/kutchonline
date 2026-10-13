export interface DealItem {
  id: string;
  title: string;
  store: "Amazon" | "Flipkart" | "Hostinger" | "Booking.com" | "Nykaa" | "Myntra" | "Viator" | "PartnerStack" | "AJIO" | "Tata CLiQ Luxury" | "Agoda";
  category: string;
  badge: "FLASH DEAL" | "HOT COUPON" | "PRICE DROP" | "EXCLUSIVE" | "LIMITED TIME";
  discountPercent: number;
  originalPrice?: number;
  dealPrice?: number;
  currency?: "INR" | "USD";
  couponCode?: string;
  expiresInHours: number;
  verifiedCount: number;
  affiliateUrl: string;
  description: string;
  image: string;
}

export const DEALS: DealItem[] = [
  {
    id: "deal-agoda-bhuj-kutch",
    title: "Agoda Partner Special: Up to 35% Off Heritage Palaces & Bhuj Resorts",
    store: "Agoda",
    category: "Hotels",
    badge: "EXCLUSIVE",
    discountPercent: 35,
    originalPrice: 8500,
    dealPrice: 5525,
    currency: "INR",
    couponCode: "AGODABHUJ",
    expiresInHours: 24,
    verifiedCount: 1890,
    affiliateUrl: "/go/agoda?city=bhuj",
    description: "Exclusive member discount across top-rated heritage hotels in Bhuj, Dholavira, Udaipur and Jaipur with free cancellation.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "deal-ajio-big-bold",
    title: "AJIO Big Bold Sale: 50% to 90% Off on Top Fashion Brands",
    store: "AJIO",
    category: "Fashion",
    badge: "FLASH DEAL",
    discountPercent: 70,
    originalPrice: 3999,
    dealPrice: 1199,
    currency: "INR",
    couponCode: "AJIOMAX",
    expiresInHours: 8,
    verifiedCount: 3840,
    affiliateUrl: "/go/ajio?deal=big-bold-sale",
    description: "Massive price drops across over 2,000 fashion brands including GAP, Superdry, Levi's, and Trends.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "deal-hostinger-75",
    title: "Hostinger Cloud Startup: 75% OFF + Free Domain + 3 Extra Months",
    store: "Hostinger",
    category: "Hosting",
    badge: "EXCLUSIVE",
    discountPercent: 75,
    originalPrice: 2299,
    dealPrice: 575,
    currency: "INR",
    couponCode: "BHUJ75",
    expiresInHours: 9,
    verifiedCount: 1420,
    affiliateUrl: "/go/hostinger?deal=cloud-startup-75off",
    description: "Get 200GB NVMe storage, 3GB RAM, free SSL and daily backups with our exclusive coupon code BHUJ75.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "deal-macbook-drop",
    title: "Apple MacBook Air 15-inch M3: Flat ₹20,000 Off on Amazon Prime",
    store: "Amazon",
    category: "Electronics",
    badge: "PRICE DROP",
    discountPercent: 13,
    originalPrice: 154900,
    dealPrice: 134900,
    currency: "INR",
    expiresInHours: 14,
    verifiedCount: 890,
    affiliateUrl: "/go/amazon?id=apple-macbook-air-m3",
    description: "Lowest price tracked in 60 days on the 16GB / 512GB configuration with next-day dispatch.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "deal-nykaa-pink",
    title: "Nykaa Beauty Box: Extra 25% Off on Skincare Combos",
    store: "Nykaa",
    category: "Beauty",
    badge: "HOT COUPON",
    discountPercent: 25,
    couponCode: "GLOW25",
    expiresInHours: 18,
    verifiedCount: 2310,
    affiliateUrl: "/go/nykaa?deal=skincare-combo",
    description: "Valid across Laneige, The Ordinary, and Minimalist orders over ₹1,500. Free cosmetic pouch included.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "deal-flipkart-s25",
    title: "Samsung Galaxy S25 Ultra: Instant ₹15,000 Bank Card Discount",
    store: "Flipkart",
    category: "Electronics",
    badge: "FLASH DEAL",
    discountPercent: 11,
    originalPrice: 139999,
    dealPrice: 124999,
    currency: "INR",
    couponCode: "CARD15K",
    expiresInHours: 6,
    verifiedCount: 540,
    affiliateUrl: "/go/flipkart?id=samsung-s25-ultra",
    description: "Special bank discount combined with exchange bonus on old smartphone trade-in.",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "deal-flight-offers",
    title: "Flight Flash Deals: Save up to ₹2,500 on Domestic & International Air Tickets",
    store: "Booking.com",
    category: "Travel",
    badge: "LIMITED TIME",
    discountPercent: 20,
    couponCode: "FLYBHUJ",
    expiresInHours: 24,
    verifiedCount: 1650,
    affiliateUrl: "/go/flights?deal=monsoon-air",
    description: "Discounted airfares across IndiGo, Air India, and Akasa Air with zero convenience fees on select cards.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "deal-senior-health",
    title: "Senior Citizen Wellness Special: Flat 20% Off Nutrition & Joint Care",
    store: "Amazon",
    category: "Beauty & Wellness",
    badge: "EXCLUSIVE",
    discountPercent: 20,
    originalPrice: 1650,
    dealPrice: 1320,
    currency: "INR",
    couponCode: "CARE20",
    expiresInHours: 36,
    verifiedCount: 720,
    affiliateUrl: "/go/senior-health?deal=wellness-bundle",
    description: "Verified discount on Ensure, calcium supplements, and adult mobility care essentials.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "deal-philips-kitchen",
    title: "Philips Digital Air Fryer HD9252: Flat 42% Off Festive Price Drop",
    store: "Amazon",
    category: "Home & Kitchen",
    badge: "PRICE DROP",
    discountPercent: 42,
    originalPrice: 11995,
    dealPrice: 6999,
    currency: "INR",
    expiresInHours: 16,
    verifiedCount: 1950,
    affiliateUrl: "/go/kitchen?deal=airfryer-fest",
    description: "4.1L digital rapid air technology with 7 presets and keep warm function.",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "deal-cursor-trial",
    title: "Cursor Pro AI IDE: 14-Day Free Trial + 20% Annual Billing Discount",
    store: "PartnerStack",
    category: "AI Tools",
    badge: "EXCLUSIVE",
    discountPercent: 20,
    couponCode: "DEVBHUJ",
    expiresInHours: 48,
    verifiedCount: 3100,
    affiliateUrl: "/go/ai?ref=bhujdeals",
    description: "Try full Claude 3.7 Sonnet & Composer multi-file coding capabilities without risk.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
  }
];
