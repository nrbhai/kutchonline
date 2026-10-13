/**
 * LIVE AFFILIATE CREDENTIALS & STORE ROUTING - BHUJDEALS
 * 
 * Configured with YOUR REAL AFFILIATE IDs:
 * 1. Amazon Associates India: tag "bhujonline-21"
 * 2. EarnKaro User ID: 4705638
 * 3. Cuelinks: 55+ Verified Active Campaign Links (clnk.in / ajo.clnk.in)
 */

export const AFFILIATE_CONFIG = {
  // Amazon Associates India (Direct Tag bhujonline-21)
  amazon: {
    tag: "bhujonline-21",
    storeUrl: "https://www.amazon.in/?tag=bhujonline-21",
    searchUrl: "https://www.amazon.in/s?k={QUERY}&tag=bhujonline-21"
  },

  // EarnKaro Master ID
  earnkaro: {
    userId: "4705638",
    referralLink: "https://earnkaro.com/?r=4705638",
    storesHubUrl: "https://earnkaro.com/stores?r=4705638"
  },

  // Direct Merchant Partner Links (routed via real tracking links)
  stores: {
    ajio: "https://ajiio.in/e4ZOm3Y",
    nykaa: "https://clnk.in/B8KA",
    flipkart: "https://clnk.in/B8KU",
    croma: "https://clnk.in/CGB1",
    tatacliq: "https://clnk.in/CGB0",
    myntra: "https://myntr.it/k8rNJEX"
  },

  // Travel Networks - Primary Hotel Provider: Agoda Partner ID 1970139
  agoda: {
    cid: "1970139",
    defaultPartnerUrl: "https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1970139&hl=en-us",
    destinationUrl: "https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1970139&hl=en-us",
    cityUrls: {
      bhuj: "https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1970139&hl=en-us&city=671731",
      dholavira: "https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1970139&hl=en-us&city=728349",
      udaipur: "https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1970139&hl=en-us&city=3667",
      jaipur: "https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1970139&hl=en-us&city=8845",
      jaisalmer: "https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1970139&hl=en-us&city=7719",
      srinagar: "https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1970139&hl=en-us&city=10188"
    }
  },
  booking: {
    // Routed to Agoda as requested ("in hotels use our Agoda ID, not Booking.com ID")
    destinationUrl: "https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1970139&hl=en-us"
  },
  travelHolidays: {
    destinationUrl: "https://clnk.in/B8Lg" // Real Cuelinks Domestic & International Holidays!
  },

  // Hosting
  hostinger: {
    referralCode: "BHUJ75",
    destinationUrl: "https://www.hostinger.com/?REFERRALCODE=BHUJ75"
  },

  // Cuelinks Master 55-Campaign Catalog
  cuelinks: {
    // 1. Health & Beauty
    beauty: {
      primary: "https://clnk.in/B8KA",        // 1. Health & Beauty (Nykaa / General)
      skincare: "https://clnk.in/B8Tn",       // 12. Skincare serums & treatments
      seniorCare: "https://clnk.in/B8K8",     // 6. For aged people Health & Beauty
      wellness: "https://clnk.in/CGDT",       // 18. Health & Beauty (Wellness & Nutrition)
      cosmetics: "https://clnk.in/CGD1",      // 20. Health & Beauty (Makeup & Cosmetics)
      personalCare: "https://clnk.in/CGEm",   // 24. Health & Beauty (Body & Bath)
      haircare: "https://clnk.in/CGEt",       // 26. Health & Beauty (Hair Repair)
      dermatology: "https://clnk.in/CGE0",    // 36. Health & Beauty (Dermatology & Sunscreens)
      kBeauty: "https://clnk.in/CGFs",        // 41. Health & Beauty (Korean Skincare)
      beautyCombos: "https://clnk.in/CIzX",   // 44. Health & Beauty (Gift Boxes & Combos)
      luxuryBeauty: "https://clnk.in/CIAw",   // 49. Health & Beauty (Luxury Fragrance & Beauty)
      herbalAyurveda: "https://clnk.in/CIAI", // 50. Health & Beauty (Herbal & Ayurvedic)
      salonGrade: "https://clnk.in/CIBm"      // 54. Health & Beauty (Salon Styling Tools)
    },

    // 2. Electronics & Tech
    electronics: {
      primary: "https://clnk.in/B8KU",        // 4. Electronics (Flipkart / General)
      gadgets: "https://clnk.in/CGB1",        // 14. Electronics (Croma Tech)
      audioSmartphones: "https://clnk.in/CGD7", // 22. Electronics (Smartphones & Audio)
      appliances: "https://clnk.in/CIz4"      // 45. Electronics (Smart Home & Appliances)
    },

    // 3. Fashion & Apparel
    fashion: {
      ajio: "https://ajiio.in/e4ZOm3Y",       // Direct AJIO Flagship Campaign
      perfumeFragrance: "https://clnk.in/B8Lv", // 9. Fashion/perfume
      footwear: "https://myntr.it/k8rNJEX",   // Direct Myntra / Footwear Campaign
      luxuryApparel: "https://clnk.in/CGB0",  // 13. Fashion (Tata CLiQ Luxury)
      mensWear: "https://clnk.in/CGCj",       // 15. Fashion (Men's Fashion)
      womensWear: "https://clnk.in/CGDj",     // 16. Fashion, Health & Beauty (Women's)
      streetwear: "https://clnk.in/CGD2",     // 21. Fashion (Streetwear & Sneakers)
      ethnicWear: "https://clnk.in/CGEb",     // 23. Fashion (Ethnic Wear & Kurtas)
      designerWatches: "https://clnk.in/CGEs", // 25. Fashion (Designer Watches)
      activewear: "https://clnk.in/CGEy",     // 27. Fashion (Activewear & Gym)
      accessories: "https://clnk.in/CGEH",    // 28. Fashion Accessories
      winterwear: "https://clnk.in/CGEO",     // 29. Fashion (Jackets & Winterwear)
      premiumStyle: "https://clnk.in/CGEW",   // 33. Fashion (Premium Style)
      lifestyleTrends: "https://clnk.in/CGE4", // 37. Fashion (Gen-Z & Trendy)
      giftingFlowers: "https://clnk.in/CGE8", // 40. Fashion, Flowers & Gifts
      everydayBasics: "https://clnk.in/CIAc", // 47. Fashion (Everyday Basics)
      festiveWedding: "https://clnk.in/CIAM"  // 51. Fashion (Wedding & Festive)
    },

    // 4. Travel & Air Flights
    travel: {
      flights: "https://clnk.in/B8K9",        // 7a. Travel / Air flight
      hotels: "https://clnk.in/B8La",         // 7b. Travel / Hotels
      holidays: "https://clnk.in/B8Lg"        // 7c. Travel / Holidays & Packages
    },

    // 5. Software & Artificial Intelligence
    softwareAI: {
      saasSoftware: "https://clnk.in/B8KJ",   // 2. Software (General SaaS)
      marketingTools: "https://clnk.in/B8K2", // 5. Marketing tools
      aiTools: "https://clnk.in/CGD0",        // 19. Artificial Intelligence
      cloudSoftware: "https://clnk.in/CGER",  // 31. Software (Cloud & DevOps)
      genAI: "https://clnk.in/CGE5",          // 38. Artificial Intelligence (GenAI)
      productivityApps: "https://clnk.in/CIBt" // 55. Software (Productivity & Office)
    },

    // 6. Home, Kitchen & Grocery
    homeKitchen: {
      kitchenElectronics: "https://clnk.in/CIzT", // 43. Home & Kitchen electronics
      foodGrocery: "https://clnk.in/CIAa"         // 46. Food & Grocery, Home & Kitchen
    },

    // 7. Finance & Banking
    finance: {
      primary: "https://clnk.in/B8KP",        // 3. Finance
      cardsBanking: "https://clnk.in/CGEX"    // 34. Finance (Cards & Banking)
    },

    // 8. Gaming & Entertainment
    gaming: {
      entertainment: "https://clnk.in/CGDP",  // 17. Entertainment & OTT
      gamingGear: "https://clnk.in/CGEP",     // 30. Gaming Gear & Consoles
      esports: "https://clnk.in/CGFu"         // 42. Gaming (Esports)
    },

    // 9. Services & Others
    services: {
      services1: "https://clnk.in/B8LX",      // 11 / 32. Services
      services2: "https://clnk.in/CGE6",      // 39. Services
      services3: "https://clnk.in/CIA3",      // 52 / 53. Services
      others1: "https://clnk.in/CGEZ",        // 35. Others
      others2: "https://clnk.in/CIAe"         // 48. Others
    }
  }
};

