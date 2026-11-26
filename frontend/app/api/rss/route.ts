import { NextResponse } from "next/server";
import { INITIAL_ARTICLES } from "@/services/news-service";

export async function GET() {
  const published = INITIAL_ARTICLES.filter((a) => a.status === "published");

  const rssItems = published
    .map(
      (a) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>https://mediaos.io/news/${a.slug}</link>
      <guid isPermaLink="true">https://mediaos.io/news/${a.slug}</guid>
      <description><![CDATA[${a.excerpt}]]></description>
      <author>${a.authorName}</author>
      <category>${a.categoryName}</category>
      <pubDate>${new Date(a.publishedAt || a.createdAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MediaOS News Network — Verified Global Journalism</title>
    <link>https://mediaos.io</link>
    <description>One Platform. Every Publication.</description>
    <language>en-us</language>
    <atom:link href="https://mediaos.io/api/rss" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

