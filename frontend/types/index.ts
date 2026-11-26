export type UserRole =
  | "super-admin"
  | "newspaper-owner"
  | "admin"
  | "editor-in-chief"
  | "editor"
  | "reporter"
  | "author"
  | "moderator"
  | "reader";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  tenantId?: string;
  tenantName?: string;
  designation?: string;
  bio?: string;
  phone?: string;
  status: "active" | "inactive" | "suspended";
  authProvider?: "email" | "google";
  emailVerifiedAt?: string | null;
  isEmailVerified?: boolean;
  articlesCount?: number;
  createdAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain: string;
  logo: string;
  favicon?: string;
  primaryColor: string;
  supportedLanguages: ("en" | "bn" | "ar")[];
  defaultLanguage: "en" | "bn" | "ar";
  plan: "Starter" | "Professional" | "Enterprise";
  status: "active" | "suspended" | "pending";
  aiLimit: number; // in tokens
  aiUsage: number;
  contactEmail: string;
  ownerName: string;
  createdAt: string;
  websiteConfig: {
    siteTitle: string;
    tagline: string;
    breakingNewsEnabled: boolean;
    ePaperEnabled: boolean;
    commentsModeration: boolean;
    advertisementsEnabled: boolean;
    facebookUrl?: string;
    twitterUrl?: string;
    youtubeUrl?: string;
  };
}

export type ArticleStatus =
  | "draft"
  | "pending"
  | "approved"
  | "scheduled"
  | "published"
  | "rejected"
  | "archived";

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  imageCaption?: string;
  gallery?: string[];
  videoUrl?: string;
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  subcategoryName?: string;
  tags: string[];
  authorId: string;
  authorName: string;
  reporterId?: string;
  reporterName?: string;
  status: ArticleStatus;
  rejectionFeedback?: string;
  isBreaking: boolean;
  isFeatured: boolean;
  isEditorPick?: boolean;
  views: number;
  shares: number;
  language: "en" | "bn" | "ar";
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  order: number;
  subcategories: {
    id: string;
    name: string;
    slug: string;
  }[];
  postCount: number;
  language: "en" | "bn" | "ar";
}

export interface MediaItem {
  id: string;
  title: string;
  fileName: string;
  url: string;
  fileType: "image" | "video" | "document" | "audio";
  fileSize: string;
  dimensions?: string;
  folder: string;
  uploadedBy: string;
  createdAt: string;
}

export interface CommentItem {
  id: string;
  articleId: string;
  articleTitle: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: "approved" | "pending" | "spam" | "trash";
  likes: number;
  createdAt: string;
}

export interface Advertisement {
  id: string;
  title: string;
  zone: "header_leaderboard" | "sidebar_square" | "in_article" | "sticky_footer" | "homepage_middle";
  clientName: string;
  imageUrl: string;
  destinationUrl: string;
  startDate: string;
  endDate: string;
  status: "active" | "scheduled" | "expired" | "paused";
  impressions: number;
  clicks: number;
}

export interface EPaperPage {
  pageNumber: number;
  imageUrl: string;
  thumbnailUrl: string;
  hotspots?: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    articleTitle: string;
    articleExcerpt: string;
  }[];
}

export interface EPaperEdition {
  id: string;
  title: string;
  editionDate: string;
  coverImage: string;
  totalPages: number;
  pages: EPaperPage[];
  status: "published" | "draft";
  downloadUrl?: string;
}

export interface AIProviderConfig {
  id: string;
  name: string;
  provider: "openai" | "gemini" | "anthropic" | "custom";
  status: "active" | "inactive";
  baseUrl?: string;
  models: {
    id: string;
    name: string;
    isDefault?: boolean;
    costPer1kTokens: number;
  }[];
  totalTokensUsed: number;
  estimatedCost: number;
  rpmLimit: number;
}

export type AIToolType =
  | "article_writer"
  | "headline_generator"
  | "rewriter"
  | "summarizer"
  | "translator"
  | "grammar_checker"
  | "seo_generator"
  | "social_caption"
  | "image_prompt";

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  maxNewsletters: number;
  maxArticlesMonthly: number;
  aiTokensMonthly: number;
  customDomainIncluded: boolean;
  ePaperIncluded: boolean;
  adManagerIncluded: boolean;
  prioritySupport: boolean;
  activeSubscribers: number;
}

