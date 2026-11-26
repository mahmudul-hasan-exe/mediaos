"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { newsService, INITIAL_CATEGORIES } from "@/services/news-service";
import { apiClient, ApiResponse } from "@/lib/api-client";
import { Category, NewsArticle } from "@/types";
import { NewsCard } from "@/components/newspaper/news-card";
import { AdBanner } from "@/components/newspaper/ad-banner";
import { Button } from "@/components/ui/button";
import { ArticleGridSkeleton } from "@/components/ui/skeleton";
import { RiArrowLeftSLine } from "@remixicon/react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [dynamicCategories, setDynamicCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  useEffect(() => {
    apiClient
      .get<ApiResponse<Category[]>>("/categories", {
        params: { tenant: "ten-01" },
      })
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setDynamicCategories(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const matchedParent = dynamicCategories.find((c) => c.slug === slug);
  const matchedSubParent = !matchedParent
    ? dynamicCategories.find((c) => c.subcategories?.some((s) => s.slug === slug))
    : undefined;
  const matchedSub = matchedSubParent?.subcategories?.find((s) => s.slug === slug);

  const humanizedSlug = (slug || "section")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const category: Category = matchedParent ||
    (matchedSub && matchedSubParent
      ? {
          ...matchedSubParent,
          name: matchedSub.name,
          slug: matchedSub.slug,
          description: `${matchedSub.name} coverage under ${matchedSubParent.name}.`,
        }
      : INITIAL_CATEGORIES.find((c) => c.slug === slug) || {
          id: slug,
          name: humanizedSlug,
          slug,
          description: `Latest verified reporting and analysis in ${humanizedSlug}.`,
          order: 99,
          postCount: 0,
          language: "en",
          subcategories: [],
        });

  useEffect(() => {
    newsService.getArticles({ category: category.name, status: "published" }).then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, [category.name]);

  const filteredArticles = articles.filter((a) => {
    if (selectedSubcategory === "all") return true;
    return a.subcategoryId === selectedSubcategory;
  });

  return (
    <div className="space-y-8">
      {/* Category BroadSheet Masthead */}
      <div className="border-b-2 border-zinc-900 dark:border-zinc-100 pb-5 space-y-2.5">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-blue-600 transition">
            Front Page
          </Link>
          <span>/</span>
          <span className="font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            Editorial Bureau
          </span>
        </div>

        <h1 className="font-serif font-black text-4xl sm:text-5xl text-zinc-950 dark:text-zinc-50 uppercase tracking-tight">
          {category.name}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-sans">
          {category.description}
        </p>

        {/* Subcategories Filter Pills */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-3">
            <button
              onClick={() => setSelectedSubcategory("all")}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition ${
                selectedSubcategory === "all"
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
              }`}
            >
              All {category.name}
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcategory(sub.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedSubcategory === sub.id
                    ? "bg-blue-700 text-white shadow-2xs"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ad Placement */}
      <AdBanner zone="header_leaderboard" />

      {/* Articles Magazine Grid */}
      {loading ? (
        <ArticleGridSkeleton count={6} />
      ) : filteredArticles.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 font-serif">
            No published stories in this section yet.
          </p>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <RiArrowLeftSLine className="h-4 w-4" />
              <span>Return to Front Page</span>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <NewsCard key={article.id} article={article} variant="vertical" />
          ))}
        </div>
      )}
    </div>
  );
}
