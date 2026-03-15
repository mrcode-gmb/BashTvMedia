<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class FooterPageController extends Controller
{
    public function show(string $slug): Response
    {
        $page = $this->resolvePage($slug);

        abort_unless($page, 404);

        $posts = $this->loadPosts($page);
        $videoPosts = $page['show_video_section']
            ? $this->loadVideoPosts($page, $posts->pluck('id')->all())
            : collect();

        return Inertia::render('FooterPages/Show', [
            'page' => $page,
            'posts' => $posts->values(),
            'videoPosts' => $videoPosts->values(),
            'categories' => $this->navigationCategories(),
        ]);
    }

    public function contact(): Response
    {
        return $this->show('contact');
    }

    protected function resolvePage(string $slug): ?array
    {
        $pages = [
            'headlines' => [
                'slug' => 'headlines',
                'title' => 'Headlines',
                'eyebrow' => 'Coverage Desk',
                'description' => 'A sharper BASHTV front page for the biggest stories, fastest updates, and the reports readers should see first.',
                'summary' => 'Stay close to the stories shaping the conversation right now.',
                'theme' => 'coverage',
                'focus_points' => ['Top stories', 'Breaking flow', 'Reader essentials'],
                'cta_label' => 'Browse Categories',
                'cta_href' => '/categories',
                'secondary_cta_label' => 'Back to Homepage',
                'secondary_cta_href' => '/',
                'query_terms' => [],
                'post_limit' => 9,
                'show_video_section' => true,
            ],
            'politics' => [
                'slug' => 'politics',
                'title' => 'Politics',
                'eyebrow' => 'Public Affairs Desk',
                'description' => 'Political reporting, policy developments, leadership stories, and public affairs coverage presented in BASHTV’s cleaner editorial format.',
                'summary' => 'Tracking institutions, elections, leadership, and the decisions shaping everyday life.',
                'theme' => 'coverage',
                'focus_points' => ['Government', 'Policy watch', 'Public affairs'],
                'cta_label' => 'See More Coverage',
                'cta_href' => '/categories',
                'secondary_cta_label' => 'Latest Headlines',
                'secondary_cta_href' => '/desk/headlines',
                'query_terms' => ['politics', 'government', 'election', 'policy', 'senate', 'president'],
                'post_limit' => 8,
                'show_video_section' => false,
            ],
            'world' => [
                'slug' => 'world',
                'title' => 'World',
                'eyebrow' => 'International Desk',
                'description' => 'Global developments, international stories, and world affairs coverage curated for the BASHTV audience.',
                'summary' => 'The wider world, distilled for fast reading and stronger newsroom presentation.',
                'theme' => 'coverage',
                'focus_points' => ['Global affairs', 'International updates', 'Context-first reporting'],
                'cta_label' => 'Browse Categories',
                'cta_href' => '/categories',
                'secondary_cta_label' => 'Latest Headlines',
                'secondary_cta_href' => '/desk/headlines',
                'query_terms' => ['world', 'international', 'global', 'foreign', 'abroad'],
                'post_limit' => 8,
                'show_video_section' => false,
            ],
            'business' => [
                'slug' => 'business',
                'title' => 'Business',
                'eyebrow' => 'Economy Desk',
                'description' => 'Business reporting, markets, economy stories, and practical coverage built for a broad BASHTV audience.',
                'summary' => 'Follow commerce, trade, growth, and money stories without losing editorial clarity.',
                'theme' => 'coverage',
                'focus_points' => ['Economy', 'Trade', 'Market watch'],
                'cta_label' => 'Browse Categories',
                'cta_href' => '/categories',
                'secondary_cta_label' => 'Latest Headlines',
                'secondary_cta_href' => '/desk/headlines',
                'query_terms' => ['business', 'economy', 'market', 'trade', 'finance'],
                'post_limit' => 8,
                'show_video_section' => false,
            ],
            'reports' => [
                'slug' => 'reports',
                'title' => 'Reports',
                'eyebrow' => 'Video Desk',
                'description' => 'Field reports, newsroom packages, and visual story coverage shaped into a clearer BASHTV video-led presentation.',
                'summary' => 'Watch and read through the reporting desk, all in one place.',
                'theme' => 'video',
                'focus_points' => ['Field reporting', 'Video stories', 'News packages'],
                'cta_label' => 'Open YouTube Channel',
                'cta_href' => 'https://www.youtube.com/channel/UCy8ZkVmZ-iPcS8YlQ7A8_3Q',
                'cta_external' => true,
                'secondary_cta_label' => 'Latest Headlines',
                'secondary_cta_href' => '/desk/headlines',
                'query_terms' => ['report', 'reports', 'bulletin', 'coverage'],
                'post_limit' => 8,
                'show_video_section' => true,
            ],
            'interviews' => [
                'slug' => 'interviews',
                'title' => 'Interviews',
                'eyebrow' => 'Conversation Desk',
                'description' => 'Interviews, conversations, and voice-led journalism presented as a stronger BASHTV media destination.',
                'summary' => 'Voices, perspectives, and direct conversations that add depth to the news cycle.',
                'theme' => 'video',
                'focus_points' => ['Guest voices', 'Deep conversations', 'Context and reaction'],
                'cta_label' => 'Open YouTube Channel',
                'cta_href' => 'https://www.youtube.com/channel/UCy8ZkVmZ-iPcS8YlQ7A8_3Q',
                'cta_external' => true,
                'secondary_cta_label' => 'Latest Headlines',
                'secondary_cta_href' => '/desk/headlines',
                'query_terms' => ['interview', 'interviews', 'conversation', 'guest'],
                'post_limit' => 8,
                'show_video_section' => true,
            ],
            'explainers' => [
                'slug' => 'explainers',
                'title' => 'Explainers',
                'eyebrow' => 'Analysis Desk',
                'description' => 'Clear, useful, and reader-friendly BASHTV explainers for stories that need extra context.',
                'summary' => 'For readers who want more than a headline and need the story broken down well.',
                'theme' => 'video',
                'focus_points' => ['Context', 'Background', 'What it means'],
                'cta_label' => 'Browse Categories',
                'cta_href' => '/categories',
                'secondary_cta_label' => 'Open Video Desk',
                'secondary_cta_href' => '/desk/reports',
                'query_terms' => ['explainer', 'explainers', 'analysis', 'guide'],
                'post_limit' => 8,
                'show_video_section' => true,
            ],
            'special-features' => [
                'slug' => 'special-features',
                'title' => 'Special Features',
                'eyebrow' => 'Features Desk',
                'description' => 'BASHTV feature stories, standout packages, and deeper editorial pieces designed with a more premium reading flow.',
                'summary' => 'Longer, richer stories that deserve a calmer presentation and stronger visual framing.',
                'theme' => 'video',
                'focus_points' => ['Feature stories', 'Long-form pieces', 'Special editorial packages'],
                'cta_label' => 'Browse Categories',
                'cta_href' => '/categories',
                'secondary_cta_label' => 'Latest Headlines',
                'secondary_cta_href' => '/desk/headlines',
                'query_terms' => ['feature', 'features', 'special', 'spotlight'],
                'post_limit' => 8,
                'show_video_section' => true,
            ],
            'hausa-news' => [
                'slug' => 'hausa-news',
                'title' => 'Hausa News',
                'eyebrow' => 'Audience Desk',
                'description' => 'A BASHTV destination shaped specifically around Hausa-language news needs, audience relevance, and everyday readability.',
                'summary' => 'Fast, accessible coverage designed for a Hausa media audience.',
                'theme' => 'audience',
                'focus_points' => ['Hausa audience', 'Accessible reading', 'Community-first updates'],
                'cta_label' => 'Latest Headlines',
                'cta_href' => '/desk/headlines',
                'secondary_cta_label' => 'Open YouTube Channel',
                'secondary_cta_href' => 'https://www.youtube.com/channel/UCy8ZkVmZ-iPcS8YlQ7A8_3Q',
                'secondary_cta_external' => true,
                'query_terms' => ['hausa', 'nigeria', 'news'],
                'post_limit' => 8,
                'show_video_section' => true,
            ],
            'breaking-stories' => [
                'slug' => 'breaking-stories',
                'title' => 'Breaking Stories',
                'eyebrow' => 'Live Updates',
                'description' => 'The BASHTV stream for urgent developments, fast-moving updates, and the latest changes readers need to follow immediately.',
                'summary' => 'A cleaner place to follow rapid newsroom updates as they happen.',
                'theme' => 'audience',
                'focus_points' => ['Urgent updates', 'Fast reads', 'Top developments'],
                'cta_label' => 'Latest Headlines',
                'cta_href' => '/desk/headlines',
                'secondary_cta_label' => 'Browse Categories',
                'secondary_cta_href' => '/categories',
                'query_terms' => ['breaking', 'urgent', 'latest'],
                'post_limit' => 8,
                'show_video_section' => true,
            ],
            'community-watch' => [
                'slug' => 'community-watch',
                'title' => 'Community Watch',
                'eyebrow' => 'Community Desk',
                'description' => 'Stories, social concerns, and grassroots angles that keep BASHTV connected to everyday community experience.',
                'summary' => 'A space for local relevance, public-interest stories, and audience-near coverage.',
                'theme' => 'audience',
                'focus_points' => ['Grassroots issues', 'Public-interest coverage', 'Local impact'],
                'cta_label' => 'Contact The Newsroom',
                'cta_href' => '/contact-us',
                'secondary_cta_label' => 'Latest Headlines',
                'secondary_cta_href' => '/desk/headlines',
                'query_terms' => ['community', 'local', 'public', 'watch'],
                'post_limit' => 8,
                'show_video_section' => false,
            ],
            'contact' => [
                'slug' => 'contact',
                'title' => 'Contact Us',
                'eyebrow' => 'BASHTV Contact',
                'description' => 'Reach BASHTV MEDIA for editorial inquiries, story tips, partnerships, and general communication with the newsroom.',
                'summary' => 'Choose the fastest path to reach the team behind the newsroom.',
                'theme' => 'contact',
                'focus_points' => ['Editorial inquiries', 'Story tips', 'Partnerships'],
                'cta_label' => 'Email The Newsroom',
                'cta_href' => 'mailto:news@bashtvmedia.com',
                'cta_external' => true,
                'secondary_cta_label' => 'Open YouTube Channel',
                'secondary_cta_href' => 'https://www.youtube.com/channel/UCy8ZkVmZ-iPcS8YlQ7A8_3Q',
                'secondary_cta_external' => true,
                'query_terms' => [],
                'post_limit' => 6,
                'show_video_section' => false,
                'contact_options' => [
                    [
                        'title' => 'Editorial Inquiries',
                        'value' => 'news@bashtvmedia.com',
                        'description' => 'For newsroom questions, correction requests, and official communication.',
                        'href' => 'mailto:news@bashtvmedia.com',
                        'external' => true,
                    ],
                    [
                        'title' => 'Story Tips',
                        'value' => 'Send a Tip',
                        'description' => 'Share leads, community developments, or urgent information with the BASHTV team.',
                        'href' => 'mailto:news@bashtvmedia.com?subject=Story%20Tip',
                        'external' => true,
                    ],
                    [
                        'title' => 'Partnerships',
                        'value' => 'Media & Brand Outreach',
                        'description' => 'Discuss interviews, partnerships, sponsorships, or collaboration opportunities.',
                        'href' => 'mailto:news@bashtvmedia.com?subject=Partnership%20Inquiry',
                        'external' => true,
                    ],
                    [
                        'title' => 'YouTube Desk',
                        'value' => '@bashtvhausa',
                        'description' => 'Follow the BASHTV channel for video-first reporting and audience updates.',
                        'href' => 'https://www.youtube.com/channel/UCy8ZkVmZ-iPcS8YlQ7A8_3Q',
                        'external' => true,
                    ],
                ],
            ],
        ];

        return $pages[$slug] ?? null;
    }

    protected function loadPosts(array $page)
    {
        $query = $this->basePostQuery();

        if (!empty($page['query_terms'])) {
            $this->applySearchTerms($query, $page['query_terms']);
        }

        $posts = $query
            ->latest('published_at')
            ->limit($page['post_limit'] ?? 8)
            ->get();

        if ($posts->isEmpty() && !empty($page['query_terms'])) {
            $posts = $this->basePostQuery()
                ->latest('published_at')
                ->limit($page['post_limit'] ?? 8)
                ->get();
        }

        return $this->transformPosts($posts);
    }

    protected function loadVideoPosts(array $page, array $excludeIds = [])
    {
        $query = $this->basePostQuery()->whereNotNull('video_url');

        if (!empty($excludeIds)) {
            $query->whereNotIn('id', $excludeIds);
        }

        if (!empty($page['query_terms'])) {
            $this->applySearchTerms($query, $page['query_terms']);
        }

        $posts = $query->latest('published_at')->limit(3)->get();

        if ($posts->isEmpty()) {
            $fallbackQuery = $this->basePostQuery()
                ->whereNotNull('video_url');

            if (!empty($excludeIds)) {
                $fallbackQuery->whereNotIn('id', $excludeIds);
            }

            $posts = $fallbackQuery->latest('published_at')->limit(3)->get();
        }

        return $this->transformPosts($posts);
    }

    protected function applySearchTerms($query, array $terms): void
    {
        $query->where(function ($builder) use ($terms) {
            foreach ($terms as $term) {
                $builder->orWhere('title', 'like', "%{$term}%")
                    ->orWhere('excerpt', 'like', "%{$term}%")
                    ->orWhere('content', 'like', "%{$term}%");
            }
        });
    }

    protected function basePostQuery()
    {
        return Post::select([
            'id',
            'uuid',
            'title',
            'slug',
            'image',
            'video_url',
            'public_id',
            'excerpt',
            'category_id',
            'author_id',
            'published_at',
            'views',
        ])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->with([
                'category:id,name,slug',
                'author:id,name',
            ]);
    }

    protected function transformPosts($posts)
    {
        return $posts->map(function ($post) {
            $post->image = $post->image ? asset($post->image) : null;

            return $post;
        });
    }

    protected function navigationCategories()
    {
        return Category::select('id', 'name', 'slug')
            ->with(['subcategories' => function ($query) {
                $query->select('id', 'category_id', 'name', 'slug')
                    ->withCount('posts')
                    ->orderBy('name');
            }])
            ->withCount('posts')
            ->orderBy('priority', 'asc')
            ->get();
    }
}
