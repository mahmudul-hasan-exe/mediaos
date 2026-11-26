"use client";

import React, { useEffect, useState } from "react";
import { newsService } from "@/services/news-service";
import { NewsArticle } from "@/types";
import { BreakingTicker } from "@/components/newspaper/breaking-ticker";
import { AdBanner } from "@/components/newspaper/ad-banner";
import { PortalHeroSection } from "@/components/newspaper/portal-hero-section";
import {
  PortalCategorySection,
  CategoryArticle,
} from "@/components/newspaper/portal-category-section";
import { FiveColumnNewsGrid } from "@/components/newspaper/five-column-news-grid";
import { LatestVideosSection } from "@/components/newspaper/latest-videos-section";
import { MultiCategoryGrid } from "@/components/newspaper/multi-category-grid";
import { ShortsSection } from "@/components/newspaper/shorts-section";
import { PhotoStoriesSection } from "@/components/newspaper/photo-stories-section";
import { PodcastBannerSection } from "@/components/newspaper/podcast-banner-section";
import { HeroNewsSkeleton } from "@/components/ui/skeleton";
import { useTenantStore } from "@/stores/tenant-store";

// ==========================================
// UNIFIED PORTAL DATA (MATCHING SCREENSHOTS)
// ==========================================

const NATIONAL_STORIES: CategoryArticle[] = [
  {
    id: "nat-1",
    category: "National",
    subcategory: "Dhaka city",
    title: "Schedule announced for the capital's new metro line",
    excerpt:
      "Services on the new metro line will begin in phases to ease commuter congestion across the central business district.",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    slug: "schedule-announced-for-capital-new-metro-line",
    author: "Rafiqul Islam",
    time: "4 d ago",
    readingTime: "1 min read",
    hasVideo: false,
  },
  {
    id: "nat-2",
    category: "National",
    subcategory: "Dhaka city",
    title: "Video: Morning gridlock leaves the city crawling as commuters sit for hours",
    excerpt:
      "Long queues of vehicles build up on main roads at rush hour as traffic police test real-time lane diversion protocols.",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    slug: "video-morning-gridlock-leaves-city-crawling",
    author: "Video Desk",
    time: "4 d ago",
    readingTime: "1 min read",
    hasVideo: true,
  },
  {
    id: "nat-3",
    category: "National",
    subcategory: "Countrywide",
    title: "Flood situation improves, relief efforts ordered stepped up",
    excerpt:
      "Although water is receding in low-lying areas, authorities have ordered round-the-clock medical supplies and emergency rations.",
    image:
      "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80",
    slug: "flood-situation-improves-relief-efforts-stepped-up",
    author: "Sabiha Khatun",
    time: "4 d ago",
    readingTime: "1 min read",
    hasVideo: false,
  },
];

const POLITICS_STORIES: CategoryArticle[] = [
  {
    id: "pol-1",
    category: "Politics",
    subcategory: "Parliament",
    title: "Video: Election night in the newsroom as the results come in",
    excerpt:
      "Reporters and editors work through counting night; our cameras capture the intense moments inside the national election desk.",
    image:
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop&q=80",
    slug: "video-election-night-newsroom-results",
    author: "Video Desk",
    time: "4 d ago",
    readingTime: "1 min read",
    hasVideo: true,
  },
  {
    id: "pol-2",
    category: "Politics",
    subcategory: "Parliament",
    title: "Budget session opens in parliament as opposition walks out",
    excerpt:
      "On the very first day, opposition members left the chamber in protest over fiscal deficit allocations and public debt governance.",
    image:
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
    slug: "budget-session-opens-parliament-walkout",
    author: "Arif Mahmud",
    time: "4 d ago",
    readingTime: "1 min read",
    hasVideo: false,
  },
  {
    id: "pol-3",
    category: "Politics",
    subcategory: "All",
    title: "All-party meeting on the local government election roadmap",
    excerpt:
      "The main political parties are to sit down to discuss when and by what legal mechanisms the municipal commission will execute voting.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    slug: "all-party-meeting-local-government-election-roadmap",
    author: "Nusrat Jahan",
    time: "4 d ago",
    readingTime: "1 min read",
    hasVideo: false,
  },
];

const ECONOMY_STORIES: CategoryArticle[] = [
  {
    id: "eco-1",
    category: "Economy",
    subcategory: "Banking & Forex",
    title: "Video: Remittance inflow surges to $2.4 billion, highest in 18 months",
    excerpt:
      "Expatriate workers channel record funds through official banking channels following recent exchange rate incentives and fee waivers.",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80",
    slug: "video-remittance-inflow-surges-record-high",
    author: "Economics Bureau",
    time: "2 d ago",
    readingTime: "2 min read",
    hasVideo: true,
  },
  {
    id: "eco-2",
    category: "Economy",
    subcategory: "Banking & Forex",
    title: "Central bank raises policy rate by 50 basis points to curb headline inflation",
    excerpt:
      "The monetary policy committee signaled tight liquidity conditions through the next fiscal quarter to stabilize foreign exchange reserves.",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
    slug: "central-bank-raises-policy-rate-inflation",
    author: "Tanvir Ahmed",
    time: "3 d ago",
    readingTime: "1 min read",
    hasVideo: false,
  },
  {
    id: "eco-3",
    category: "Economy",
    subcategory: "Trade",
    title: "Export earnings cross quarterly target led by diversified manufacturing",
    excerpt:
      "Shipments to European and Asian markets expand 8.4% as automated customs clearances cut port cargo turnaround times.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    slug: "export-earnings-cross-quarterly-target",
    author: "Mahmudul Hasan",
    time: "4 d ago",
    readingTime: "1 min read",
    hasVideo: false,
  },
];

const SPORTS_STORIES: CategoryArticle[] = [
  {
    id: "spo-1",
    category: "Sports",
    subcategory: "Cricket",
    title: "Video: Highlights of thriller finish as national team seals dramatic series win",
    excerpt:
      "Needing 14 runs off the final over, the lower order held their nerve in front of 25,000 roaring home fans under the floodlights.",
    image:
      "https://images.unsplash.com/photo-1531415074868-036b107e7742?w=800&auto=format&fit=crop&q=80",
    slug: "video-highlights-cricket-thriller-finish-series-win",
    author: "Sports Desk",
    time: "1 d ago",
    readingTime: "2 min read",
    hasVideo: true,
  },
  {
    id: "spo-2",
    category: "Sports",
    subcategory: "Football",
    title: "Premier League title race intensifies as top three teams separated by two points",
    excerpt:
      "Dramatic weekend fixtures see defending champions drop points while challengers cruise to commanding clean-sheet victories.",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
    slug: "premier-league-title-race-intensifies-top-three",
    author: "Kabir Hossain",
    time: "2 d ago",
    readingTime: "1 min read",
    hasVideo: false,
  },
  {
    id: "spo-3",
    category: "Sports",
    subcategory: "Football",
    title: "Rising teenage sensation qualifies for continental tournament with stunning brace",
    excerpt:
      "The 18-year-old forward scored twice in the second half to secure historic qualification for the upcoming regional championship.",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
    slug: "rising-teenage-sensation-qualifies-tournament",
    author: "Shakil Anwar",
    time: "3 d ago",
    readingTime: "1 min read",
    hasVideo: false,
  },
];

export default function PublicHomePage() {
  const { currentTenant } = useTenantStore();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsService.getArticles({ status: "published" }).then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-10">
      {/* 1. Live Breaking News Dispatch Bar */}
      {currentTenant.websiteConfig.breakingNewsEnabled && (
        <div className="-mx-4 -mt-6 sm:-mt-8 mb-4">
          <BreakingTicker articles={articles} />
        </div>
      )}

      {/* 2. Leaderboard Advertisement Banner (If Enabled) */}
      {currentTenant.websiteConfig.advertisementsEnabled && (
        <AdBanner zone="header_leaderboard" />
      )}

      {/* 3. Hero / Lead Stories Section (Lead Story + 2 Sub-Leads + Latest Widget) */}
      {loading ? (
        <HeroNewsSkeleton />
      ) : (
        <PortalHeroSection articles={articles} />
      )}

      {/* 4. Desk 01: National (Split Lead + Side Stacks) */}
      <PortalCategorySection
        title="National"
        categorySlug="national"
        deskNumber="01"
        accentColor="blue"
        tabs={["All", "Dhaka city", "Countrywide"]}
        articles={NATIONAL_STORIES}
        layout="split"
      />

      {/* 5. Desk 02: Politics (3-Column Broadsheet Grid) */}
      <PortalCategorySection
        title="Politics"
        categorySlug="politics"
        deskNumber="02"
        accentColor="red"
        tabs={["All", "Parliament"]}
        articles={POLITICS_STORIES}
        layout="grid"
      />

      {/* 6. Desk 03: Economy & Markets (3-Column Broadsheet Grid) */}
      <PortalCategorySection
        title="Economy"
        categorySlug="business"
        deskNumber="03"
        accentColor="emerald"
        tabs={["All", "Banking & Forex", "Trade"]}
        articles={ECONOMY_STORIES}
        layout="grid"
      />

      {/* 7. Desk 04: Sports (5-Column Broadsheet Grid matching user image) */}
      <FiveColumnNewsGrid
        title="Sports"
        categorySlug="sports"
        deskNumber="04"
        tabs={["All", "Cricket", "Football", "F1 & Arena"]}
      />

      {/* 8. Desk 05: Latest Videos (Cinematic Studio Grid) */}
      <LatestVideosSection />

      {/* 9. Desk 06: Global & Specialized Desks Matrix (8 Categories) */}
      <MultiCategoryGrid />

      {/* 10. Desk 07: Shorts & Stories (Vertical 9:16 Mobile Reels) */}
      <ShortsSection />

      {/* 11. Desk 08: Visual Journalism & Photo Stories (Exhibition Gallery) */}
      <PhotoStoriesSection />

      {/* 12. Desk 09: Audio Briefings & Podcasts (Studio Broadcast) */}
      <PodcastBannerSection />
    </div>
  );
}
