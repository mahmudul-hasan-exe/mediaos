import { NewsArticle, ArticleStatus } from "@/types";

export const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: "art-01",
    title: "Global Leaders Reach Historic Accord on Autonomous AI Governance Frameworks",
    slug: "global-leaders-historic-accord-autonomous-ai-governance",
    subtitle: "Delegates from 68 nations finalize ethical guidelines, safety audits, and liability standards in Geneva.",
    excerpt: "In a groundbreaking summit concluding today, international negotiators codified landmark treaties governing high-capability autonomous systems, mandating verifiable provenance and safety certifications.",
    content: `<p>In what diplomatic observers are calling the most consequential multilateral digital pact of the decade, representatives from sixty-eight countries signed the Geneva Convention on Autonomous Computation this afternoon.</p>
    <p>The framework establishes strict legal liability protocols for advanced autonomous intelligence clusters, requiring independent cryptographic auditing before models exceeding specified inference thresholds can interface with critical civil infrastructure.</p>
    <blockquote>"We stand at a hinge point of history. Progress in machine intelligence cannot outpace our commitment to institutional resilience and citizen safety," declared chief rapporteur Dame Eleanor Vance during the closing plenary.</blockquote>
    <p>Financial markets rallied following the announcement, with tech indices surging 2.4% as regulatory certainty replaced months of speculative apprehension. The agreement now heads to domestic legislatures for formal ratification ahead of the mid-year target enforcement deadline.</p>
    <p>Key pillars include mandatory watermarking for synthetic video transmissions, cross-border cooperation on catastrophic compute monitoring, and an emergency global shutdown coordination council headquartered in Zurich.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    imageCaption: "Plenary hall at the International Conference Center in Geneva during the closing vote.",
    gallery: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    ],
    categoryId: "cat-world",
    categoryName: "World Affairs",
    subcategoryId: "sub-diplomacy",
    subcategoryName: "Diplomacy",
    tags: ["Artificial Intelligence", "Geopolitics", "Geneva", "Policy", "Technology"],
    authorId: "usr-01",
    authorName: "Sarah Jenkins",
    reporterId: "usr-04",
    reporterName: "David O'Connor",
    status: "published",
    isBreaking: true,
    isFeatured: true,
    isEditorPick: true,
    views: 48920,
    shares: 3410,
    language: "en",
    publishedAt: "2025-02-14T08:30:00Z",
    createdAt: "2025-02-14T06:15:00Z",
    updatedAt: "2025-02-14T08:30:00Z",
    seo: {
      metaTitle: "Global Leaders Sign Milestone AI Governance Accord in Geneva — MediaOS",
      metaDescription: "68 nations ratify sweeping autonomous AI governance treaties, instituting safety audits and mandatory provenance standards.",
      keywords: ["AI Treaty", "Geneva Accord", "Global Tech Governance", "Machine Ethics"],
    },
  },
  {
    id: "art-02",
    title: "Quantum Chip Architecture Breaks 10,000 Logical Qubit Threshold",
    slug: "quantum-chip-architecture-breaks-logical-qubit-threshold",
    subtitle: "Breakthrough error correction algorithms eliminate thermal decoherence roadblocks in silicon lattice trials.",
    excerpt: "Engineers at the Quantum Dynamics Institute have demonstrated fault-tolerant quantum calculation at room temperature, paving the path for hyper-scale materials modeling and pharmaceutical synthesis.",
    content: `<p>A profound breakthrough in topological condensed matter physics was disclosed this morning in Nature Physics, announcing the world's first sustained 10,000 logical qubit lattice operating with 99.998% gate fidelity.</p>
    <p>By leveraging novel photonic interconnects and topological braiding techniques, the research team achieved fault-tolerant coherence times measuring several hours rather than fractions of milliseconds.</p>
    <p>The implications for computational biology and enzyme engineering are seismic: molecular simulations that previously required centuries of supercomputer runtimes can now execute in seconds.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80",
    imageCaption: "Cryogenic vacuum testbed housing the topological quantum processor.",
    categoryId: "cat-tech",
    categoryName: "Technology & AI",
    subcategoryId: "sub-quantum",
    subcategoryName: "Quantum Computing",
    tags: ["Quantum", "Physics", "Semiconductors", "DeepTech"],
    authorId: "usr-02",
    authorName: "Dr. Marcus Wei",
    status: "published",
    isBreaking: false,
    isFeatured: true,
    isEditorPick: true,
    views: 31200,
    shares: 2150,
    language: "en",
    publishedAt: "2025-02-13T14:00:00Z",
    createdAt: "2025-02-13T10:00:00Z",
    updatedAt: "2025-02-13T14:00:00Z",
    seo: {
      metaTitle: "Breakthrough 10,000 Qubit Quantum Processor Revealed",
      metaDescription: "Engineers achieve fault-tolerant room-temperature quantum computing milestone.",
      keywords: ["Quantum Chip", "Qubits", "Topological Physics", "Computing"],
    },
  },
  {
    id: "art-03",
    title: "Central Banks Accelerate Interoperable Digital Currency Trials Amid Cross-Border Trade Shifts",
    slug: "central-banks-accelerate-cbdc-trials-trade-shifts",
    subtitle: "Wholesale settlement pilots reduce transaction friction by 84% across transatlantic corridors.",
    excerpt: "Wholesale Central Bank Digital Currencies (wCBDCs) completed a trillion-dollar multi-currency liquidity simulation, demonstrating instant settlement and reduced counterparty risk.",
    content: `<p>Central banking authorities representing fourteen monetary zones concluded Project Nexus today, verifying that atomic gross settlement over permissioned distributed ledgers reduces foreign exchange settlement risks to near zero.</p>
    <p>The consortium reported zero payment failures across more than 400,000 cross-border enterprise invoices valued at over $1.2 trillion equivalent.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    imageCaption: "Financial trading terminal displaying multi-currency liquidity corridors.",
    categoryId: "cat-business",
    categoryName: "Business & Economy",
    subcategoryId: "sub-banking",
    subcategoryName: "Banking & Finance",
    tags: ["Economy", "CBDC", "Banking", "Fintech", "Trade"],
    authorId: "usr-03",
    authorName: "Helena Rostova",
    status: "published",
    isBreaking: false,
    isFeatured: false,
    views: 18400,
    shares: 890,
    language: "en",
    publishedAt: "2025-02-12T11:20:00Z",
    createdAt: "2025-02-12T09:00:00Z",
    updatedAt: "2025-02-12T11:20:00Z",
    seo: {
      metaTitle: "Central Banks Report Major Success in Interoperable CBDC Pilot",
      metaDescription: "Project Nexus delivers 84% fee reduction in international enterprise remittances.",
      keywords: ["Central Bank", "CBDC", "Financial Systems", "Forex"],
    },
  },
  {
    id: "art-04",
    title: "Renewable Microgrids Shield Coastal Metropolises from Severe Winter Superstorms",
    slug: "renewable-microgrids-shield-coastal-metropolises",
    subtitle: "Decentralized battery storage networks kept millions connected during Category 4 arctic blast.",
    excerpt: "Decentralized solar-wind microgrids with solid-state energy storage arrays successfully isolated municipal grids during record-breaking blizzards, preventing widespread blackouts.",
    content: `<p>As freezing arctic gales battered northern coastal regions with record-setting gusts, newly commissioned decentralized municipal microgrids proved their strategic worth over seventy-two continuous hours of sub-zero temperatures.</p>
    <p>Automated islanding systems seamlessly decoupled regional sectors within milliseconds when main high-voltage transmission lines tripped, powering hospitals, emergency transit hubs, and residential warming centers without interruption.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&auto=format&fit=crop&q=80",
    categoryId: "cat-climate",
    categoryName: "Climate & Science",
    tags: ["Clean Energy", "Microgrids", "Climate Resilience", "Sustainability"],
    authorId: "usr-01",
    authorName: "Sarah Jenkins",
    status: "published",
    isBreaking: false,
    isFeatured: true,
    views: 22100,
    shares: 1450,
    language: "en",
    publishedAt: "2025-02-11T16:45:00Z",
    createdAt: "2025-02-11T13:00:00Z",
    updatedAt: "2025-02-11T16:45:00Z",
    seo: {
      metaTitle: "Microgrids Maintain Power During Unprecedented Winter Blizzards",
      metaDescription: "Decentralized energy systems protect millions during severe weather events.",
      keywords: ["Microgrids", "Clean Tech", "Infrastructure", "Climate"],
    },
  },
  {
    id: "art-05",
    title: "Investigation: Supply Chain Fragilities in Critical Rare Earth Processing",
    slug: "investigation-supply-chain-fragilities-rare-earth-processing",
    subtitle: "A six-month investigative dispatch examining bottleneck vulnerabilities across high-tech defense and aerospace supply chains.",
    excerpt: "Despite heavy legislative pledges, more than 82% of refined neodymium and dysprosium remains concentrated in three regional facilities, creating acute risks for green energy and aerospace manufacturing.",
    content: `<p>A comprehensive six-month examination of global mining manifests, export customs clearances, and refining licenses reveals persistent vulnerabilities that national security strategists have warned about for over a decade.</p>
    <p>While extraction has diversified into Australia, North America, and Scandinavia, the chemical separation and metallurgical refinement processes remain profoundly bottlenecked.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1200&auto=format&fit=crop&q=80",
    categoryId: "cat-investigation",
    categoryName: "Investigative Desk",
    tags: ["Investigation", "Minerals", "Supply Chain", "Defense"],
    authorId: "usr-04",
    authorName: "David O'Connor",
    status: "pending",
    isBreaking: false,
    isFeatured: false,
    views: 0,
    shares: 0,
    language: "en",
    createdAt: "2025-02-14T09:10:00Z",
    updatedAt: "2025-02-14T09:10:00Z",
    seo: {
      metaTitle: "Rare Earth Supply Chain Bottlenecks: Special Investigation",
      metaDescription: "In-depth investigative report on global mineral refinement risks.",
      keywords: ["Investigation", "Rare Earths", "Supply Chains"],
    },
  },
  {
    id: "art-06",
    title: "Draft Proposal: Next-Gen Autonomous Transit Corridor for Metropolis Center",
    slug: "draft-autonomous-transit-corridor-metropolis",
    subtitle: "Feasibility study outlining dedicated subterranean EV freight and express passenger pods.",
    excerpt: "City planners have drafted a $4.2B multi-phase capital deployment for zero-emission subterranean transit routes connecting suburban logistics hubs with urban core freight stations.",
    content: `<p>Urban transport commissions unveiled preliminary blueprints for an integrated underground transport artery designed to remove heavy transport vehicles from surface streets by 2030.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=1200&auto=format&fit=crop&q=80",
    categoryId: "cat-city",
    categoryName: "Urban & Living",
    tags: ["Urban Planning", "Transit", "Autonomous Vehicles"],
    authorId: "usr-02",
    authorName: "Dr. Marcus Wei",
    status: "draft",
    isBreaking: false,
    isFeatured: false,
    views: 0,
    shares: 0,
    language: "en",
    createdAt: "2025-02-13T18:00:00Z",
    updatedAt: "2025-02-13T18:00:00Z",
    seo: {
      metaTitle: "Autonomous Transit Corridor Proposed for Metropolis",
      metaDescription: "City plans subterranean EV freight routes.",
      keywords: ["Urban Transit", "Logistics"],
    },
  },
  {
    id: "art-07",
    title: "Editorial Review: Satellite Megaconstellations and Orbital Debris Remediation",
    slug: "orbital-debris-remediation-satellite-megaconstellations",
    subtitle: "New laser tracking data indicates a 40% increase in near-miss encounters in low-Earth orbit.",
    excerpt: "Astronomers and aerospace safety organizations are calling for an immediate moratorium on unshielded orbital deployments until active magnetic de-orbiting systems become mandatory.",
    content: `<p>With more than 15,000 active communication satellites orbiting between 400 and 1,200 kilometers altitude, the threat of cascading orbital collisions—known as the Kessler Syndrome—has moved from theoretical contingency to daily operational emergency.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop&q=80",
    categoryId: "cat-climate",
    categoryName: "Climate & Science",
    tags: ["Space", "Aerospace", "Orbit", "Satellites"],
    authorId: "usr-04",
    authorName: "David O'Connor",
    status: "rejected",
    rejectionFeedback: "Needs primary verification from ESA space debris office and additional input from private satellite operators before publication.",
    isBreaking: false,
    isFeatured: false,
    views: 0,
    shares: 0,
    language: "en",
    createdAt: "2025-02-10T12:00:00Z",
    updatedAt: "2025-02-11T09:20:00Z",
    seo: {
      metaTitle: "Orbital Debris Threat Reaches Critical Threshold in 2025",
      metaDescription: "Aerospace safety specialists warn of rising collision risks in low-Earth orbit.",
      keywords: ["Space Debris", "Satellites", "Orbital Safety"],
    },
  },
  // Multilingual articles: Bangla
  {
    id: "art-bn-01",
    title: "কৃত্রিম বুদ্ধিমত্তা পরিচালনায় বিশ্ব নেতাদের ঐতিহাসিক আন্তর্জাতিক চুক্তি",
    slug: "ai-governance-treaty-bangla",
    subtitle: "জেনেভায় ৬৮টি দেশের সম্মেলনে স্বাক্ষরিত হলো কৃত্রিম বুদ্ধিমত্তার নিরাপত্তা ও জবাবদিহিতা নীতিমালা।",
    excerpt: "আজ জেনেভায় অনুষ্ঠিত উচ্চপর্যায়ের সম্মেলনে বিশ্বের ৬৮টি দেশের প্রতিনিধিরা উন্নত কৃত্রিম বুদ্ধিমত্তা ব্যবস্থার বৈশ্বিক নীতিমালা ও সুরক্ষা ফ্রেমওয়ার্ক চূড়ান্ত করেছেন।",
    content: `<p>আন্তর্জাতিক কূটনীতিতে যুগান্তকারী মাইলফলক স্থাপন করে জেনেভায় আজ ৬৮টি দেশের অংশগ্রহণে কৃত্রিম বুদ্ধিমত্তা পরিচালন সংক্রান্ত আন্তর্জাতিক সনদ স্বাক্ষরিত হয়েছে।</p><p>এই চুক্তির আওতায় স্বাধীন অডিট ও ডিজিটাল জলছাপ বাধ্যতামূলক করার পাশাপাশি সাইবার নিরাপত্তা ঝুঁকি রোধে যৌথ টাস্কফোর্স গঠনের সিদ্ধান্ত হয়েছে।</p>`,
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    categoryId: "cat-world",
    categoryName: "আন্তর্জাতিক",
    tags: ["কৃত্রিম বুদ্ধিমত্তা", "কূটনীতি", "প্রযুক্তি"],
    authorId: "usr-01",
    authorName: "তানভীর আহমেদ",
    status: "published",
    isBreaking: true,
    isFeatured: true,
    views: 15400,
    shares: 1200,
    language: "bn",
    publishedAt: "2025-02-14T08:30:00Z",
    createdAt: "2025-02-14T06:15:00Z",
    updatedAt: "2025-02-14T08:30:00Z",
    seo: {
      metaTitle: "কৃত্রিম বুদ্ধিমত্তা নীতিমালায় আন্তর্জাতিক চুক্তি — মিডিয়াওএস",
      metaDescription: "জেনেভায় স্বাক্ষরিত হলো বৈশ্বিক এআই শাসন চুক্তি।",
      keywords: ["এআই চুক্তি", "আন্তর্জাতিক প্রযুক্তি"],
    },
  },
  // Multilingual articles: Arabic
  {
    id: "art-ar-01",
    title: "قادة العالم يوقعون اتفاقية جنيف التاريخية لتنظيم الذكاء الاصطناعي الفائق",
    slug: "ai-geneva-accord-arabic",
    subtitle: "ممثلو 68 دولة يقرون معايير إلزامية للأمان السيبراني والتحقق من الأنظمة الذكية المستقلة.",
    excerpt: "في ختام قمة دولية كبرى بجنيف، اعتمدت وفود 68 دولة ميثاقاً دولياً شاملاً يحدد المسؤوليات القانونية لتطوير ونشر نماذج الذكاء الاصطناعي المتقدمة.",
    content: `<p>في خطوة تاريخية حاسمة، أعلنت القمة العالمية للتقنية في جنيف اليوم عن توقيع ميثاق دولي ملزم ينظم حوكمة وتطوير الذكاء الاصطناعي الفائق بمشاركة ثمانٍ وستين دولة.</p><p>وتتضمن الاتفاقية إنشاء مجلس دولي مشترك للرقابة السريعة وتنسيق خطط الطوارئ الرقمية لحماية البنى التحتية الحيوية من المخاطر غير المتوقعة.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    categoryId: "cat-world",
    categoryName: "شؤون دولية",
    tags: ["الذكاء الاصطناعي", "جنيف", "التكنولوجيا"],
    authorId: "usr-03",
    authorName: "طارق المنصور",
    status: "published",
    isBreaking: true,
    isFeatured: true,
    views: 28400,
    shares: 2900,
    language: "ar",
    publishedAt: "2025-02-14T08:30:00Z",
    createdAt: "2025-02-14T06:15:00Z",
    updatedAt: "2025-02-14T08:30:00Z",
    seo: {
      metaTitle: "اتفاقية جنيف التاريخية للذكاء الاصطناعي — ميديا أو إس",
      metaDescription: "68 دولة تصادق على المعاهدة الدولية للذكاء الاصطناعي.",
      keywords: ["الذكاء الاصطناعي", "اتفاقية جنيف", "حوكمة التقنية"],
    },
  },
];

export const INITIAL_CATEGORIES = [
  {
    id: "cat-world",
    name: "World Affairs",
    slug: "world",
    description: "Geopolitics, international diplomacy, conflicts and global treaties.",
    order: 1,
    postCount: 142,
    subcategories: [
      { id: "sub-diplomacy", name: "Diplomacy", slug: "diplomacy" },
      { id: "sub-americas", name: "Americas", slug: "americas" },
      { id: "sub-europe", name: "Europe & Eurasia", slug: "europe" },
      { id: "sub-asia", name: "Asia-Pacific", slug: "asia" },
    ],
    language: "en" as const,
  },
  {
    id: "cat-tech",
    name: "Technology & AI",
    slug: "technology",
    description: "Frontier computing, AI breakthroughs, cybersecurity, and space exploration.",
    order: 2,
    postCount: 215,
    subcategories: [
      { id: "sub-ai", name: "Artificial Intelligence", slug: "ai" },
      { id: "sub-quantum", name: "Quantum Computing", slug: "quantum" },
      { id: "sub-cyber", name: "Cybersecurity", slug: "cybersecurity" },
      { id: "sub-hardware", name: "Semiconductors", slug: "semiconductors" },
    ],
    language: "en" as const,
  },
  {
    id: "cat-business",
    name: "Business & Economy",
    slug: "business",
    description: "Macroeconomics, central banks, capital markets, trade and industry.",
    order: 3,
    postCount: 189,
    subcategories: [
      { id: "sub-banking", name: "Banking & Finance", slug: "banking" },
      { id: "sub-markets", name: "Capital Markets", slug: "markets" },
      { id: "sub-trade", name: "Global Trade", slug: "trade" },
    ],
    language: "en" as const,
  },
  {
    id: "cat-climate",
    name: "Climate & Science",
    slug: "climate-science",
    description: "Earth observation, energy transition, ecology, and biological sciences.",
    order: 4,
    postCount: 128,
    subcategories: [
      { id: "sub-energy", name: "Clean Energy", slug: "energy" },
      { id: "sub-ecology", name: "Ecosystems", slug: "ecology" },
    ],
    language: "en" as const,
  },
  {
    id: "cat-investigation",
    name: "Investigative Desk",
    slug: "investigations",
    description: "Deep investigative reporting, documentary journalism, and freedom of information.",
    order: 5,
    postCount: 64,
    subcategories: [
      { id: "sub-gov", name: "Public Accountability", slug: "accountability" },
      { id: "sub-corp", name: "Corporate Conduct", slug: "corporate" },
    ],
    language: "en" as const,
  },
  {
    id: "cat-culture",
    name: "Culture & Opinion",
    slug: "culture-opinion",
    description: "Editorial essays, arts, literature, philosophical critiques, and reviews.",
    order: 6,
    postCount: 97,
    subcategories: [
      { id: "sub-essays", name: "Essays", slug: "essays" },
      { id: "sub-arts", name: "Arts & Cinema", slug: "arts" },
    ],
    language: "en" as const,
  },
];

class NewsService {
  private articles: NewsArticle[] = [...INITIAL_ARTICLES];

  async getArticles(params?: {
    status?: ArticleStatus;
    category?: string;
    search?: string;
    language?: string;
    isBreaking?: boolean;
    isFeatured?: boolean;
  }): Promise<NewsArticle[]> {
    let result = [...this.articles];
    if (params?.status) {
      result = result.filter((a) => a.status === params.status);
    }
    if (params?.category) {
      result = result.filter(
        (a) => a.categoryId === params.category || a.categoryName.toLowerCase().includes(params.category!.toLowerCase())
      );
    }
    if (params?.language) {
      result = result.filter((a) => a.language === params.language);
    }
    if (params?.isBreaking !== undefined) {
      result = result.filter((a) => a.isBreaking === params.isBreaking);
    }
    if (params?.isFeatured !== undefined) {
      result = result.filter((a) => a.isFeatured === params.isFeatured);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }

  async getArticleBySlug(slug: string): Promise<NewsArticle | null> {
    return this.articles.find((a) => a.slug === slug) || null;
  }

  async getArticleById(id: string): Promise<NewsArticle | null> {
    return this.articles.find((a) => a.id === id) || null;
  }

  async createArticle(data: Omit<NewsArticle, "id" | "createdAt" | "updatedAt" | "views" | "shares">): Promise<NewsArticle> {
    const newArticle: NewsArticle = {
      ...data,
      id: `art-${Date.now()}`,
      views: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.articles.unshift(newArticle);
    return newArticle;
  }

  async updateArticle(id: string, updates: Partial<NewsArticle>): Promise<NewsArticle> {
    const idx = this.articles.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error("Article not found");
    this.articles[idx] = {
      ...this.articles[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.articles[idx];
  }

  async updateStatus(id: string, status: ArticleStatus, rejectionFeedback?: string): Promise<NewsArticle> {
    return this.updateArticle(id, {
      status,
      rejectionFeedback: rejectionFeedback || undefined,
      publishedAt: status === "published" ? new Date().toISOString() : undefined,
    });
  }

  async deleteArticle(id: string): Promise<boolean> {
    const initialLength = this.articles.length;
    this.articles = this.articles.filter((a) => a.id !== id);
    return this.articles.length < initialLength;
  }
}

export const newsService = new NewsService();

