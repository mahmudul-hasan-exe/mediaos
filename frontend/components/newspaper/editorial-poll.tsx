"use client";

import React, { useState } from "react";
import {
  RiCheckLine,
  RiUserVoiceLine,
} from "@remixicon/react";

interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export function EditorialPoll() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [options, setOptions] = useState<PollOption[]>([
    {
      id: "opt-1",
      label: "Yes, statutory safety checks must supersede raw compute acceleration.",
      votes: 3418,
    },
    {
      id: "opt-2",
      label: "No, overly restrictive sovereign mandates will stifle open research.",
      votes: 1240,
    },
    {
      id: "opt-3",
      label: "Only for systems interfacing with defense, health, and national power grids.",
      votes: 1824,
    },
  ]);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = () => {
    if (!selectedOption || hasVoted) return;
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );
    setHasVoted(true);
  };

  return (
    <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 shadow-2xs">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-4">
        <div className="flex items-center gap-2">
          <RiUserVoiceLine className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="news-kicker text-zinc-900 dark:text-zinc-100">
            Daily Reader Opinion Poll
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400">
          {totalVotes.toLocaleString()} votes
        </span>
      </div>

      <h4 className="font-serif font-bold text-sm sm:text-base text-zinc-950 dark:text-zinc-50 leading-snug mb-3">
        &ldquo;Should sovereign nations enforce mandatory criminal liability on autonomous AI inference clusters?&rdquo;
      </h4>

      {!hasVoted ? (
        <div className="space-y-2.5">
          {options.map((opt) => (
            <label
              key={opt.id}
              onClick={() => setSelectedOption(opt.id)}
              className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs cursor-pointer transition select-none ${
                selectedOption === opt.id
                  ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-semibold"
                  : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              <input
                type="radio"
                name="daily_poll"
                checked={selectedOption === opt.id}
                onChange={() => setSelectedOption(opt.id)}
                className="mt-0.5 accent-blue-600"
              />
              <span className="leading-snug">{opt.label}</span>
            </label>
          ))}

          <button
            onClick={handleVote}
            disabled={!selectedOption}
            className="w-full mt-3 py-2 px-4 rounded-lg bg-zinc-900 hover:bg-blue-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-blue-400 dark:hover:text-white text-white text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
          >
            Submit Your Vote
          </button>
        </div>
      ) : (
        <div className="space-y-3 animate-in fade-in duration-300">
          {options.map((opt) => {
            const percentage = Math.round((opt.votes / totalVotes) * 100);
            const isUserChoice = opt.id === selectedOption;
            return (
              <div key={opt.id} className="space-y-1 text-xs">
                <div className="flex items-center justify-between font-medium">
                  <span
                    className={`leading-snug ${
                      isUserChoice
                        ? "font-bold text-blue-600 dark:text-blue-400"
                        : "text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {opt.label} {isUserChoice && "(Your vote)"}
                  </span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 shrink-0 ml-2">
                    {percentage}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isUserChoice ? "bg-blue-600" : "bg-zinc-400 dark:bg-zinc-600"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}

          <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <RiCheckLine className="h-3.5 w-3.5" /> Vote Counted
            </span>
            <span>Audited by MediaOS Poll Engine</span>
          </div>
        </div>
      )}
    </div>
  );
}

