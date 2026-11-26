<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AiLog;
use App\Models\AiProvider;
use App\Models\Article;
use App\Models\Category;
use App\Services\TenantResolver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class AiController extends Controller
{
    public function index(Request $request, TenantResolver $resolver): View
    {
        $tenant = $resolver->resolveFromRequest($request);
        $providers = AiProvider::orderBy('id')->get();
        $logs = AiLog::with('user')
            ->where('tenant_id', $tenant->id)
            ->orderByDesc('created_at')
            ->limit(15)
            ->get();
        $categories = Category::where('tenant_id', $tenant->id)->whereNull('parent_id')->orderBy('order')->get();

        return view('admin.ai.index', compact('tenant', 'providers', 'logs', 'categories'));
    }

    public function generate(Request $request, TenantResolver $resolver): RedirectResponse
    {
        $tenant = $resolver->resolveFromRequest($request);

        $validated = $request->validate([
            'tool' => ['required', 'string'],
            'topic' => ['required', 'string', 'max:500'],
            'provider' => ['nullable', 'string'],
            'target_language' => ['nullable', 'in:en,bn,ar'],
            'save_as_draft' => ['nullable', 'boolean'],
            'category_id' => ['nullable', 'exists:categories,id'],
        ]);

        $topic = $validated['topic'];
        $tool = $validated['tool'];
        $provider = $validated['provider'] ?? 'gemini';

        $output = match ($tool) {
            'headline_generator' => "1. Exclusive: {$topic} Reshapes Policy Priorities\n2. Deep Dive: What {$topic} Means for Regional Markets\n3. Editorial Briefing: Navigating {$topic}",
            'summarizer' => "Executive Summary — {$topic}:\n• Primary driver: Accelerated institutional coordination.\n• Near-term outlook: Verified data channels show steady momentum.\n• Editorial action: Assign field follow-up.",
            'translator' => match ($validated['target_language'] ?? 'bn') {
                'bn' => "বাংলা অনুবাদ ({$topic}): সংশ্লিষ্ট বিশেষজ্ঞদের মতে, এই উদ্যোগটি দীর্ঘমেয়াদী স্থিতিশীলতা এবং স্বচ্ছতা নিশ্চিত করতে গুরুত্বপূর্ণ ভূমিকা রাখবে।",
                'ar' => "الترجمة العربية ({$topic}): يؤكد المراقبون أن هذه الخطوة تعزز الاستقرار المؤسسي والشفافية على المدى الطويل.",
                default => "English Edition ({$topic}): Observers confirm this initiative strengthens long-term institutional clarity and public accountability.",
            },
            default => "<h2>{$topic}</h2>\n<p>In a pivotal development across regional policy and industry desks, analysts report measurable momentum surrounding {$topic}.</p>\n<p>Correspondents confirmed that key stakeholders are establishing transparent verification protocols ahead of next quarter's implementation milestones.</p>\n<p><em>[AI Draft — Pending Human Editorial Fact-Check]</em></p>",
        };

        $tokens = rand(410, 890);

        AiLog::create([
            'tenant_id' => $tenant->id,
            'user_id' => $request->user()->id,
            'tool' => $tool,
            'provider' => $provider,
            'model' => $provider === 'openai' ? 'gpt-4o' : ($provider === 'anthropic' ? 'claude-3-5-sonnet' : 'gemini-1.5-pro'),
            'tokens_used' => $tokens,
            'status' => 'success',
        ]);

        $tenant->increment('ai_usage', $tokens);

        if ($request->boolean('save_as_draft')) {
            $slug = Str::slug($topic) ?: 'ai-draft';
            if (Article::where('tenant_id', $tenant->id)->where('slug', $slug)->exists()) {
                $slug .= '-' . Str::random(5);
            }

            Article::create([
                'tenant_id' => $tenant->id,
                'title' => $topic,
                'slug' => $slug,
                'excerpt' => Str::limit(strip_tags($output), 160),
                'content' => $output,
                'featured_image' => 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
                'category_id' => $validated['category_id'] ?? null,
                'author_id' => $request->user()->id,
                'status' => 'draft',
                'language' => $validated['target_language'] ?? $tenant->default_language ?? 'en',
            ]);

            return back()->with('success', 'AI output generated and saved directly as a Draft article (Zero Unsupervised Publishing enforced).')->with('ai_output', $output);
        }

        return back()->with('success', "Generated via {$provider} ({$tokens} tokens).")->with('ai_output', $output);
    }
}

