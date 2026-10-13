export interface HotelBookingRate {
  provider: "Agoda" | "Booking.com" | "MakeMyTrip" | "Expedia";
  pricePerNight: number;
  originalPricePerNight: number;
  currency: "INR" | "USD";
  freeCancellation: boolean;
  breakfastIncluded: boolean;
  affiliateUrl: string;
  badge?: string;
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  destination: string;
  country: string;
  tier: "Luxury" | "Boutique" | "Budget" | "Resort";
  starRating: 3 | 4 | 5;
  guestRating: number; // e.g. 9.4
  reviewCount: number;
  ratingLabel: "Superb" | "Exceptional" | "Fabulous" | "Very Good";
  image: string;
  tagline: string;
  description: string;
  locationDetails: string;
  amenities: string[];
  roomType: string;
  rates: HotelBookingRate[];
  pros: string[];
  cons: string[];
  featured: boolean;
  dealTag?: string;
}

export const HOTELS: Hotel[] = [
  // 1. BHUJ (KUTCH) - Agoda City ID 671731
  {
    id: "hotel-regenta-resort-bhuj",
    slug: "regenta-resort-bhuj-kutch",
    name: "Regenta Resort Bhuj by Royal Orchid, Kutch",
    destination: "Bhuj, Kutch, Gujarat",
    country: "India",
    tier: "Resort",
    starRating: 4,
    guestRating: 9.2,
    reviewCount: 1840,
    ratingLabel: "Superb",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    tagline: "Heritage Kutch architecture with traditional Bhunga villas, pool, and fine Gujarati dining.",
    description: "Spread over acres of peaceful gardens just minutes from Bhuj Airport and the historic Aina Mahal, Regenta Resort Bhuj features traditional circular Bhunga accommodations decorated with authentic mirror-work lipan art. It offers an outdoor swimming pool, fitness center, and multi-cuisine restaurant.",
    locationDetails: "GMDC Road, Mirzapar Highway, Bhuj, Kutch, Gujarat 370001",
    amenities: ["Swimming Pool", "Heritage Bhunga Villas", "Gazebo Restaurant", "Free WiFi", "Gym & Fitness", "Airport Shuttle"],
    roomType: "Heritage Bhunga King Cottage with Private Sit-Out",
    rates: [
      {
        provider: "Agoda",
        pricePerNight: 6800,
        originalPricePerNight: 8500,
        currency: "INR",
        freeCancellation: true,
        breakfastIncluded: true,
        affiliateUrl: "/go/agoda?city=bhuj",
        badge: "Agoda VIP Deal (Lowest Rate)"
      },
      {
        provider: "MakeMyTrip",
        pricePerNight: 7400,
        originalPricePerNight: 8500,
        currency: "INR",
        freeCancellation: false,
        breakfastIncluded: true,
        affiliateUrl: "/go/agoda?city=bhuj"
      }
    ],
    pros: [
      "Authentic Kutch Bhunga design with modern 4-star luxury comforts",
      "Serene landscaped gardens away from city bustle",
      "Outstanding Gujarati thali and international buffet spreads",
      "Short 15-minute drive to Bhuj Airport and Prag Mahal"
    ],
    cons: [
      "Peak Rann Utsav season (Nov - Feb) requires booking 4-8 weeks in advance",
      "Limited public transit outside; hotel cab service recommended"
    ],
    featured: true,
    dealTag: "Bhuj Favorite"
  },

  // 2. DHOLAVIRA (KUTCH) - Agoda City ID 728349
  {
    id: "hotel-dholavira-tourism-resort",
    slug: "dholavira-tourism-resort-harappan-oasis",
    name: "Dholavira Tourism Resort & Harappan Oasis, Kutch",
    destination: "Dholavira, Khadir Bet, Kutch",
    country: "India",
    tier: "Resort",
    starRating: 4,
    guestRating: 9.1,
    reviewCount: 920,
    ratingLabel: "Superb",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    tagline: "Eco-luxury gateway to the UNESCO World Heritage Harappan Archaeological Metropolis.",
    description: "Located near the UNESCO World Heritage archaeological excavation of the Indus Valley Civilization on Khadir Bet island in the Great Rann of Kutch. Features comfortable desert tents and AC Bhungas, traditional folk performances, and stargazing under pollution-free skies.",
    locationDetails: "Khadir Bet Island, Near UNESCO Excavation Site, Dholavira, Kutch 370165",
    amenities: ["UNESCO Site Access", "AC Desert Cottages", "Traditional Kathiyawadi Dining", "Desert Safari Assistance", "Bonfire Evenings", "Free Parking"],
    roomType: "Royal AC Kutch Bhunga Suite",
    rates: [
      {
        provider: "Agoda",
        pricePerNight: 4500,
        originalPricePerNight: 6000,
        currency: "INR",
        freeCancellation: true,
        breakfastIncluded: true,
        affiliateUrl: "/go/agoda?city=dholavira",
        badge: "Agoda Special Price"
      },
      {
        provider: "MakeMyTrip",
        pricePerNight: 5100,
        originalPricePerNight: 6000,
        currency: "INR",
        freeCancellation: false,
        breakfastIncluded: true,
        affiliateUrl: "/go/agoda?city=dholavira"
      }
    ],
    pros: [
      "Unmatched proximity to ancient 5,000-year-old Harappan water reservoirs and citadel",
      "Spectacular White Desert sunset and Road to Heaven drive",
      "Zero light pollution delivers world-class Milky Way stargazing",
      "Warm Kutchi hospitality with farm-fresh organic meals"
    ],
    cons: [
      "Remote island location requires driving across the scenic Khadir Bet causeway",
      "Limited cell network connectivity (BSNL / Jio primary)"
    ],
    featured: true,
    dealTag: "UNESCO World Heritage"
  },

  // 3. UDAIPUR - Agoda City ID 3667
  {
    id: "hotel-oberoi-udaivilas",
    slug: "the-oberoi-udaivilas-udaipur",
    name: "The Oberoi Udaivilas, Udaipur",
    destination: "Udaipur, Rajasthan",
    country: "India",
    tier: "Luxury",
    starRating: 5,
    guestRating: 9.8,
    reviewCount: 2480,
    ratingLabel: "Exceptional",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    tagline: "Voted India's best heritage luxury palace on the serene banks of Lake Pichola.",
    description: "Spread over 50 acres of royal gardens, domed pavilions, and tranquil reflecting pools, The Oberoi Udaivilas stands on the 200-year-old hunting grounds of the Maharana of Mewar. Guests arrive across Lake Pichola by private ceremonial boat.",
    locationDetails: "Haridas Ji Ki Magri, Lake Pichola Waterfront, Udaipur, Rajasthan 313001",
    amenities: ["Lake Pichola View", "Private Semi-Private Pools", "Oberoi Spa", "24/7 Butler Service", "Fine Dining Courtyards", "Free High-Speed WiFi"],
    roomType: "Premier Room with Semi-Private Pool Access",
    rates: [
      {
        provider: "Agoda",
        pricePerNight: 42500,
        originalPricePerNight: 55000,
        currency: "INR",
        freeCancellation: true,
        breakfastIncluded: true,
        affiliateUrl: "/go/agoda?city=udaipur",
        badge: "Agoda Lowest Price Guarantee"
      },
      {
        provider: "Booking.com",
        pricePerNight: 44900,
        originalPricePerNight: 55000,
        currency: "INR",
        freeCancellation: true,
        breakfastIncluded: true,
        affiliateUrl: "/go/agoda?city=udaipur"
      }
    ],
    pros: [
      "Spectacular private boat arrival across shimmering Lake Pichola",
      "Semi-private swimming pool directly accessed from your bedroom terrace",
      "World-class Mewari royal hospitality and dedicated butler care",
      "Wildlife conservatory with peacocks and spotted deer on grounds"
    ],
    cons: [
      "Peak holiday dates sell out 3 to 6 months in advance",
      "High dining pricing on property"
    ],
    featured: true,
    dealTag: "Top Luxury Pick"
  },

  // 4. JAIPUR - Agoda City ID 8845
  {
    id: "hotel-rambagh-palace-jaipur",
    slug: "rambagh-palace-jaipur-taj",
    name: "Rambagh Palace, Jaipur - Taj Luxury Heritage",
    destination: "Jaipur, Rajasthan",
    country: "India",
    tier: "Luxury",
    starRating: 5,
    guestRating: 9.7,
    reviewCount: 3410,
    ratingLabel: "Exceptional",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    tagline: "The Jewel of Jaipur: Former royal residence of the Maharaja of Jaipur.",
    description: "Built in 1835, Rambagh Palace offers an extravagant glimpse into royal Rajput history. Walk through 47 manicured acres of gardens where peacocks stroll freely, dine in the Polo Bar, and relax in opulent marble suites adorned with authentic antique artwork.",
    locationDetails: "Bhawani Singh Road, Near Rambagh Circle, Jaipur, Rajasthan 302005",
    amenities: ["Palace Architecture", "Jiva Grande Spa", "Indoor & Outdoor Pools", "Vintage Car Airport Transfers", "Polo Bar", "Fine Dining Suvarna Mahal"],
    roomType: "Palace Room with Royal Courtyard View",
    rates: [
      {
        provider: "Agoda",
        pricePerNight: 38000,
        originalPricePerNight: 48000,
        currency: "INR",
        freeCancellation: true,
        breakfastIncluded: true,
        affiliateUrl: "/go/agoda?city=jaipur",
        badge: "Agoda Heritage Deal"
      },
      {
        provider: "Booking.com",
        pricePerNight: 41200,
        originalPricePerNight: 48000,
        currency: "INR",
        freeCancellation: true,
        breakfastIncluded: true,
        affiliateUrl: "/go/agoda?city=jaipur"
      }
    ],
    pros: [
      "Ranked among the world's finest historic palace hotels",
      "Suvarna Mahal restaurant serves royal thali on gold-plated tableware under Italian crystal chandeliers",
      "Grand peacock gardens and regal Rajput welcome ceremony with rose petals",
      "Convenient central location in the Pink City"
    ],
    cons: [
      "Strict formal dress code in signature fine dining restaurants",
      "High room tariffs during royal wedding season"
    ],
    featured: true,
    dealTag: "World's #1 Hotel"
  },

  // 5. JAISALMER - Agoda City ID 7719
  {
    id: "hotel-suryagarh-jaisalmer",
    slug: "suryagarh-jaisalmer-thar-fortress",
    name: "Suryagarh Jaisalmer - The Great Thar Desert Fortress",
    destination: "Jaisalmer, Rajasthan",
    country: "India",
    tier: "Resort",
    starRating: 5,
    guestRating: 9.6,
    reviewCount: 2150,
    ratingLabel: "Exceptional",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    tagline: "Golden sandstone fortress rising majestically from the Thar Desert with royal banquets and safaris.",
    description: "Suryagarh is a magnificent palace fortress built from carved golden yellow sandstone. Preserving medieval desert architectural traditions, it offers curated desert dune exploration, musical evenings under the stars, and the signature Rait desert spa.",
    locationDetails: "Kahala Phata, Sam Road, Jaisalmer, Rajasthan 345001",
    amenities: ["Thar Desert Views", "Indoor Heated Pool (Neel)", "Rait Desert Spa", "Camel & Jeep Safaris", "Live Sitar Evenings", "Archery Range"],
    roomType: "Palace Suite with Desert Balcony",
    rates: [
      {
        provider: "Agoda",
        pricePerNight: 21000,
        originalPricePerNight: 28000,
        currency: "INR",
        freeCancellation: true,
        breakfastIncluded: true,
        affiliateUrl: "/go/agoda?city=jaisalmer",
        badge: "Agoda Thar Desert Deal"
      },
      {
        provider: "MakeMyTrip",
        pricePerNight: 23500,
        originalPricePerNight: 28000,
        currency: "INR",
        freeCancellation: false,
        breakfastIncluded: true,
        affiliateUrl: "/go/agoda?city=jaisalmer"
      }
    ],
    pros: [
      "Mesmerizing golden hour light across fortress ramparts and desert courtyards",
      "Unforgettable sunrise desert breakfast and midnight chudail trail experiences",
      "Heated indoor swimming pool Neel with sunken lounge seating",
      "Exquisite Halwai breakfast buffet with hot jalebis and mirchi vadas"
    ],
    cons: [
      "Located 15 km outside Jaisalmer city center on Sam Road",
      "Intense summer afternoon desert heat (recommended October to March)"
    ],
    featured: false,
    dealTag: "Desert Luxury"
  },

  // 6. SRINAGAR (KASHMIR) - Agoda City ID 10188
  {
    id: "hotel-lalit-grand-palace-srinagar",
    slug: "the-lalit-grand-palace-srinagar-kashmir",
    name: "The Lalit Grand Palace Srinagar, Kashmir",
    destination: "Srinagar, Jammu & Kashmir",
    country: "India",
    tier: "Luxury",
    starRating: 5,
    guestRating: 9.5,
    reviewCount: 1980,
    ratingLabel: "Superb",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    tagline: "Victorian royal palace overlooking Dal Lake and the snow-capped Zabarwan mountain ranges.",
    description: "Built in 1910 by Maharaja Pratap Singh, The Lalit Grand Palace stands surrounded by towering Chinar trees and manicured rose gardens overlooking Dal Lake. Enjoy authentic Kashmiri Wazwan dining, Shikara boat transfers, and indoor heated swimming pools.",
    locationDetails: "Gupkar Road, Near Dal Lake, Srinagar, Jammu & Kashmir 190001",
    amenities: ["Dal Lake Views", "Historic Chinar Lawns", "Indoor Heated Pool", "Rejuve The Spa", "Wazwan Restaurant", "Helipad Access"],
    roomType: "Palace Deluxe Room with Zabarwan Hill View",
    rates: [
      {
        provider: "Agoda",
        pricePerNight: 24500,
        originalPricePerNight: 32000,
        currency: "INR",
        freeCancellation: true,
        breakfastIncluded: true,
        affiliateUrl: "/go/agoda?city=srinagar",
        badge: "Agoda Kashmir Valley Deal"
      },
      {
        provider: "Booking.com",
        pricePerNight: 27000,
        originalPricePerNight: 32000,
        currency: "INR",
        freeCancellation: true,
        breakfastIncluded: true,
        affiliateUrl: "/go/agoda?city=srinagar"
      }
    ],
    pros: [
      "Breathtaking mountain panoramas of Dal Lake and Zabarwan ranges",
      "Century-old Chinar trees with sprawling lawn seating for afternoon Kehwa tea",
      "Traditional multi-course Kashmiri Wazwan prepared by royal Wazas",
      "Heated indoor pool for all-weather relaxation"
    ],
    cons: [
      "Winter snow days require pre-arranged 4x4 airport vehicle transfers",
      "High seasonal demand during Tulip Festival in April"
    ],
    featured: false,
    dealTag: "Kashmir Paradise"
  }
];
