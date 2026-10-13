export interface StoreOffer {
  storeName: "Amazon" | "Flipkart" | "Croma" | "Nykaa" | "Myntra" | "Direct Vendor" | "PartnerStack" | "Tata CLiQ Luxury" | "AJIO" | "Brand Flagship";
  price: number;
  originalPrice: number;
  currency: "INR" | "USD";
  inStock: boolean;
  affiliateUrl: string;
  badge?: string;
  deliveryTime?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "electronics" | "beauty" | "fashion" | "home" | "ai-tools" | "hosting" | "deals";
  subcategory: string;
  tagline: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  dealTag?: "Editor's Choice" | "Best Value" | "52% Off" | "Flash Deal" | "Top Seller" | "Trending";
  featured: boolean;
  primaryStore: StoreOffer;
  storeOffers: StoreOffer[];
  pros: string[];
  cons: string[];
  keyFeatures: string[];
  specs: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
  updatedAt: string;
}

export const PRODUCTS: Product[] = [
  // =========================================================================
  // 1. ELECTRONICS & GADGETS
  // =========================================================================
  {
    id: "prod-macbook-air-m3",
    slug: "apple-macbook-air-m3-15-inch",
    name: "Apple MacBook Air 15-inch (M3 Chip, 16GB RAM, 512GB SSD)",
    brand: "Apple",
    category: "electronics",
    subcategory: "Laptops",
    tagline: "The gold standard for portable power, battery life, and silent fanless performance.",
    description: "The 15-inch MacBook Air with Apple's M3 processor delivers extraordinary battery longevity (up to 18 hours), a stunning Liquid Retina display, and effortless multitasking for software developers, content creators, and executives. It runs whisper-quiet with zero fan noise.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewsCount: 1420,
    dealTag: "Editor's Choice",
    featured: true,
    primaryStore: {
      storeName: "Amazon",
      price: 134900,
      originalPrice: 154900,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/amazon?id=apple-macbook-air-m3",
      badge: "Lowest Price in 30 Days",
      deliveryTime: "Prime One-Day"
    },
    storeOffers: [
      {
        storeName: "Amazon",
        price: 134900,
        originalPrice: 154900,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=apple-macbook-air-m3",
        badge: "Fastest Delivery"
      },
      {
        storeName: "Flipkart",
        price: 136990,
        originalPrice: 154900,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/flipkart?id=apple-macbook-air-m3",
        badge: "₹5000 Axis Card Discount"
      },
      {
        storeName: "Croma",
        price: 139900,
        originalPrice: 154900,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/croma?id=apple-macbook-air-m3"
      }
    ],
    pros: [
      "Sublime 18-hour real-world battery endurance",
      "Expansive 15.3-inch Liquid Retina screen with 500 nits brightness",
      "Completely silent fanless thermal design",
      "Top-tier MagSafe 3 charging & dual Thunderbolt ports"
    ],
    cons: [
      "Supports only up to two external displays with lid closed",
      "Upgrading unified memory or SSD post-purchase is impossible"
    ],
    keyFeatures: [
      "Apple M3 8-core CPU with 10-core GPU and 16-core Neural Engine",
      "15.3-inch Liquid Retina Display with True Tone and P3 wide color",
      "1080p FaceTime HD Camera & 6-speaker spatial audio system",
      "Wi-Fi 6E, MagSafe 3, Dual Thunderbolt 4 ports"
    ],
    specs: [
      { label: "Processor", value: "Apple Silicon M3 (8-Core CPU / 10-Core GPU)" },
      { label: "Unified Memory", value: "16GB Unified RAM" },
      { label: "Storage", value: "512GB High-speed PCIe SSD" },
      { label: "Weight", value: "1.51 kg (3.3 lbs)" },
      { label: "Battery Life", value: "Up to 18 Hours Video Playback" },
      { label: "Warranty", value: "1 Year Apple Care Global Limited Warranty" }
    ],
    faqs: [
      {
        question: "Is 16GB RAM sufficient for coding and video editing?",
        answer: "Yes, Apple's unified memory architecture handles 4K video rendering in Final Cut Pro, Docker containers, and large IDE projects smoothly."
      },
      {
        question: "Does it come with an Indian standard power brick?",
        answer: "Yes, purchases in India include Apple's official 35W Dual USB-C Port Compact Power Adapter."
      }
    ],
    updatedAt: "2026-10-10"
  },
  {
    id: "prod-sony-wh1000xm5",
    slug: "sony-wh-1000xm5-wireless-headphones",
    name: "Sony WH-1000XM5 Noise Canceling Wireless Headphones",
    brand: "Sony",
    category: "electronics",
    subcategory: "Headphones & Audio",
    tagline: "Industry-leading active noise cancellation with 30-hour battery and ultra-clear mic.",
    description: "Equipped with two processors and 8 microphones, the Sony WH-1000XM5 neutralizes low rumble and high-frequency chatter alike. Auto NC Optimizer calibrates ambient dampening automatically according to your wearing conditions and atmospheric pressure.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewsCount: 3820,
    dealTag: "Top Seller",
    featured: true,
    primaryStore: {
      storeName: "Amazon",
      price: 26990,
      originalPrice: 34990,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/amazon?id=sony-wh1000xm5",
      badge: "23% Off + No Cost EMI",
      deliveryTime: "Same-Day Delivery"
    },
    storeOffers: [
      {
        storeName: "Amazon",
        price: 26990,
        originalPrice: 34990,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=sony-wh1000xm5"
      },
      {
        storeName: "Flipkart",
        price: 27490,
        originalPrice: 34990,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/flipkart?id=sony-wh1000xm5"
      },
      {
        storeName: "Croma",
        price: 28990,
        originalPrice: 34990,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/croma?id=sony-wh1000xm5"
      }
    ],
    pros: [
      "Best-in-class ANC silences airplane roar and office bustle",
      "Soft-fit leather cups provide all-day zero fatigue comfort",
      "30 hours battery life with 3-minute quick charge for 3 hours playback",
      "Flawless multipoint Bluetooth connection switching between laptop and phone"
    ],
    cons: [
      "Ear cups rotate flat but headband does not collapse inward like XM4",
      "Touch sensor controls require slight learning curve"
    ],
    keyFeatures: [
      "HD Noise Cancelling Processor QN1 & Integrated Processor V1",
      "8 Microphones with AI beamforming noise-reduction algorithm",
      "LDAC codec support for Hi-Res Audio wireless transmission",
      "Multipoint connection pairing two devices simultaneously"
    ],
    specs: [
      { label: "Driver Size", value: "30mm Carbon Fiber Composite" },
      { label: "Frequency Range", value: "4Hz - 40,000Hz (Hi-Res)" },
      { label: "Battery Life", value: "30 Hours (ANC On) / 40 Hours (ANC Off)" },
      { label: "Weight", value: "250 grams" }
    ],
    faqs: [
      {
        question: "Can I connect this to both my work PC and iPhone?",
        answer: "Yes, Multipoint connection lets you listen to music on your laptop and automatically take phone calls seamlessly."
      }
    ],
    updatedAt: "2026-10-11"
  },
  {
    id: "prod-samsung-s25-ultra",
    slug: "samsung-galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra 5G (12GB RAM, 256GB Titanium)",
    brand: "Samsung",
    category: "electronics",
    subcategory: "Smartphones",
    tagline: "The pinnacle Android flagship with Titanium frame, 200MP camera & Galaxy AI.",
    description: "The Galaxy S25 Ultra unites military-grade Titanium durability with a flat anti-reflective Dynamic AMOLED 2X display. Driven by Snapdragon 8 Elite, it brings desktop-class ray tracing and instant on-device Galaxy AI translation.",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewsCount: 910,
    dealTag: "Trending",
    featured: true,
    primaryStore: {
      storeName: "Flipkart",
      price: 124999,
      originalPrice: 139999,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/flipkart?id=samsung-s25-ultra",
      badge: "Flat ₹10,000 Bank Instant Off",
      deliveryTime: "Express Delivery"
    },
    storeOffers: [
      {
        storeName: "Flipkart",
        price: 124999,
        originalPrice: 139999,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/flipkart?id=samsung-s25-ultra"
      },
      {
        storeName: "Amazon",
        price: 126999,
        originalPrice: 139999,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=samsung-s25-ultra"
      }
    ],
    pros: [
      "Anti-reflective Corning Gorilla Armor 2 display drastically cuts glare",
      "Integrated S-Pen stylus for precision note taking & remote photo capture",
      "7 years of major Android OS and security upgrades",
      "Unrivaled 200MP zoom camera system up to 100x Space Zoom"
    ],
    cons: [
      "Large 6.8-inch footprint requires two-handed usage",
      "45W charger must be purchased separately"
    ],
    keyFeatures: [
      "Snapdragon 8 Elite Mobile Platform with Adreno GPU",
      "200MP Main + 50MP Periscope 5x + 50MP Ultra-Wide + 10MP Telephoto",
      "Titanium frame with IP68 dust and water resistance",
      "5000 mAh all-day battery with wireless reverse charging"
    ],
    specs: [
      { label: "Display", value: "6.8\" QHD+ Dynamic AMOLED 2X 120Hz (2600 nits)" },
      { label: "RAM / ROM", value: "12GB LPDDR5X / 256GB UFS 4.0" },
      { label: "OS", value: "One UI 7 on Android 15 (7 Years Updates)" },
      { label: "Weight", value: "219 grams" }
    ],
    faqs: [
      {
        question: "Does the phone heat up during 4K video recording or heavy gaming?",
        answer: "Samsung enlarged the vapor chamber cooling system by nearly 90%, preventing thermal throttling even under heavy gaming."
      }
    ],
    updatedAt: "2026-10-12"
  },
  {
    id: "prod-asus-rog-strix-g16",
    slug: "asus-rog-strix-g16-gaming-laptop",
    name: "ASUS ROG Strix G16 Gaming Laptop (Intel i9 14th Gen, RTX 4070, 32GB RAM)",
    brand: "ASUS",
    category: "electronics",
    subcategory: "Gaming Laptops",
    tagline: "High-FPS competitive esports powerhouse with ROG Nebula 240Hz Display.",
    description: "Built for serious competitive gaming and heavy 3D rendering. Powered by 14th Gen Intel Core i9-14900HX and NVIDIA GeForce RTX 4070 GPU with max 140W TGP. Tri-Fan cooling with Conductonaut Extreme liquid metal keeps CPU temperatures ice cold.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewsCount: 650,
    dealTag: "Flash Deal",
    featured: true,
    primaryStore: {
      storeName: "Flipkart",
      price: 174990,
      originalPrice: 199990,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/gaming?id=asus-rog-g16",
      badge: "₹25,000 Off + Free ROG Backpack",
      deliveryTime: "Express Delivery"
    },
    storeOffers: [
      {
        storeName: "Flipkart",
        price: 174990,
        originalPrice: 199990,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/gaming?id=asus-rog-g16"
      },
      {
        storeName: "Amazon",
        price: 177990,
        originalPrice: 199990,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=asus-rog-strix-g16"
      }
    ],
    pros: [
      "Ultra-fluid 240Hz 3ms QHD+ ROG Nebula display with 100% DCI-P3",
      "NVIDIA GeForce RTX 4070 with MUX switch and NVIDIA Advanced Optimus",
      "Tri-Fan thermal technology with liquid metal cooling",
      "90Wh high capacity battery with 100W USB-C fast charging"
    ],
    cons: [
      "2.5 kg chassis is heavy for daily commuting",
      "Webcam is 720p resolution"
    ],
    keyFeatures: [
      "Intel Core i9-14900HX 24 cores / 32 threads",
      "NVIDIA RTX 4070 8GB GDDR6 (140W max TGP)",
      "32GB DDR5 5600MHz RAM + 1TB PCIe 4.0 NVMe SSD",
      "Per-key RGB backlit keyboard with Aura Sync"
    ],
    specs: [
      { label: "Screen", value: "16\" QHD+ (2560 x 1600) 240Hz 3ms 500 nits" },
      { label: "Graphics", value: "NVIDIA GeForce RTX 4070 8GB GDDR6" },
      { label: "Ports", value: "Thunderbolt 4, HDMI 2.1, 2.5G LAN, USB 3.2" },
      { label: "Weight", value: "2.50 kg" }
    ],
    faqs: [
      {
        question: "Can this laptop run GTA 6 and Cyberpunk 2077 at max settings?",
        answer: "Yes, DLSS 3.5 and Frame Generation allow Cyberpunk 2077 to run above 90 FPS on Ray Tracing Ultra settings."
      }
    ],
    updatedAt: "2026-10-12"
  },
  {
    id: "prod-boat-airdopes-141",
    slug: "boat-airdopes-141-anc-true-wireless-earbuds",
    name: "boAt Airdopes 141 ANC TWS Earbuds (32dB Active Noise Cancellation)",
    brand: "boAt",
    category: "electronics",
    subcategory: "Audio & Earbuds",
    tagline: "India's bestselling budget ANC earbuds with 42-hour playtime and beast mode low latency.",
    description: "The boAt Airdopes 141 ANC features up to 32dB active noise cancellation, dual EQ modes, and ENx technology quad mics for crisp call clarity. Built for gym sessions and Indian commuting with IPX5 sweat resistance.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviewsCount: 14200,
    dealTag: "Best Value",
    featured: false,
    primaryStore: {
      storeName: "Amazon",
      price: 1499,
      originalPrice: 5990,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/audio?id=boat-airdopes-141",
      badge: "75% Off Deal",
      deliveryTime: "Prime One-Day"
    },
    storeOffers: [
      {
        storeName: "Amazon",
        price: 1499,
        originalPrice: 5990,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/audio?id=boat-airdopes-141"
      },
      {
        storeName: "Flipkart",
        price: 1549,
        originalPrice: 5990,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/flipkart?id=boat-airdopes-141"
      }
    ],
    pros: [
      "Impressive 32dB active noise cancellation under ₹1,500",
      "Huge 42-hour total playback with ASAP Charge (10 min = 150 min)",
      "Beast Mode with 50ms ultra-low latency for mobile gaming",
      "IPX5 water and sweat resistance"
    ],
    cons: [
      "Bass-heavy sound profile requires custom EQ if you prefer flat audio",
      "Microphone performance in extreme windy conditions is moderate"
    ],
    keyFeatures: [
      "32dB Active Noise Cancellation",
      "10mm Dynamic Bass Drivers",
      "Quad Mics with ENx Voice Isolation",
      "Bluetooth v5.3 with Instant Wake N' Pair"
    ],
    specs: [
      { label: "Driver", value: "10mm Titanium-plated" },
      { label: "Battery", value: "Up to 42 Hours total with Case" },
      { label: "Water Resistance", value: "IPX5 Splashproof" }
    ],
    faqs: [
      {
        question: "Does it work well for phone calls on crowded trains or buses?",
        answer: "Yes, the ENx quad-mic technology filters out environmental background chatter effectively during phone calls."
      }
    ],
    updatedAt: "2026-10-11"
  },

  // =========================================================================
  // 2. HEALTH & BEAUTY
  // =========================================================================
  {
    id: "prod-laneige-water-mask",
    slug: "laneige-water-sleeping-mask-ex",
    name: "LANEIGE Water Sleeping Mask EX with Probiotics Complex (70ml)",
    brand: "LANEIGE",
    category: "beauty",
    subcategory: "Skincare Serums",
    tagline: "Overnight hydration treatment that restores radiant, glass-skin clarity by dawn.",
    description: "LANEIGE's cult-favorite sleeping mask leverages a Sleeping Micro-Biome™ complex and squalane to intensely moisturize dry, tired skin overnight. The gel texture absorbs weightlessly without transferring to your pillow.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewsCount: 4620,
    dealTag: "Best Value",
    featured: true,
    primaryStore: {
      storeName: "Nykaa",
      price: 1850,
      originalPrice: 2150,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/nykaa?id=laneige-water-mask",
      badge: "Free Lip Sleeping Mask Mini (3g)",
      deliveryTime: "2-Day Delivery"
    },
    storeOffers: [
      {
        storeName: "Nykaa",
        price: 1850,
        originalPrice: 2150,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/nykaa?id=laneige-water-mask"
      },
      {
        storeName: "Amazon",
        price: 1930,
        originalPrice: 2150,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=laneige-water-mask"
      }
    ],
    pros: [
      "Locks in deep hydration for 48 hours without oiliness",
      "Infused with soothing trehalose and bio-fermented probiotics",
      "Non-comedogenic and hypoallergenic, safe for sensitive acne-prone skin",
      "Subtle calming floral lavender aromatherapy aroma"
    ],
    cons: [
      "Jar packaging requires using the included spatula for hygiene",
      "Lightweight gel may need extra cream layering for extreme dry winter skin"
    ],
    keyFeatures: [
      "23.8 Billion Probiotics-derived complex",
      "Sugar Cane-derived Squalane mimics natural skin lipids",
      "7-free clean formulation without synthetic pigments",
      "Dermatologist tested & verified non-pore-clogging"
    ],
    specs: [
      { label: "Volume", value: "70 ml / 2.3 fl. oz." },
      { label: "Skin Type", value: "All Skin Types (Normal, Dry, Combination, Sensitive)" },
      { label: "Form", value: "Water-gel cream" },
      { label: "Country of Origin", value: "South Korea (Amorepacific)" }
    ],
    faqs: [
      {
        question: "How many times a week should I use this?",
        answer: "Recommended 2 to 3 times weekly as the final step of your nighttime skincare routine."
      }
    ],
    updatedAt: "2026-10-09"
  },
  {
    id: "prod-minimalist-niacinamide",
    slug: "minimalist-10-niacinamide-face-serum",
    name: "Minimalist 10% Niacinamide Face Serum with Zinc & EUK 134 (30ml)",
    brand: "Minimalist",
    category: "beauty",
    subcategory: "Skincare Serums",
    tagline: "Clinical-grade treatment to reduce acne marks, blemishes, and oil secretion.",
    description: "An everyday face serum formulated with pure Grade-A Niacinamide (Vitamin B3) and Matmarine to fade dark acne spots, repair barrier damage, and balance sebum production. Hypoallergenic and fragrance-free.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    rating: 4.85,
    reviewsCount: 8900,
    dealTag: "Editor's Choice",
    featured: true,
    primaryStore: {
      storeName: "Nykaa",
      price: 569,
      originalPrice: 599,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/skincare?id=minimalist-niacinamide",
      badge: "Top Seller on Nykaa",
      deliveryTime: "Express Delivery"
    },
    storeOffers: [
      {
        storeName: "Nykaa",
        price: 569,
        originalPrice: 599,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/skincare?id=minimalist-niacinamide"
      },
      {
        storeName: "Amazon",
        price: 599,
        originalPrice: 599,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=minimalist-niacinamide"
      }
    ],
    pros: [
      "Fades stubborn post-acne blemishes and pigmentation in 4-6 weeks",
      "Formulated with EUK-134, a potent antioxidant that neutralizes free radicals",
      "Fragrance-free, essential oil-free, non-comedogenic",
      "Matmarine biotechnology controls midday T-zone oiliness"
    ],
    cons: [
      "Beginners with extremely sensitive skin should patch test first",
      "Glass dropper bottle must be kept away from direct sunlight"
    ],
    keyFeatures: [
      "10% Pure Vitamin B3 (Niacinamide)",
      "1% Zinc PCA & Matmarine ferment extract",
      "pH 5.5 - 6.5 matching healthy skin acid mantle"
    ],
    specs: [
      { label: "Volume", value: "30 ml" },
      { label: "Target Concern", value: "Acne spots, open pores, excess oil" },
      { label: "Skin Type", value: "Oily, Combination, Normal" }
    ],
    faqs: [
      {
        question: "Can I use this with Vitamin C or Retinol?",
        answer: "Yes, use Niacinamide in your morning AM routine and Retinol in your PM routine for best synergistic results."
      }
    ],
    updatedAt: "2026-10-11"
  },
  {
    id: "prod-ensure-senior-health",
    slug: "ensure-diabetes-care-adult-nutrition-powder",
    name: "Ensure Complete Adult & Senior Care Nutritional Powder (400g Vanilla)",
    brand: "Abbott Ensure",
    category: "beauty",
    subcategory: "Senior Wellness & Care",
    tagline: "Scientifically formulated nutrition with 32 vital nutrients for strength, immunity & joint mobility.",
    description: "Designed specifically for adults and seniors to manage muscle mass, bone density, and energy levels. Formulated by Abbott with high-quality protein, calcium, Vitamin D, and heart-healthy fats.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewsCount: 3100,
    dealTag: "Top Seller",
    featured: true,
    primaryStore: {
      storeName: "Brand Flagship",
      price: 745,
      originalPrice: 825,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/senior-health?id=ensure-nutrition",
      badge: "Verified Health Drink",
      deliveryTime: "Standard Delivery"
    },
    storeOffers: [
      {
        storeName: "Brand Flagship",
        price: 745,
        originalPrice: 825,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/senior-health?id=ensure-nutrition"
      },
      {
        storeName: "Amazon",
        price: 775,
        originalPrice: 825,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=ensure-adult-nutrition"
      }
    ],
    pros: [
      "Contains 32 vital nutrients including Vitamins A, C, E, Zinc, and Selenium",
      "High protein content prevents age-related muscle loss (sarcopenia)",
      "Fortified with Calcium and Vitamin D for bone and joint support",
      "Easy to digest, gluten-free, and suitable for lactose intolerance"
    ],
    cons: [
      "Store in a cool dry airtight container once opened",
      "Vanilla flavor is mild; chocolate flavor preferred by some"
    ],
    keyFeatures: [
      "32 Essential Nutrients & High-Quality Whey/Soy Protein",
      "FOS prebiotics for healthy digestive gut microflora",
      "HMB (Beta-hydroxy beta-methylbutyrate) muscle-protecting compound"
    ],
    specs: [
      { label: "Weight", value: "400 grams" },
      { label: "Target Age", value: "Adults 45+ & Seniors" },
      { label: "Serving Size", value: "6 scoops (53.8g) with 190ml water" }
    ],
    faqs: [
      {
        question: "Is it suitable for seniors with diabetes?",
        answer: "Ensure also manufactures Ensure Diabetes Care with low glycemic index carbohydrates specifically for blood sugar management."
      }
    ],
    updatedAt: "2026-10-12"
  },
  {
    id: "prod-dyson-airwrap",
    slug: "dyson-airwrap-multi-styler-complete-long",
    name: "Dyson Airwrap Multi-Styler Complete Long (Nickel/Copper)",
    brand: "Dyson",
    category: "beauty",
    subcategory: "Hair Styling",
    tagline: "Style with air, not extreme heat. Curls, shapes, smoothes and hides flyaways.",
    description: "Harnessing the aerodynamic Coanda effect, the Dyson Airwrap wraps hair around the barrel using only controlled airflow and intelligent heat regulation below 150°C to prevent irreversible thermal damage.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewsCount: 1890,
    dealTag: "Editor's Choice",
    featured: true,
    primaryStore: {
      storeName: "Amazon",
      price: 45900,
      originalPrice: 49900,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/amazon?id=dyson-airwrap",
      badge: "₹4,000 Coupon Applied",
      deliveryTime: "Prime One-Day"
    },
    storeOffers: [
      {
        storeName: "Amazon",
        price: 45900,
        originalPrice: 49900,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=dyson-airwrap"
      },
      {
        storeName: "Nykaa",
        price: 47900,
        originalPrice: 49900,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/salon?id=dyson-airwrap"
      }
    ],
    pros: [
      "Zero heat damage preserves natural shine and hair cuticle strength",
      "Re-engineered bidirectional barrels switch curl direction with a single twist",
      "Coanda smoothing dryer hides up to 58% flyaways in one pass",
      "Includes premium Prussian Blue storage case"
    ],
    cons: [
      "Premium investment price point",
      "Requires slightly damp hair (around 80% dry) for optimal hold"
    ],
    keyFeatures: [
      "Dyson V9 digital motor spinning at 110,000 RPM",
      "Intelligent thermistor checks airflow temperature 40 times per second",
      "6 styling attachments for drying, curling, waving, and smoothing"
    ],
    specs: [
      { label: "Power", value: "1300W" },
      { label: "Airflow Settings", value: "3 Precise Speeds" },
      { label: "Heat Settings", value: "3 Heat Settings + Cold Shot Lock" }
    ],
    faqs: [
      {
        question: "Does it work on coarse, frizzy Indian hair?",
        answer: "Yes, the firm smoothing brush attachment is specifically calibrated for coarse and frizz-prone hair types."
      }
    ],
    updatedAt: "2026-10-10"
  },
  {
    id: "prod-cosrx-snail-mucin",
    slug: "cosrx-advanced-snail-96-mucin-essence",
    name: "COSRX Advanced Snail 96 Mucin Power Essence (100ml Korean Skincare)",
    brand: "COSRX",
    category: "beauty",
    subcategory: "K-Beauty Skincare",
    tagline: "The viral Korean glass-skin Holy Grail for plumper, radiant, soothed skin.",
    description: "Contains 96.3% Snail Secretion Filtrate to protect skin from moisture loss, fade acne scars, and soothe redness. This lightweight, fast-absorbing essence delivers long-lasting hydration without a heavy residue.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
    rating: 4.88,
    reviewsCount: 11200,
    dealTag: "Trending",
    featured: false,
    primaryStore: {
      storeName: "Nykaa",
      price: 1190,
      originalPrice: 1450,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/k-beauty?id=cosrx-snail-essence",
      badge: "Verified Korean Import",
      deliveryTime: "2-Day Delivery"
    },
    storeOffers: [
      {
        storeName: "Nykaa",
        price: 1190,
        originalPrice: 1450,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/k-beauty?id=cosrx-snail-essence"
      },
      {
        storeName: "Amazon",
        price: 1220,
        originalPrice: 1450,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=cosrx-snail-mucin"
      }
    ],
    pros: [
      "96.3% snail mucin provides intense hydration and skin plumping",
      "Cruelty-free mucin harvesting from safe natural environment",
      "Repairs compromised skin barrier and calms redness",
      "Fragrance-free and hypoallergenic"
    ],
    cons: [
      "Slimey stringy texture takes a minute to get used to",
      "Patch test if you have dust mite allergies"
    ],
    keyFeatures: [
      "96.3% Snail Secretion Filtrate",
      "1,000 ppm Sodium Hyaluronate",
      "Free of parabens, ethanol, silicones, and artificial fragrance"
    ],
    specs: [
      { label: "Volume", value: "100 ml" },
      { label: "Skin Type", value: "All Skin Types, Dehydrated, Sensitive" }
    ],
    faqs: [
      {
        question: "Are snails harmed during the extraction process?",
        answer: "No, COSRX is 100% cruelty-free. Snails are placed on a mesh net in a dark room and crawl naturally; no external stress is applied."
      }
    ],
    updatedAt: "2026-10-11"
  },
  {
    id: "prod-bella-vita-perfume-set",
    slug: "bella-vita-luxury-unisex-perfume-gift-set",
    name: "Bella Vita Luxury Unisex Eau De Parfum Discovery Set (4 x 20ml Bottles)",
    brand: "Bella Vita",
    category: "beauty",
    subcategory: "Luxury Fragrance",
    tagline: "India's bestselling luxury artisanal scents: CEO Man, White Oud, Skai Aquatic & Honey Oud.",
    description: "Experience four distinct, long-lasting fragrances crafted with French perfume oils. Includes vibrant fresh aquatic, spicy amber, royal oud, and warm woody profiles suitable for daily boardroom wear or festive Indian evenings.",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewsCount: 6540,
    dealTag: "Best Value",
    featured: false,
    primaryStore: {
      storeName: "Nykaa",
      price: 549,
      originalPrice: 849,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/perfumes?id=bella-vita-perfume-set",
      badge: "35% Off Gift Pack",
      deliveryTime: "Express Delivery"
    },
    storeOffers: [
      {
        storeName: "Nykaa",
        price: 549,
        originalPrice: 849,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/perfumes?id=bella-vita-perfume-set"
      },
      {
        storeName: "Amazon",
        price: 575,
        originalPrice: 849,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=bella-vita-perfume-set"
      }
    ],
    pros: [
      "4 distinct versatile scents covering office, date night, and festive occasions",
      "Pocket-friendly 20ml travel-size glass spray bottles",
      "High concentration Eau De Parfum formula lasts 6-8 hours",
      "Cruelty-free and IFRA-certified fragrance oils"
    ],
    cons: [
      "White Oud has strong projection which may feel bold to subtle floral lovers",
      "Glass bottles require carrying in pouch"
    ],
    keyFeatures: [
      "Includes CEO Man, White Oud, Skai Aquatic, Honey Oud",
      "Premium magnetic gift box packaging",
      "IFRA Certified non-irritating to skin"
    ],
    specs: [
      { label: "Volume", value: "4 x 20ml (80ml total)" },
      { label: "Fragrance Family", value: "Aquatic, Woody, Amber, Oud" }
    ],
    faqs: [
      {
        question: "Is this suitable for both men and women?",
        answer: "Yes, the discovery set includes balanced unisex and masculine profiles that can also be layered together."
      }
    ],
    updatedAt: "2026-10-10"
  },

  // =========================================================================
  // 3. FASHION & APPAREL
  // =========================================================================
  {
    id: "prod-ajio-oversized-hoodie",
    slug: "ajio-trendsetter-heavyweight-cotton-hoodie",
    name: "AJIO Trendsetter 450 GSM Heavyweight Fleece Oversized Hoodie",
    brand: "AJIO Trends",
    category: "fashion",
    subcategory: "Streetwear & Hoodies",
    tagline: "Premium streetwear boxy-fit hoodie in 100% combed cotton French Terry.",
    description: "Engineered with ultra-soft 450 GSM combed cotton fleece, drop-shoulder tailoring, double-layered hood, and kangaroo pocket. Pre-shrunk and bio-washed for lasting color richness and zero fabric pilling.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
    rating: 4.82,
    reviewsCount: 3120,
    dealTag: "Trending",
    featured: true,
    primaryStore: {
      storeName: "AJIO",
      price: 1199,
      originalPrice: 2499,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/ajio?id=ajio-oversized-hoodie",
      badge: "52% Off on AJIO Big Bold Sale",
      deliveryTime: "3-Day Delivery"
    },
    storeOffers: [
      {
        storeName: "AJIO",
        price: 1199,
        originalPrice: 2499,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/ajio?id=ajio-oversized-hoodie"
      },
      {
        storeName: "Amazon",
        price: 1399,
        originalPrice: 2499,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=ajio-hoodie"
      }
    ],
    pros: [
      "Substantial 450 GSM heavyweight cotton feels like high-end luxury streetwear",
      "Double-layered hood holds its shape without drooping",
      "Drop-shoulder boxy fit compliments all body frames",
      "Ribbed cuffs and hem retain elasticity through dozens of washes"
    ],
    cons: [
      "Too warm for hot summer Indian climates; best for autumn, winter, or air-conditioned offices",
      "Fits oversized, so size down if you prefer a slim fit"
    ],
    keyFeatures: [
      "100% Combed Cotton French Terry (450 GSM)",
      "Bio-washed and anti-pilling treated",
      "Seamless kangaroo pouch pocket with reinforced bar-tacks"
    ],
    specs: [
      { label: "Material", value: "100% Combed Cotton" },
      { label: "Fit", value: "Drop Shoulder Oversized" },
      { label: "Care", value: "Machine wash cold inside out" }
    ],
    faqs: [
      {
        question: "Does it shrink after machine washing?",
        answer: "No, the fabric is pre-shrunk and bio-washed to maintain dimensional stability."
      }
    ],
    updatedAt: "2026-10-12"
  },
  {
    id: "prod-tissot-prx",
    slug: "tissot-prx-powermatic-80-automatic",
    name: "Tissot PRX Powermatic 80 Automatic (40mm Blue Waffle Dial)",
    brand: "Tissot",
    category: "fashion",
    subcategory: "Luxury Watches",
    tagline: "Swiss craftsmanship, 80 hours power reserve & iconic 1970s integrated bracelet.",
    description: "The Tissot PRX Powermatic 80 is hailed by horologists as the ultimate luxury entry sports watch. It features an integrated 316L stainless steel bracelet, scratch-resistant sapphire crystal with anti-reflective coating, and an exhibition see-through case back.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewsCount: 840,
    dealTag: "Editor's Choice",
    featured: true,
    primaryStore: {
      storeName: "Tata CLiQ Luxury",
      price: 64500,
      originalPrice: 72000,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/tatacliq?id=tissot-prx",
      badge: "Verified Authentic Swiss Import",
      deliveryTime: "Insured White-Glove Shipping"
    },
    storeOffers: [
      {
        storeName: "Tata CLiQ Luxury",
        price: 64500,
        originalPrice: 72000,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/tatacliq?id=tissot-prx"
      },
      {
        storeName: "Myntra",
        price: 66000,
        originalPrice: 72000,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/myntra?id=tissot-prx"
      }
    ],
    pros: [
      "Stunning waffle dial catches light beautifully from every angle",
      "80-hour power reserve allows taking it off Friday and putting it on Monday running accurately",
      "Patented Nivachron balance spring is impervious to magnetic fields",
      "100 meters (10 bar) water resistance suitable for swimming"
    ],
    cons: [
      "Integrated bracelet limits aftermarket leather strap options without adapters",
      "No micro-adjustments on the butterfly clasp"
    ],
    keyFeatures: [
      "Swiss Made Automatic Powermatic 80.111 Calibre",
      "Sapphire Crystal Glass with exhibition open case back",
      "Tapering 316L satin-finished stainless steel bracelet"
    ],
    specs: [
      { label: "Case Diameter", value: "40 mm" },
      { label: "Movement", value: "Swiss Automatic (80 Hours Reserve)" },
      { label: "Water Resistance", value: "100m (330 ft)" }
    ],
    faqs: [
      {
        question: "Is this authentic with an international warranty stamp?",
        answer: "Yes, all verified partner links point to authorized luxury retailers with manufacturer stamped warranty cards."
      }
    ],
    updatedAt: "2026-10-08"
  },
  {
    id: "prod-manyavar-kurta",
    slug: "manyavar-royal-silk-blend-festive-kurta-set",
    name: "Manyavar Royal Silk Blend Festive Kurta & Churidar Set",
    brand: "Manyavar",
    category: "fashion",
    subcategory: "Ethnic Wear",
    tagline: "Hand-embellished mandarin collar festive ethnic wear for weddings & Diwali.",
    description: "Tailored in a rich art silk blend fabric featuring self-woven Jacquard brocade motifs, full sleeves, a structured mandarin collar, and a matching gold churidar. Ideal for Indian wedding celebrations, sangeet ceremonies, and Diwali.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
    rating: 4.78,
    reviewsCount: 1980,
    dealTag: "Top Seller",
    featured: false,
    primaryStore: {
      storeName: "Myntra",
      price: 3499,
      originalPrice: 4999,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/ethnic-wear?id=manyavar-kurta-set",
      badge: "Festive Collection Deal",
      deliveryTime: "2-Day Delivery"
    },
    storeOffers: [
      {
        storeName: "Myntra",
        price: 3499,
        originalPrice: 4999,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/ethnic-wear?id=manyavar-kurta-set"
      },
      {
        storeName: "AJIO",
        price: 3699,
        originalPrice: 4999,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/ajio?id=manyavar-kurta-set"
      }
    ],
    pros: [
      "Breathable art silk blend keeps you comfortable during multi-hour ceremonies",
      "Intricate tone-on-tone embroidery on the placket and mandarin collar",
      "Tailored slim-comfort fit with side slits for easy movement",
      "Includes matching adjustable drawstring churidar"
    ],
    cons: [
      "Dry clean only to maintain the sheen of the Jacquard weave",
      "Colors may appear slightly deeper in outdoor sunlight than indoor studio lighting"
    ],
    keyFeatures: [
      "Jacquard Silk Blend Fabric with soft cotton lining",
      "Mandarin collar with metallic button closure",
      "Two side pockets for phone and wallet"
    ],
    specs: [
      { label: "Fabric", value: "Art Silk Jacquard with Cotton Viscose Lining" },
      { label: "Care", value: "Dry Clean Only" }
    ],
    faqs: [
      {
        question: "Does it come with the pajama or churidar included?",
        answer: "Yes, this is a complete 2-piece set containing both the embellished kurta and the matching churidar."
      }
    ],
    updatedAt: "2026-10-11"
  },
  {
    id: "prod-red-tape-sneakers",
    slug: "red-tape-athleisure-memory-foam-running-sneakers",
    name: "Red Tape Athleisure Memory Foam Running & Lifestyle Sneakers",
    brand: "Red Tape",
    category: "fashion",
    subcategory: "Shoes & Footwear",
    tagline: "Featherweight EVA sole and memory foam insole for all-day walking comfort.",
    description: "Crafted with breathable engineered mesh uppers and cushioned memory foam footbeds that mold to the arch of your foot. Impact-absorbing EVA midsole absorbs shock on city pavements and morning jogging tracks.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewsCount: 8200,
    dealTag: "Best Value",
    featured: false,
    primaryStore: {
      storeName: "Myntra",
      price: 1399,
      originalPrice: 5899,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/footwear?id=red-tape-sneakers",
      badge: "76% Off Deal",
      deliveryTime: "Prime Express Delivery"
    },
    storeOffers: [
      {
        storeName: "Myntra",
        price: 1399,
        originalPrice: 5899,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/footwear?id=red-tape-sneakers"
      },
      {
        storeName: "Amazon",
        price: 1499,
        originalPrice: 5899,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=red-tape-sneakers"
      }
    ],
    pros: [
      "Plush memory foam insole relieves heel pain during long standing shifts",
      "Ultra-breathable mesh prevents foot sweat in humid Indian weather",
      "Sturdy anti-skid rubberized EVA traction outsole",
      "Incredible value for money under ₹1,500"
    ],
    cons: [
      "White sole requires periodic cleaning with damp cloth",
      "Not designed for competitive marathon athletics"
    ],
    keyFeatures: [
      "Engineered Mesh Upper with TPU heel stabilizer",
      "High-density memory foam footbed",
      "Featherlight EVA sole construction"
    ],
    specs: [
      { label: "Upper", value: "Breathable Knit Mesh" },
      { label: "Sole", value: "EVA with Rubber Grip Pods" }
    ],
    faqs: [
      {
        question: "Are these true to size?",
        answer: "Yes, order your standard UK/India shoe size for a snug and comfortable fit."
      }
    ],
    updatedAt: "2026-10-10"
  },

  // =========================================================================
  // 4. HOME & KITCHEN
  // =========================================================================
  {
    id: "prod-dyson-v12-vacuum",
    slug: "dyson-v12-detect-slim-cordless-vacuum",
    name: "Dyson V12 Detect Slim Extra Cordless Vacuum Cleaner",
    brand: "Dyson",
    category: "home",
    subcategory: "Cordless Vacuums",
    tagline: "Laser illumination reveals invisible microscopic dust on hard floors.",
    description: "Dyson V12 Detect Slim combines lightweight 2.2kg maneuverability with a piezo sensor that scientifically counts and sizes dust particles, automatically boosting suction power when higher debris density is detected.",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewsCount: 1250,
    dealTag: "52% Off",
    featured: true,
    primaryStore: {
      storeName: "Amazon",
      price: 44900,
      originalPrice: 65900,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/amazon?id=dyson-v12",
      badge: "32% Price Drop",
      deliveryTime: "Prime Free Delivery"
    },
    storeOffers: [
      {
        storeName: "Amazon",
        price: 44900,
        originalPrice: 65900,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=dyson-v12"
      },
      {
        storeName: "Flipkart",
        price: 46990,
        originalPrice: 65900,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/flipkart?id=dyson-v12"
      }
    ],
    pros: [
      "Fluffy optic cleaner head illuminates micro dust invisible to bare eyes",
      "Push-button power control eliminates finger fatigue (no holding trigger)",
      "Motorized hair screw tool detangles pet hair without wrapping around the brush",
      "Whole-machine HEPA filtration traps 99.99% particles down to 0.1 microns"
    ],
    cons: [
      "0.35L compact bin requires more frequent emptying in large multi-story homes",
      "Battery runtime is ~60 minutes on Eco mode, but drops to ~12 minutes on Boost"
    ],
    keyFeatures: [
      "Hyperdymium motor spinning at up to 125,000 RPM",
      "Piezo sensor calculates particle count on digital LCD screen",
      "Single-button power control"
    ],
    specs: [
      { label: "Suction Power", value: "150 AW (Air Watts)" },
      { label: "Weight", value: "2.2 kg" },
      { label: "Filtration", value: "HEPA filtration to 0.1 microns" }
    ],
    faqs: [
      {
        question: "Can it clean under low sofa furniture?",
        answer: "Yes, it includes a low-reach adapter that bends up to 90 degrees to slide smoothly under low sofas and beds."
      }
    ],
    updatedAt: "2026-10-11"
  },
  {
    id: "prod-philips-air-fryer",
    slug: "philips-digital-air-fryer-hd9252",
    name: "Philips Digital Air Fryer HD9252 with Rapid Air Technology (4.1L Capacity)",
    brand: "Philips",
    category: "home",
    subcategory: "Kitchen Electronics",
    tagline: "Crispy delicious fried meals with up to 90% less oil using Rapid Air Starfish design.",
    description: "The Philips HD9252 digital air fryer circulates superheated air with its unique starfish bottom design to fry, bake, grill, and reheat food evenly without drowning ingredients in oil. Features 7 touch presets for samosas, french fries, chicken, and paneer tikka.",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=900&q=80",
    rating: 4.84,
    reviewsCount: 7800,
    dealTag: "Top Seller",
    featured: true,
    primaryStore: {
      storeName: "Amazon",
      price: 6999,
      originalPrice: 11995,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/kitchen?id=philips-air-fryer",
      badge: "42% Off Kitchen Fest",
      deliveryTime: "Prime One-Day"
    },
    storeOffers: [
      {
        storeName: "Amazon",
        price: 6999,
        originalPrice: 11995,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/kitchen?id=philips-air-fryer"
      },
      {
        storeName: "Flipkart",
        price: 7490,
        originalPrice: 11995,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/flipkart?id=philips-air-fryer"
      }
    ],
    pros: [
      "Cooks samosas, chicken tikka, and potato fries with 90% less oil",
      "Touchscreen with 7 preset cooking programs and keep-warm function",
      "QuickClean non-stick basket is dishwasher safe",
      "NutriU app with over 500+ Indian regional healthy recipes"
    ],
    cons: [
      "4.1L basket size is ideal for 3-4 people; larger families of 6+ should consider the XXL 7.2L model",
      "Exterior body gets slightly warm during extended 200°C roasting sessions"
    ],
    keyFeatures: [
      "Patented Rapid Air Technology with Starfish base",
      "1400W high-efficiency heating element",
      "Digital touch panel with auto-shutoff timer"
    ],
    specs: [
      { label: "Capacity", value: "4.1 Liters (approx 0.8 kg fries)" },
      { label: "Power", value: "1400 Watts" },
      { label: "Temperature", value: "60°C - 200°C" }
    ],
    faqs: [
      {
        question: "Can I make Indian snacks like samosas and cutlets in this?",
        answer: "Yes, brushing cutlets or samosas with a light coat of oil yields an authentic crispy golden crust without deep frying."
      }
    ],
    updatedAt: "2026-10-12"
  },
  {
    id: "prod-organic-india-superfood",
    slug: "organic-india-tulsi-green-tea-superfood-pantry-box",
    name: "Organic India Tulsi Green Tea & Superfood Organic Pantry Box (Pack of 3)",
    brand: "Organic India",
    category: "home",
    subcategory: "Gourmet & Groceries",
    tagline: "Certified organic stress-relieving adaptogenic green tea infused with Rama, Krishna & Vana Tulsi.",
    description: "Harvested from regenerative bio-dynamic organic farms across India. Rich in antioxidants and adaptogenic polyphenols that uplift metabolism, strengthen immune defenses, and provide natural calm without caffeine crashes.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewsCount: 4210,
    dealTag: "Best Value",
    featured: false,
    primaryStore: {
      storeName: "Brand Flagship",
      price: 599,
      originalPrice: 799,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/grocery?id=organic-india-tea",
      badge: "25% Off Pantry Combo",
      deliveryTime: "Standard Express"
    },
    storeOffers: [
      {
        storeName: "Brand Flagship",
        price: 599,
        originalPrice: 799,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/grocery?id=organic-india-tea"
      },
      {
        storeName: "Amazon",
        price: 625,
        originalPrice: 799,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/amazon?id=organic-india-tulsi-tea"
      }
    ],
    pros: [
      "Blend of 3 sacred Tulsi varieties (Rama, Krishna, Vana) with premium whole green tea leaves",
      "100% Certified USDA Organic and Non-GMO project verified",
      "Staple-free unbleached tea bags made from biodegradable plant fibers",
      "Gentle natural energy boost without jittery crashes"
    ],
    cons: [
      "Distinct herbaceous aroma may feel earthy to those accustomed to sweetened black teas",
      "Best consumed hot rather than iced"
    ],
    keyFeatures: [
      "USDA Organic, India Organic & Fairtrade certified",
      "Rich in natural flavonoids and catechins",
      "Supports liver detox and respiratory health"
    ],
    specs: [
      { label: "Quantity", value: "75 Tea Bags (3 x 25 tins)" },
      { label: "Certification", value: "USDA Organic, GMP, ISO 9001" }
    ],
    faqs: [
      {
        question: "When is the best time to drink this tea?",
        answer: "Enjoy 2 to 3 cups daily between meals, especially first thing in the morning and during mid-afternoon study or work sessions."
      }
    ],
    updatedAt: "2026-10-10"
  },

  // =========================================================================
  // 5. AI TOOLS & SAAS
  // =========================================================================
  {
    id: "prod-cursor-ai",
    slug: "cursor-ai-code-editor",
    name: "Cursor Pro - AI-Powered Code Editor (Claude 3.7 & GPT-4o)",
    brand: "Anysphere",
    category: "ai-tools",
    subcategory: "AI Code Assistants",
    tagline: "The modern software engineering IDE that writes, refactors, and debugs multi-file repos.",
    description: "Cursor is a fork of VS Code built from the ground up for agentic pair-programming. It indexes your entire repository to provide intelligent inline autocompletions, terminal command execution, and codebase-wide refactors via Composer mode.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    rating: 4.95,
    reviewsCount: 3100,
    dealTag: "Editor's Choice",
    featured: true,
    primaryStore: {
      storeName: "PartnerStack",
      price: 20,
      originalPrice: 20,
      currency: "USD",
      inStock: true,
      affiliateUrl: "/go/ai?id=cursor-pro",
      badge: "14-Day Pro Free Trial",
      deliveryTime: "Instant License Activation"
    },
    storeOffers: [
      {
        storeName: "PartnerStack",
        price: 20,
        originalPrice: 20,
        currency: "USD",
        inStock: true,
        affiliateUrl: "/go/ai?id=cursor-pro",
        badge: "Official Affiliate Partner"
      }
    ],
    pros: [
      "Semantic indexing understands complex multi-thousand file architectures",
      "Composer mode writes code across 10+ files simultaneously in a single prompt",
      "Access to Claude 3.7 Sonnet, GPT-4o, and specialized coding models",
      "One-click migration preserves all your existing VS Code extensions, themes, and keybindings"
    ],
    cons: [
      "Pro plan has 500 fast premium requests per month before slow queue activates",
      "Requires reliable internet connectivity for remote model inference"
    ],
    keyFeatures: [
      "Full VS Code extension compatibility",
      "Composer agentic workspace editor",
      "Terminal automatic error resolution with Cmd+K",
      "Privacy Mode ensures code is never trained on by LLM providers"
    ],
    specs: [
      { label: "Platforms", value: "macOS (Apple Silicon & Intel), Windows 11, Linux" },
      { label: "Supported Models", value: "Claude 3.7 Sonnet, GPT-4o, Gemini 2.5 Flash, DeepSeek V3" },
      { label: "Pricing Tier", value: "$20/month or $192/year (20% off)" }
    ],
    faqs: [
      {
        question: "Is my proprietary code stored or used to train models?",
        answer: "No. With Privacy Mode enabled in Cursor settings, none of your code is retained on server logs or used for model training."
      }
    ],
    updatedAt: "2026-10-12"
  },
  {
    id: "prod-jasper-ai",
    slug: "jasper-ai-marketing-platform",
    name: "Jasper AI - Enterprise Content & Brand Voice Generator",
    brand: "Jasper",
    category: "ai-tools",
    subcategory: "SEO & Marketing",
    tagline: "Generate on-brand blog posts, ad copies, and marketing campaigns in seconds.",
    description: "Jasper blends leading LLMs with your organization's unique brand tone, style guide, and product knowledge base. It guarantees SEO-optimized long-form articles that sound authentic to your enterprise voice.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewsCount: 2450,
    dealTag: "Best Value",
    featured: false,
    primaryStore: {
      storeName: "PartnerStack",
      price: 39,
      originalPrice: 49,
      currency: "USD",
      inStock: true,
      affiliateUrl: "/go/genai?id=jasper-ai",
      badge: "20% Off Annual Billing + 7-Day Trial",
      deliveryTime: "Instant Cloud Access"
    },
    storeOffers: [
      {
        storeName: "PartnerStack",
        price: 39,
        originalPrice: 49,
        currency: "USD",
        inStock: true,
        affiliateUrl: "/go/genai?id=jasper-ai"
      }
    ],
    pros: [
      "Custom Brand Voice memory trains on your URL content and PDF stylebooks",
      "Integrated Surfer SEO mode generates content ready to rank on Page 1",
      "Over 50+ battle-tested marketing templates (AIDA, PAS, Email, LinkedIn)",
      "Built-in Plagiarism checker and grammar optimization"
    ],
    cons: [
      "Pricier than raw ChatGPT subscriptions for solo bloggers",
      "Requires initial setup of brand voice guidelines for best output"
    ],
    keyFeatures: [
      "Multi-model routing engine using Claude, GPT-4, and proprietary fine-tunes",
      "Chrome browser extension for writing inside Google Docs and Gmail",
      "Art Studio AI image generator included"
    ],
    specs: [
      { label: "Languages", value: "30+ Global Languages supported" },
      { label: "Word Allowance", value: "Unlimited AI Generation on Creator Plan" }
    ],
    faqs: [
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel or downgrade at any time with one click in your billing dashboard."
      }
    ],
    updatedAt: "2026-10-10"
  },

  // =========================================================================
  // 6. HOSTING & DOMAINS
  // =========================================================================
  {
    id: "prod-hostinger-cloud",
    slug: "hostinger-cloud-startup-hosting",
    name: "Hostinger Cloud Startup Hosting (Ultra-Fast NVMe Storage & LiteSpeed)",
    brand: "Hostinger",
    category: "hosting",
    subcategory: "WordPress Hosting",
    tagline: "Dedicated cloud resources, free domain, 300 websites, and 99.99% uptime guarantee.",
    description: "Hostinger's Cloud Startup plan offers isolated cloud server power with the user-friendly simplicity of hPanel. Powered by LiteSpeed Web Server and NVMe storage, your websites load up to 4x faster with automated daily backups and free SSL.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80",
    rating: 4.85,
    reviewsCount: 5200,
    dealTag: "Flash Deal",
    featured: true,
    primaryStore: {
      storeName: "Direct Vendor",
      price: 699,
      originalPrice: 2299,
      currency: "INR",
      inStock: true,
      affiliateUrl: "/go/hostinger?deal=cloud-startup-75off",
      badge: "75% OFF + 3 Months Free with Code BHUJ75",
      deliveryTime: "Instant 60-Second Setup"
    },
    storeOffers: [
      {
        storeName: "Direct Vendor",
        price: 699,
        originalPrice: 2299,
        currency: "INR",
        inStock: true,
        affiliateUrl: "/go/hostinger?deal=cloud-startup-75off",
        badge: "Exclusive Deal Partner"
      }
    ],
    pros: [
      "Isolated CPU & 3GB RAM provides rock-solid performance during traffic spikes",
      "Free custom domain name (.com, .net, .in) included for the first year",
      "Built-in LiteSpeed Cache plugin boosts Core Web Vitals to 98+",
      "30-day money-back guarantee with 24/7 multilingual live chat support"
    ],
    cons: [
      "Maximum discount requires committing to a 48-month billing term",
      "No cPanel (uses proprietary hPanel, though many users find it cleaner)"
    ],
    keyFeatures: [
      "Host up to 300 websites on a single plan",
      "200GB Ultra-Fast NVMe SSD Storage",
      "Dedicated IP address included at no extra charge",
      "Free automated daily backups & 1-click restore"
    ],
    specs: [
      { label: "Server Architecture", value: "LiteSpeed Web Server with LSCache" },
      { label: "RAM / CPU", value: "3GB Dedicated RAM / 2 Dedicated CPU Cores" },
      { label: "Bandwidth", value: "Unlimited Unmetered Bandwidth" },
      { label: "Data Centers", value: "USA, UK, France, India, Singapore, Brazil" }
    ],
    faqs: [
      {
        question: "Can I migrate my existing WordPress site for free?",
        answer: "Yes, Hostinger's migration team will transfer your existing WordPress website completely free within 24 hours without any downtime."
      }
    ],
    updatedAt: "2026-10-12"
  }
];
