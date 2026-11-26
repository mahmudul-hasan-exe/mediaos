"use client";

import React, { useState } from "react";
import { DataTable, Column } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Check, X, ShieldAlert, Trash2 } from "lucide-react";
import { mediaosToast } from "@/stores/mediaos-toast-store";

interface CommentRecord {
  id: string;
  articleTitle: string;
  author: string;
  email: string;
  content: string;
  status: "pending" | "approved" | "spam";
  createdAt: string;
}

const INITIAL_COMMENTS: CommentRecord[] = [
  {
    id: "com-01",
    articleTitle: "Global Leaders Reach Historic Accord on Autonomous AI Governance",
    author: "Prof. Robert Thorne",
    email: "r.thorne@oxford.ac.uk",
    content: "Crucial treaty. The real test will be whether sovereign cryptographic verification standards can withstand rapid LLM clustering developments.",
    status: "pending",
    createdAt: "10 mins ago",
  },
  {
    id: "com-02",
    articleTitle: "Quantum Chip Architecture Breaks 10,000 Logical Qubit Threshold",
    author: "Elena Rostova",
    email: "elena@quantumfund.vc",
    content: "If the room-temperature coherence holds in independent reproduction trials, this alters the timeline for computational drug synthesis by a full generation.",
    status: "pending",
    createdAt: "35 mins ago",
  },
  {
    id: "com-03",
    articleTitle: "Central Banks Accelerate Interoperable Digital Currency Trials",
    author: "CryptoTrader99",
    email: "spambot@promocrypto.xyz",
    content: "EARN 500% DAILY RETURNS CLICK HERE http://bit.ly/scam-link-fast-money",
    status: "spam",
    createdAt: "1 hour ago",
  },
  {
    id: "com-04",
    articleTitle: "Renewable Microgrids Shield Coastal Metropolises",
    author: "Julian Vance",
    email: "julian.vance@urbanplan.org",
    content: "Municipal resilience projects like these pay for themselves in one winter storm season alone.",
    status: "approved",
    createdAt: "2 hours ago",
  },
];

export default function CommentsModerationPage() {
  const [comments, setComments] = useState(INITIAL_COMMENTS);

  const updateStatus = (id: string, newStatus: "pending" | "approved" | "spam") => {
    setComments(comments.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
    if (newStatus === "approved") mediaosToast.success("Comment approved and published.");
    if (newStatus === "spam") mediaosToast.warning("Comment moved to spam moderation.");
  };

  const deleteComment = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
    mediaosToast.success("Comment deleted successfully.");
  };

  const columns: Column<CommentRecord>[] = [
    {
      key: "author",
      header: "Reader & Comment Content",
      render: (c) => (
        <div className="space-y-1 max-w-md">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{c.author}</span>
            <span className="text-[10px] text-zinc-400 font-mono">({c.email})</span>
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 italic font-serif">"{c.content}"</p>
          <div className="text-[10px] text-blue-600 dark:text-blue-400 truncate">
            Story: {c.articleTitle}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Moderation State",
      render: (c) => {
        let variant: "default" | "secondary" | "destructive" | "warning" | "success" = "secondary";
        if (c.status === "approved") variant = "success";
        if (c.status === "pending") variant = "warning";
        if (c.status === "spam") variant = "destructive";
        return <Badge variant={variant}>{c.status}</Badge>;
      },
    },
    {
      key: "createdAt",
      header: "Received",
      render: (c) => <span className="text-zinc-400 text-xs">{c.createdAt}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (c) => (
        <div className="flex items-center gap-1.5 justify-end">
          {c.status !== "approved" && (
            <Button
              size="sm"
              onClick={() => updateStatus(c.id, "approved")}
              className="h-7 text-xs flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700"
            >
              <Check className="h-3 w-3" />
              <span>Approve</span>
            </Button>
          )}
          {c.status !== "spam" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateStatus(c.id, "spam")}
              className="h-7 text-xs flex items-center gap-1 text-amber-600"
            >
              <ShieldAlert className="h-3 w-3" />
              <span>Spam</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteComment(c.id)}
            className="h-7 text-xs text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Community Comments Moderation
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Maintain high journalistic discourse standards by moderating reader discussions and filtering automated spam.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setComments(comments.map((c) => ({ ...c, status: "approved" })));
              mediaosToast.success("All pending comments approved successfully.");
            }}
          >
            Approve All Pending
          </Button>
        </div>
      </div>

      <DataTable
        data={comments}
        columns={columns}
        searchKey="content"
        searchPlaceholder="Filter reader comments..."
      />
    </div>
  );
}

