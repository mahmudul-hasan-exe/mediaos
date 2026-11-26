import { AIToolType, AIProviderConfig } from "@/types";

export interface AIGenerationRequest {
  tool: AIToolType;
  topic?: string;
  sourceText?: string;
  targetLanguage?: "en" | "bn" | "ar";
  tone?: "journalistic" | "urgent" | "investigative" | "conversational" | "formal";
  length?: "short" | "medium" | "long";
  modelId?: string;
  provider?: "openai" | "gemini" | "anthropic" | "custom";
}

export interface AIGenerationResponse {
  result: string;
  headlineSuggestions?: string[];
  tokensUsed: number;
  model: string;
  processingTimeMs: number;
}

export const AI_PROVIDERS: AIProviderConfig[] = [
  {
    id: "prov-gemini",
    name: "Google Gemini Suite",
    provider: "gemini",
    status: "active",
    models: [
      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro (Editorial Long-form)", isDefault: true, costPer1kTokens: 0.00125 },
      { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash (Instant Speed)", costPer1kTokens: 0.000075 },
    ],
    totalTokensUsed: 3840000,
    estimatedCost: 3.84,
    rpmLimit: 1000,
  },
  {
    id: "prov-openai",
    name: "OpenAI Platform",
    provider: "openai",
    status: "active",
    models: [
      { id: "gpt-4o", name: "GPT-4o (Multimodal Omni)", costPer1kTokens: 0.005 },
      { id: "gpt-4o-mini", name: "GPT-4o Mini (Cost Optimized)", costPer1kTokens: 0.00015 },
    ],
    totalTokensUsed: 5210000,
    estimatedCost: 18.2,
    rpmLimit: 500,
  },
  {
    id: "prov-anthropic",
    name: "Anthropic Claude",
    provider: "anthropic",
    status: "active",
    models: [
      { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet (Nuanced Prose)", costPer1kTokens: 0.003 },
    ],
    totalTokensUsed: 1980000,
    estimatedCost: 5.94,
    rpmLimit: 300,
  },
];

class AIService {
  async generateContent(req: AIGenerationRequest): Promise<AIGenerationResponse> {
    // Simulated realistic response with slight latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const model = req.modelId || "gemini-1.5-pro";
    let result = "";
    let headlines: string[] | undefined;

    switch (req.tool) {
      case "article_writer":
        result = `<h2>${req.topic || "Frontier Analysis: The Evolving Geopolitical Landscape"}</h2>
<p>As technological transformation reshapes economic dependencies and sovereign security doctrines, modern institutions find themselves navigating unprecedented structural transitions.</p>
<p>Recent developments indicate that decentralized capabilities, coupled with automated verification architectures, are redefining traditional policy consensus across both emerging and established economies.</p>
<p>According to domain specialists and international observers, the primary challenge is no longer merely technological adoption, but rather establishing ethical and operational guardrails capable of withstanding rapid generational shifts.</p>
<p>Going forward, interdisciplinary frameworks prioritizing transparency and stakeholder equity will dictate whether these systemic inflection points foster enduring civic prosperity or exacerbate existing systemic divides.</p>`;
        headlines = [
          `Special Dispatch: How ${req.topic || "Modern Tech"} Is Restructuring Global Standards`,
          `Analysis: The Strategic Calculus Behind ${req.topic || "Current Events"}`,
          `Beyond the Headlines: The Architectural Shift Defining ${req.topic || "Tomorrow's Policies"}`,
        ];
        break;

      case "headline_generator":
        headlines = [
          `Exclusive: High-Stakes Summit Yields Pivotal Breakthrough on ${req.topic || "Key Policies"}`,
          `Inside the Numbers: Why ${req.topic || "The Recent Shift"} Is Catching Markets Off Guard`,
          `The Critical Junction: How Leaders Are Navigating ${req.topic || "Emerging Pressures"}`,
          `Investigation: Uncovering the Latent Realities Behind ${req.topic || "Industry Trends"}`,
          `Special Report: The Comprehensive Roadmap for ${req.topic || "Next-Generation Infrastructure"}`,
        ];
        result = headlines.join("\n\n");
        break;

      case "rewriter":
        result = `<p><strong>Revised Draft (${req.tone || "journalistic"} tone):</strong></p>
<p>Under revised scrutiny, the underlying fundamentals demonstrate that rapid deployment cycles must be tempered with rigorous stress-testing. Rather than rushing tentative conclusions, editorial teams recommend focusing on primary evidence and verified data channels.</p>`;
        break;

      case "summarizer":
        result = `<h3>Executive Key Takeaways:</h3>
<ul>
  <li><strong>Core Thesis:</strong> Structural realignment driven by technological convergence is accelerating across critical sectors.</li>
  <li><strong>Key Finding:</strong> Data verification protocols reduce informational volatility by up to 74% in trial deployments.</li>
  <li><strong>Future Outlook:</strong> Policy harmonization expected ahead of the upcoming international summit deadlines.</li>
</ul>`;
        break;

      case "translator":
        if (req.targetLanguage === "bn") {
          result = `<p><strong>বাংলা অনুবাদ:</strong></p>
<p>বিশ্বজুড়ে প্রযুক্তির রূপান্তর এবং নতুন অর্থনৈতিক নীতির সমন্বয় আন্তর্জাতিক পরিমণ্ডলে সুদূরপ্রসারী পরিবর্তনের সূচনা করেছে। বিশেষজ্ঞ মহলের মতে, সঠিক তথ্যের সত্যতা যাচাই ও স্বচ্ছতাই হবে ভবিষ্যৎ সাংবাদিকতার মূল চালিকাশক্তি।</p>`;
        } else if (req.targetLanguage === "ar") {
          result = `<p><strong>الترجمة العربية:</strong></p>
<p>يشهد المشهد العالمي تحولات جوهرية مدفوعة بالتطورات التقنية المتسارعة والسياسات الاقتصادية الحديثة. ويؤكد الخبراء أن التحقق الدقيق من مصادر المعلومات والشفافية المؤسسية يمثلان الركيزة الأساسية لمستقبل العمل الصحفي الموثوق.</p>`;
        } else {
          result = `<p><strong>English Translation:</strong></p>
<p>Global transformations driven by technological acceleration and modern economic frameworks are ushering in profound structural changes. Experts emphasize that rigorous source verification and institutional transparency remain the cornerstone of trusted journalism.</p>`;
        }
        break;

      case "grammar_checker":
        result = `<h3>Grammar & Readability Analysis:</h3>
<p>✓ <strong>Tone:</strong> Active voice (92% compliance)</p>
<p>✓ <strong>Readability:</strong> Flesch-Kincaid Grade 11.2 (Optimal for broadsheet journalism)</p>
<p>✓ <strong>Corrections Applied:</strong> Fixed 3 passive constructions and unified punctuation style.</p>`;
        break;

      case "seo_generator":
        result = `<h3>Optimized SEO Metadata:</h3>
<p><strong>SEO Title:</strong> ${req.topic || "Breaking News & In-Depth Analysis"} | MediaOS Publishing</p>
<p><strong>Meta Description:</strong> Comprehensive coverage and expert breakdown of ${req.topic || "current developments"}. Read the full verified dispatch on MediaOS.</p>
<p><strong>Focus Keywords:</strong> ${req.topic ? req.topic.split(" ").join(", ") : "News, Investigation, Analysis, MediaOS"}</p>
<p><strong>Suggested Slug:</strong> /${req.topic ? req.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "breaking-story-dispatch"}</p>`;
        break;

      case "social_caption":
        result = `<h3>Social Media Broadcast Packages:</h3>
<p><strong>X / Twitter:</strong><br />🚨 BREAKING: New developments emerge regarding ${req.topic || "global trends"}. What this means for policy and markets: [Link] #MediaOS #Journalism</p>
<p><strong>LinkedIn / Editorial Pulse:</strong><br />A deep dive into how institutional resilience is adapting to ${req.topic || "recent sector shifts"}. Read our senior desk analysis:</p>
<p><strong>Facebook / Public Feed:</strong><br />Discover the verified facts behind the latest announcements. Read the full investigation on our portal today.</p>`;
        break;

      case "image_prompt":
        result = `Editorial documentary photo, high-detail photojournalism, wide-angle cinematic shot of ${req.topic || "a bustling diplomatic summit in Geneva with delegates in discussion under soft natural lighting"}, Leica M11 style, natural color grading, hyper-realistic, 8k resolution, Pulitzer prize winning composition.`;
        break;
    }

    return {
      result,
      headlineSuggestions: headlines,
      tokensUsed: Math.floor(Math.random() * 400) + 180,
      model,
      processingTimeMs: 780,
    };
  }
}

export const aiService = new AIService();

