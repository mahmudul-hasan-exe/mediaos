import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 font-serif">
      <h1 className="text-3xl font-black text-zinc-950 dark:text-zinc-50 font-serif">
        Privacy & Data Protection Policy
      </h1>
      <p className="text-xs text-zinc-400 font-sans">Effective Date: January 1, 2025</p>

      <div className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-sans">
        <p>
          At <strong>MediaOS</strong>, reader privacy and data sovereignty are paramount. We do not sell reader telemetry, browsing histories, or private subscriber records to third-party data brokers.
        </p>

        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-serif">
          1. Information We Collect
        </h3>
        <p>
          We collect standard anonymous server logs (IP address, browser type, referral URLs) to prevent automated DDoS attacks and monitor regional cache efficiency. When you subscribe to our morning dispatch newsletter, your email address is encrypted and used exclusively for verified dispatches.
        </p>

        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-serif">
          2. Data Protection & Security Isolation
        </h3>
        <p>
          Each independent newspaper operates on dedicated secure database boundaries. Subscriber credentials and payment tokens are managed through PCI-DSS Level 1 compliant processors and are never commingled.
        </p>

        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-serif">
          3. Artificial Intelligence Disclosures
        </h3>
        <p>
          Reader commentary and browsing habits are never used to train foundation models. All AI writing assistance features operate via authenticated backend proxy wrappers with zero data retention agreements.
        </p>
      </div>
    </div>
  );
}

