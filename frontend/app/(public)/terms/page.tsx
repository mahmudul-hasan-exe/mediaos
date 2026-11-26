import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-black text-zinc-950 dark:text-zinc-50 font-serif">
        Terms of Service & Editorial Syndication
      </h1>
      <p className="text-xs text-zinc-400 font-sans">Effective Date: January 1, 2025</p>

      <div className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-sans">
        <p>
          Welcome to the <strong>MediaOS</strong> multi-tenant publishing platform. By accessing any publication operating under this network, you agree to comply with our conditions of use and intellectual property terms.
        </p>

        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-serif">
          1. Intellectual Property & Copyright
        </h3>
        <p>
          All journalistic text, photojournalism imagery, audio transmissions, and video documentaries published across this network are proprietary creations protected under international copyright conventions. Automated scraping or commercial redistribution without licensing agreements is strictly prohibited.
        </p>

        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-serif">
          2. Reader Comments & Discussion Rules
        </h3>
        <p>
          Comments must remain civil, constructive, and free of defamatory statements, hate speech, or commercial solicitations. Editorial staff reserve absolute discretion to moderate, edit, or delete non-compliant comments.
        </p>
      </div>
    </div>
  );
}

