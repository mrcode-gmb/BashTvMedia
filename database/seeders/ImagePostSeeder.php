<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\SubCategory;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ImagePostSeeder extends Seeder
{
    public function run(): void
    {
        $author = $this->resolveAuthor();
        $categories = $this->seedCategories();
        $subcategories = $this->seedSubCategories($categories);

        foreach ($this->stories() as $story) {
            $publishedAt = Carbon::parse($story['published_at']);
            $slug = Str::slug($story['title']);
            $subcategoryKey = $story['category'] . ':' . $story['subcategory'];

            $post = Post::firstOrNew(['slug' => $slug]);

            $post->title = $story['title'];
            $post->slug = $slug;
            $post->excerpt = $story['excerpt'];
            $post->content = $story['content'];
            $post->meta_title = $story['meta_title'] ?? $story['title'];
            $post->meta_description = $story['meta_description'] ?? $story['excerpt'];
            $post->image = $story['image'] ?? $this->fallbackImageUrl();
            $post->video_url = $story['video_url'] ?? null;
            $post->status = $story['status'] ?? 'published';
            $post->category_id = $categories[$story['category']]->id;
            $post->subcategory_id = $subcategories[$subcategoryKey]->id ?? null;
            $post->author_id = $author->id;
            $post->published_at = $publishedAt;
            $post->credit = $story['credit'] ?? 'BASHTV MEDIA Desk';
            $post->views = $story['views'] ?? 0;
            $post->public_id = $post->public_id ?: Post::generatePublicId();

            if (! $post->exists) {
                $post->created_at = $publishedAt;
            }

            $post->updated_at = now();
            $post->save();
        }
    }

    protected function resolveAuthor(): User
    {
        return User::query()->where('role', 'admin')->first()
            ?? User::query()->where('role', 'editor')->first()
            ?? User::firstOrCreate(
                ['email' => 'newsroom@bashtvmedia.test'],
                [
                    'name' => 'BASHTV Newsroom',
                    'password' => bcrypt('password'),
                    'role' => 'admin',
                ]
            );
    }

    protected function seedCategories(): array
    {
        $categories = [];

        foreach ($this->categoryDefinitions() as $category) {
            $categories[$category['slug']] = Category::updateOrCreate(
                ['slug' => $category['slug']],
                [
                    'name' => $category['name'],
                    'priority' => $category['priority'],
                ]
            );
        }

        return $categories;
    }

    protected function seedSubCategories(array $categories): array
    {
        $subcategories = [];

        foreach ($this->subCategoryDefinitions() as $categorySlug => $items) {
            $category = $categories[$categorySlug] ?? null;

            if (! $category) {
                continue;
            }

            foreach ($items as $item) {
                $subcategories[$categorySlug . ':' . $item['slug']] = SubCategory::updateOrCreate(
                    ['slug' => $item['slug']],
                    [
                        'category_id' => $category->id,
                        'name' => $item['name'],
                        'description' => $item['description'],
                    ]
                );
            }
        }

        return $subcategories;
    }

    protected function categoryDefinitions(): array
    {
        return [
            ['name' => 'Headlines', 'slug' => 'headlines', 'priority' => '1'],
            ['name' => 'Hausa News', 'slug' => 'hausa-news', 'priority' => '2'],
            ['name' => 'Politics', 'slug' => 'politics', 'priority' => '3'],
            ['name' => 'Reports', 'slug' => 'reports', 'priority' => '4'],
            ['name' => 'Interviews', 'slug' => 'interviews', 'priority' => '5'],
            ['name' => 'Explainers', 'slug' => 'explainers', 'priority' => '6'],
            ['name' => 'Community Watch', 'slug' => 'community-watch', 'priority' => '7'],
            ['name' => 'Business', 'slug' => 'business', 'priority' => '8'],
            ['name' => 'World', 'slug' => 'world', 'priority' => '9'],
            ['name' => 'Media Watch', 'slug' => 'media-watch', 'priority' => '10'],
        ];
    }

    protected function subCategoryDefinitions(): array
    {
        return [
            'headlines' => [
                [
                    'name' => 'Top Stories',
                    'slug' => 'top-stories',
                    'description' => 'The biggest BASHTV headlines positioned for the front page.',
                ],
                [
                    'name' => 'Breaking Flow',
                    'slug' => 'breaking-flow',
                    'description' => 'Fast-moving newsroom updates and urgent developments.',
                ],
                [
                    'name' => 'Daily Brief',
                    'slug' => 'daily-brief',
                    'description' => 'A concise round-up for readers who want the essentials quickly.',
                ],
            ],
            'hausa-news' => [
                [
                    'name' => 'Northern Affairs',
                    'slug' => 'northern-affairs',
                    'description' => 'Coverage centered on northern communities and issues.',
                ],
                [
                    'name' => 'Community Voices',
                    'slug' => 'community-voices',
                    'description' => 'Grassroots perspectives shaped for a Hausa-speaking audience.',
                ],
                [
                    'name' => 'Hausa Bulletin',
                    'slug' => 'hausa-bulletin',
                    'description' => 'Short-format Hausa-first news updates and recap stories.',
                ],
            ],
            'politics' => [
                [
                    'name' => 'Abuja Watch',
                    'slug' => 'abuja-watch',
                    'description' => 'National politics and institutional coverage from the capital.',
                ],
                [
                    'name' => 'Statehouse Monitor',
                    'slug' => 'statehouse-monitor',
                    'description' => 'State-level leadership, policy, and government developments.',
                ],
                [
                    'name' => 'Election Tracker',
                    'slug' => 'election-tracker',
                    'description' => 'Campaigns, public debates, and election-related reporting.',
                ],
            ],
            'reports' => [
                [
                    'name' => 'Field Reports',
                    'slug' => 'field-reports',
                    'description' => 'Ground-level reporting and location-based coverage.',
                ],
                [
                    'name' => 'Video Bulletins',
                    'slug' => 'video-bulletins',
                    'description' => 'Video-led story packages and visual news summaries.',
                ],
                [
                    'name' => 'Newsroom Packages',
                    'slug' => 'newsroom-packages',
                    'description' => 'Assembled story bundles combining clips, voice, and reporting.',
                ],
            ],
            'interviews' => [
                [
                    'name' => 'Studio Conversations',
                    'slug' => 'studio-conversations',
                    'description' => 'Longer interviews and thoughtful discussions in studio format.',
                ],
                [
                    'name' => 'Guest Voices',
                    'slug' => 'guest-voices',
                    'description' => 'Outside voices, experts, and public figures in conversation.',
                ],
                [
                    'name' => 'Editorial Q&A',
                    'slug' => 'editorial-qa',
                    'description' => 'Question-and-answer formats built around clarity and context.',
                ],
            ],
            'explainers' => [
                [
                    'name' => 'Policy Breakdown',
                    'slug' => 'policy-breakdown',
                    'description' => 'Simplified coverage of policy decisions and what they mean.',
                ],
                [
                    'name' => 'Fact File',
                    'slug' => 'fact-file',
                    'description' => 'Quick-reference pieces built around verified context.',
                ],
                [
                    'name' => 'Issue Context',
                    'slug' => 'issue-context',
                    'description' => 'Background stories that help readers follow complex news.',
                ],
            ],
            'community-watch' => [
                [
                    'name' => 'Education Watch',
                    'slug' => 'education-watch',
                    'description' => 'Schools, learning access, and education-focused public issues.',
                ],
                [
                    'name' => 'Health Watch',
                    'slug' => 'health-watch',
                    'description' => 'Health access, public care, and local wellbeing reporting.',
                ],
                [
                    'name' => 'Public Interest',
                    'slug' => 'public-interest',
                    'description' => 'Stories built around everyday impact and civic relevance.',
                ],
            ],
            'business' => [
                [
                    'name' => 'Market Watch',
                    'slug' => 'market-watch',
                    'description' => 'Prices, trade, and economy-facing market developments.',
                ],
                [
                    'name' => 'Cost of Living',
                    'slug' => 'cost-of-living',
                    'description' => 'Coverage connected to household spending and everyday budgets.',
                ],
                [
                    'name' => 'Enterprise Desk',
                    'slug' => 'enterprise-desk',
                    'description' => 'Small business, entrepreneurship, and local commerce stories.',
                ],
            ],
            'world' => [
                [
                    'name' => 'Regional Update',
                    'slug' => 'regional-update',
                    'description' => 'Developments from across Africa and the wider region.',
                ],
                [
                    'name' => 'Diaspora Watch',
                    'slug' => 'diaspora-watch',
                    'description' => 'Stories relevant to Hausa-speaking audiences abroad.',
                ],
                [
                    'name' => 'Global Brief',
                    'slug' => 'global-brief',
                    'description' => 'Fast summaries of international developments that matter locally.',
                ],
            ],
            'media-watch' => [
                [
                    'name' => 'YouTube Desk',
                    'slug' => 'youtube-desk',
                    'description' => 'Stories shaped around the BASHTV video presence and channel strategy.',
                ],
                [
                    'name' => 'Facebook Desk',
                    'slug' => 'facebook-desk',
                    'description' => 'Community touchpoints and discussion flow built around Facebook.',
                ],
                [
                    'name' => 'Social Pulse',
                    'slug' => 'social-pulse',
                    'description' => 'Short-form audience behavior and cross-platform distribution stories.',
                ],
            ],
        ];
    }

    protected function stories(): array
    {
        return [
            [
                'title' => 'BASHTV headlines desk blends urgency, readability, and premium presentation',
                'excerpt' => 'The homepage lead for BASHTV MEDIA should feel fast, video-aware, and clear enough for readers who want the story in one scan.',
                'content' => '<p>BASHTV MEDIA works best when the front page feels immediate without becoming noisy. A strong headlines desk should bring the top story forward quickly, keep supporting stories easy to scan, and still leave room for media-driven coverage near the top of the page.</p><p>For a Hausa media audience, readability matters as much as urgency. The seeded BASHTV headline mix should therefore feel short, direct, and useful, with enough context to move a reader from the homepage into the full article without friction.</p><p>This sample story gives the headlines category a realistic anchor post that matches the more premium BASHTV redesign already in the project.</p>',
                'category' => 'headlines',
                'subcategory' => 'top-stories',
                'published_at' => now()->subDays(1)->setTime(8, 15),
                'image' => $this->youtubeThumbnailUrl('saH42hrYcek'),
                'video_url' => $this->youtubeWatchUrl('saH42hrYcek'),
                'views' => 1420,
            ],
            [
                'title' => 'Hausa news coverage stays close to northern communities and daily impact',
                'excerpt' => 'BASHTV MEDIA can stand out by keeping Hausa-first reporting tied to local relevance, everyday language, and community trust.',
                'content' => '<p>The strongest BASHTV Hausa stories should feel near to the audience, not distant from them. That means choosing angles that reflect daily concerns, community voices, and the local meaning of bigger national developments.</p><p>A Hausa news desk becomes stronger when it avoids empty noise and instead breaks issues into direct, understandable reporting. Clear language, grounded context, and consistent follow-up all help the newsroom feel dependable.</p><p>This seeded story gives the Hausa News category a practical foundation for category pages, homepage blocks, and related story rails.</p>',
                'category' => 'hausa-news',
                'subcategory' => 'northern-affairs',
                'published_at' => now()->subDays(2)->setTime(9, 0),
                'image' => $this->youtubeThumbnailUrl('xxIsZyPWB3E'),
                'video_url' => $this->youtubeWatchUrl('xxIsZyPWB3E'),
                'views' => 1185,
            ],
            [
                'title' => 'BASHTV politics desk prepares clearer Abuja and statehouse coverage',
                'excerpt' => 'Political reporting on BASHTV MEDIA should turn public affairs into understandable stories, not just long statements and speeches.',
                'content' => '<p>Politics coverage becomes more useful when it tells readers what changed, who is affected, and why the development matters now. BASHTV MEDIA can make this desk stronger by focusing on public value instead of simply reproducing official language.</p><p>That approach works especially well for readers following Abuja decisions from outside the capital. The reporting rhythm should connect federal policy, statehouse movements, and citizen-level impact without losing clarity.</p><p>This sample politics post gives the seeded platform a grounded public-affairs story that fits the BASHTV tone.</p>',
                'category' => 'politics',
                'subcategory' => 'abuja-watch',
                'published_at' => now()->subDays(3)->setTime(7, 40),
                'image' => $this->youtubeThumbnailUrl('Hjj2PLzp3tA'),
                'video_url' => $this->youtubeWatchUrl('Hjj2PLzp3tA'),
                'views' => 1325,
            ],
            [
                'title' => 'BASHTV sharpens its daily Hausa video bulletin around the YouTube desk',
                'excerpt' => 'The public BASHTV YouTube presence gives the platform a strong video-first identity that should be reflected in seeded newsroom content.',
                'content' => '<p>BASHTV MEDIA already signals a video-led direction through its public <a href="https://www.youtube.com/channel/UCy8ZkVmZ-iPcS8YlQ7A8_3Q" target="_blank" rel="noopener noreferrer">YouTube channel</a>. That makes the reports desk a natural place for daily bulletins, quick packages, and field-led story presentation.</p><p>On the website, seeded report stories should read like pieces that can sit beside video clips rather than as plain text articles disconnected from the media brand. The rhythm is simple: a sharp intro, clear context, and enough structure for a reader who arrived from social platforms to stay engaged.</p><p>This story is designed to give the BASHTV reports category a believable starting point anchored in the channel presence you shared.</p>',
                'category' => 'reports',
                'subcategory' => 'video-bulletins',
                'published_at' => now()->subDays(4)->setTime(18, 10),
                'image' => $this->youtubeThumbnailUrl('OT83upamUMg'),
                'video_url' => $this->youtubeWatchUrl('OT83upamUMg'),
                'views' => 1730,
            ],
            [
                'title' => 'BASHTV interview desk is built for calmer, deeper Hausa conversations',
                'excerpt' => 'Interview stories on BASHTV MEDIA should feel like direct, respectful conversations that add texture to the news cycle.',
                'content' => '<p>One of the clearest ways for BASHTV MEDIA to feel distinct is to treat interviews as more than a simple transcript or a clip. A good interview page should carry the voice of the guest, the editorial aim of the conversation, and the wider issue that made the discussion worth publishing.</p><p>That is especially important for Hausa-speaking audiences who want depth, not only speed. Questions should be structured, answers should be readable, and the article should still work even for readers who did not watch the original discussion.</p><p>This seeded piece gives the interviews category a usable example for studio-style coverage.</p>',
                'category' => 'interviews',
                'subcategory' => 'studio-conversations',
                'published_at' => now()->subDays(5)->setTime(20, 0),
                'image' => $this->youtubeThumbnailUrl('qS-xN0zUQYc'),
                'video_url' => $this->youtubeWatchUrl('qS-xN0zUQYc'),
                'views' => 980,
            ],
            [
                'title' => 'Explainer pieces turn policy shifts into simpler Hausa-first reporting',
                'excerpt' => 'BASHTV explainers should help readers move from confusion to understanding in a few clean sections.',
                'content' => '<p>Explainers are one of the most valuable content formats for a modern newsroom. Instead of assuming the audience already understands a policy issue, BASHTV MEDIA can use this desk to slow the story down and make the details more accessible.</p><p>That means breaking large developments into a clear set of questions: what happened, who is affected, what comes next, and why the change matters now. The result is useful journalism that feels deliberate rather than rushed.</p><p>This sample story gives the explainer desk a seeded article with the right tone for follow-up coverage and related links.</p>',
                'category' => 'explainers',
                'subcategory' => 'policy-breakdown',
                'published_at' => now()->subDays(6)->setTime(11, 35),
                'image' => $this->youtubeThumbnailUrl('ZwmiSeZ1nN4'),
                'video_url' => $this->youtubeWatchUrl('ZwmiSeZ1nN4'),
                'views' => 845,
            ],
            [
                'title' => 'Community watch stories keep education and public-interest issues visible',
                'excerpt' => 'The BASHTV community desk should make room for school access, healthcare concerns, and daily public-interest reporting.',
                'content' => '<p>Not every important story starts in the capital or on a major political stage. A strong BASHTV community desk should keep attention on education, health, and everyday services that shape how people actually live.</p><p>Those stories often build trust more effectively than louder headlines because they show that the newsroom understands ordinary concerns. They also give the platform a consistent public-interest identity that can stand beside its faster video work.</p><p>This seeded article helps the Community Watch category feel grounded from the first dataset.</p>',
                'category' => 'community-watch',
                'subcategory' => 'education-watch',
                'published_at' => now()->subDays(7)->setTime(13, 20),
                'image' => $this->youtubeThumbnailUrl('1X3zj_rBIYs'),
                'views' => 765,
            ],
            [
                'title' => 'Business desk focuses on cost of living, trade, and small enterprise voices',
                'excerpt' => 'BASHTV business coverage should stay practical by following price pressure, local trade, and the people building small businesses.',
                'content' => '<p>A business desk becomes more useful when it follows the economy from the audience outward. BASHTV MEDIA can make this category stronger by treating prices, local trade, and enterprise stories as daily-life reporting instead of only elite market commentary.</p><p>That makes room for cost-of-living coverage, transport price changes, small business struggles, and local commercial adaptation. Readers should leave with a clearer picture of what economic shifts mean beyond the headline figure.</p><p>This seeded post gives the business category a practical BASHTV-style starting point.</p>',
                'category' => 'business',
                'subcategory' => 'cost-of-living',
                'published_at' => now()->subDays(8)->setTime(10, 5),
                'image' => $this->youtubeThumbnailUrl('fdHKnMu2v5s'),
                'video_url' => $this->youtubeWatchUrl('fdHKnMu2v5s'),
                'views' => 690,
            ],
            [
                'title' => 'World desk packages regional and diaspora updates for Hausa audiences',
                'excerpt' => 'International coverage on BASHTV MEDIA should stay useful by connecting regional events and diaspora developments back to audience relevance.',
                'content' => '<p>World coverage only works when it gives readers a reason to care. For BASHTV MEDIA, that means packaging regional developments, diaspora stories, and global shifts in a way that still feels connected to Hausa-speaking audiences at home and abroad.</p><p>The goal is not to cover everything. It is to choose the stories with the clearest social, political, or economic relevance and explain them with the same clarity expected from the local desks.</p><p>This sample world story helps round out the seeded platform with a broader editorial horizon.</p>',
                'category' => 'world',
                'subcategory' => 'diaspora-watch',
                'published_at' => now()->subDays(9)->setTime(15, 50),
                'image' => $this->youtubeThumbnailUrl('Wk6LM7mBfhY'),
                'video_url' => $this->youtubeWatchUrl('Wk6LM7mBfhY'),
                'views' => 610,
            ],
            [
                'title' => 'Facebook, TikTok, and Linktree help BASHTV keep audience movement simple',
                'excerpt' => 'The BASHTV public footprint already spans YouTube, Facebook, TikTok, and Linktree, giving the brand a strong multi-platform starting point.',
                'content' => '<p>BASHTV MEDIA is not showing up in only one place. The public footprint visible through the <a href="https://linktr.ee/BASHTVHAUSA" target="_blank" rel="noopener noreferrer">BASHTV Linktree hub</a>, the <a href="https://www.facebook.com/bashtvhausa?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">Facebook page</a>, the <a href="https://www.tiktok.com/@bashtvhausa" target="_blank" rel="noopener noreferrer">TikTok account</a>, and the official <a href="https://www.youtube.com/channel/UCy8ZkVmZ-iPcS8YlQ7A8_3Q" target="_blank" rel="noopener noreferrer">YouTube channel</a> suggests an audience journey built around discovery, fast reaction, and repeat visits.</p><p>That cross-platform behavior should shape how the seeded stories feel on the website. Articles should read like pieces that can be discovered from social posts, clipped into short summaries, and still hold up when opened as full stories on the BASHTV site.</p><p>This sample Media Watch story gives the project one seeded post that clearly reflects the public handles you asked me to review.</p>',
                'category' => 'media-watch',
                'subcategory' => 'social-pulse',
                'published_at' => now()->subDays(10)->setTime(17, 30),
                'image' => $this->youtubeThumbnailUrl('_W232S4RPS0'),
                'video_url' => $this->youtubeWatchUrl('_W232S4RPS0'),
                'views' => 1575,
            ],
        ];
    }

    protected function youtubeWatchUrl(string $videoId): string
    {
        return 'https://www.youtube.com/watch?v=' . $videoId;
    }

    protected function youtubeThumbnailUrl(string $videoId): string
    {
        return 'https://i.ytimg.com/vi/' . $videoId . '/hqdefault.jpg';
    }

    protected function fallbackImageUrl(): string
    {
        return $this->youtubeThumbnailUrl('saH42hrYcek');
    }
}
