<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Seeder;

class SubCategorySeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->definitions() as $categorySlug => $subcategories) {
            $category = Category::where('slug', $categorySlug)->first();

            if (! $category) {
                continue;
            }

            foreach ($subcategories as $subcategory) {
                SubCategory::updateOrCreate(
                    ['slug' => $subcategory['slug']],
                    [
                        'category_id' => $category->id,
                        'name' => $subcategory['name'],
                        'description' => $subcategory['description'],
                    ]
                );
            }
        }
    }

    protected function definitions(): array
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
}
