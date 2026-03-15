<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    protected $newsItems = [
        [
            'title' => 'Pantami Advocates Stronger Cybersecurity Framework for Nigeria',
            'excerpt' => 'Professor Isa Pantami has called for stronger cybersecurity policies to protect Nigeria\'s digital infrastructure.',
            'content' => '<p>Professor Isa Ali Ibrahim Pantami has emphasized the urgent need for Nigeria to strengthen its cybersecurity framework as digital adoption increases across sectors.</p><p>He noted that investment in skills development, cyber awareness, and regulatory enforcement is critical to safeguarding national digital assets.</p>',
            'category' => 'technology',
            'status' => 'published',
            'published_at' => '2025-12-09',
            'image' => 'images/Gombe-State-Medical-equipment-Handover.png',
        ],
        [
            'title' => 'Pantami Foundation Sponsors ICT Training for Northern Youths',
            'excerpt' => 'The Pantami Foundation has sponsored ICT training programs aimed at empowering youths with digital skills.',
            'content' => '<p>The Professor Isa Pantami Foundation has launched an ICT capacity-building program targeting youths across Northern Nigeria.</p><p>The initiative focuses on software development, networking, and digital entrepreneurship to improve employability.</p>',
            'category' => 'education',
            'status' => 'published',
            'published_at' => '2025-12-08',
            'image' => 'images/Gombe-State-Medical-equipment-Handover.png',
        ],
        [
            'title' => 'Pantami Calls for Ethical Use of Artificial Intelligence in Africa',
            'excerpt' => 'Pantami has stressed the importance of ethical considerations in the deployment of AI technologies.',
            'content' => '<p>Professor Pantami has urged policymakers and developers to prioritize ethics and accountability in artificial intelligence systems.</p><p>He warned that unchecked AI deployment could widen inequality and pose security risks.</p>',
            'category' => 'technology',
            'status' => 'published',
            'published_at' => '2025-12-07',
            'image' => 'images/DR--010.jpg',
        ],
        [
            'title' => 'Pantami Commends Nigerian Startups Driving Digital Innovation',
            'excerpt' => 'Former minister Pantami has praised Nigerian startups for advancing innovation in fintech and agritech.',
            'content' => '<p>Professor Isa Pantami has commended Nigerian startups for their resilience and innovation in addressing local challenges through technology.</p><p>He encouraged government and private investors to continue supporting the startup ecosystem.</p>',
            'category' => 'innovation',
            'status' => 'published',
            'published_at' => '2025-12-06',
            'image' => 'images/Dr.-Isa-Ali-Ibrahim-Pantami.jpg',
        ],
        [
            'title' => 'Pantami Urges Students to Embrace Digital Skills for Future Careers',
            'excerpt' => 'Pantami has advised Nigerian students to prioritize digital skills to remain competitive globally.',
            'content' => '<p>Addressing students at a leadership forum, Professor Pantami encouraged young Nigerians to acquire in-demand digital skills.</p><p>He highlighted cybersecurity, data science, and AI as key areas for future employment.</p>',
            'category' => 'education',
            'status' => 'published',
            'published_at' => '2025-12-05',
            'image' => 'images/Gombe-State-Medical-equipment-Handover.png',
        ],
        [
            'title' => 'Pantami Speaks on Digital Economy Growth in Nigeria',
            'excerpt' => 'Pantami has reflected on Nigeria\'s digital economy growth during a policy dialogue.',
            'content' => '<p>Professor Isa Pantami has stated that Nigeria\'s digital economy has shown significant growth over recent years.</p><p>He attributed the progress to broadband expansion, digital inclusion, and policy reforms.</p>',
            'category' => 'politics',
            'status' => 'published',
            'published_at' => '2025-12-04',
            'image' => 'images/IMG-20250913-WA0085.jpg',
        ],
        [
            'title' => 'Pantami Encourages Collaboration Between Universities and Industry',
            'excerpt' => 'Pantami has called for closer collaboration between Nigerian universities and the private sector.',
            'content' => '<p>Professor Pantami has emphasized the need for Nigerian universities to partner with industry players.</p><p>He said such collaboration would improve research relevance and graduate employability.</p>',
            'category' => 'education',
            'status' => 'published',
            'published_at' => '2025-12-03',
            'image' => 'images/Pantami-001.jpg',
        ],
        [
            'title' => 'Pantami Warns Against Spread of Fake News Online',
            'excerpt' => 'Pantami has warned against the dangers of misinformation and fake news on digital platforms.',
            'content' => '<p>Professor Isa Pantami has cautioned social media users against spreading unverified information.</p><p>He stressed that misinformation poses risks to national unity and public trust.</p>',
            'category' => 'society',
            'status' => 'published',
            'published_at' => '2025-12-02',
            'image' => 'images/download.jpeg',
        ],
        [
            'title' => 'Pantami Supports Youth Participation in Technology Policy',
            'excerpt' => 'Pantami has encouraged youth involvement in technology policy discussions.',
            'content' => '<p>Professor Pantami has called on young professionals to actively engage in technology and digital policy formulation.</p><p>He noted that youth perspectives are critical for sustainable innovation.</p>',
            'category' => 'technology',
            'status' => 'published',
            'published_at' => '2025-12-01',
            'image' => 'images/Dr.-Isa-Ali-Ibrahim-Pantami.jpg',
        ],
        [
            'title' => 'Pantami Launches Digital Literacy Initiative for Rural Communities',
            'excerpt' => 'Pantami has initiated a digital literacy program to bridge the digital divide in rural areas.',
            'content' => '<p>Professor Isa Pantami has launched a nationwide digital literacy initiative targeting rural communities.</p><p>The program aims to provide basic computer skills and internet literacy to underserved populations, enabling them to participate in the digital economy.</p>',
            'category' => 'education',
            'status' => 'published',
            'published_at' => '2025-11-30',
            'image' => 'images/Gombe-State-Medical-equipment-Handover.png',
        ],
        [
            'title' => 'Pantami Highlights Importance of Data Protection in Digital Economy',
            'excerpt' => 'Pantami emphasizes the need for robust data protection measures in Nigeria\'s digital transformation.',
            'content' => '<p>At a cybersecurity conference, Professor Pantami stressed the importance of data protection in building trust in digital services.</p><p>He called for stricter enforcement of data protection laws and greater awareness among businesses and individuals.</p>',
            'category' => 'technology',
            'status' => 'published',
            'published_at' => '2025-11-29',
            'image' => 'images/DR--010.jpg',
        ],
        [
            'title' => 'Pantami Foundation Partners with Tech Giants on Coding Bootcamps',
            'excerpt' => 'The Pantami Foundation has partnered with leading tech companies to provide free coding bootcamps.',
            'content' => '<p>The Professor Isa Pantami Foundation has announced partnerships with major technology firms to offer intensive coding bootcamps across Nigeria.</p><p>The initiative aims to train 10,000 young Nigerians in software development within the next year.</p>',
            'category' => 'education',
            'status' => 'published',
            'published_at' => '2025-11-28',
            'image' => 'images/Dr.-Isa-Ali-Ibrahim-Pantami.jpg',
        ],
        [
            'title' => 'Pantami Advocates for Local Content in Tech Solutions',
            'excerpt' => 'Pantami calls for increased support for locally developed technology solutions.',
            'content' => '<p>Professor Pantami has urged government agencies and private sector organizations to prioritize locally developed technology solutions.</p><p>He emphasized that supporting local innovation is key to achieving technological independence and economic growth.</p>',
            'category' => 'technology',
            'status' => 'published',
            'published_at' => '2025-11-27',
            'image' => 'images/Pantami-001.jpg',
        ],
        [
            'title' => 'Pantami Speaks on Digital Inclusion at International Forum',
            'excerpt' => 'Pantami shares Nigeria\'s digital inclusion strategy at global technology forum.',
            'content' => '<p>Representing Nigeria at the Global Digital Inclusion Forum, Professor Pantami outlined the country\'s strategy for ensuring no one is left behind in the digital age.</p><p>He highlighted initiatives targeting women, rural communities, and persons with disabilities.</p>',
            'category' => 'politics',
            'status' => 'published',
            'published_at' => '2025-11-26',
            'image' => 'images/IMG-20250913-WA0085.jpg',
        ],
        [
            'title' => 'Pantami Launches Digital Skills Training for Civil Servants',
            'excerpt' => 'Pantami initiates digital upskilling program for government workers.',
            'content' => '<p>Professor Isa Pantami has launched a comprehensive digital skills training program for civil servants across all government ministries and agencies.</p><p>The initiative aims to improve service delivery through enhanced digital competencies among public servants.</p>',
            'category' => 'education',
            'status' => 'published',
            'published_at' => '2025-11-25',
            'image' => 'images/Gombe-State-Medical-equipment-Handover.png',
        ],
    ];

    public function run(): void
    {
        $users = User::all();
        if ($users->isEmpty()) {
            $users = User::factory()->count(3)->create();
        }

        // Create real news items
        foreach ($this->newsItems as $item) {
            $category = Category::firstOrCreate(
                ['slug' => Str::slug($item['category'])],
                ['name' => ucfirst($item['category'])]
            );

            Post::create([
                'title' => $item['title'],
                'slug' => Str::slug($item['title']),
                'excerpt' => $item['excerpt'],
                'content' => $item['content'],
                'category_id' => $category->id,
                'author_id' => $users->random()->id,
                'status' => $item['status'] ?? 'published',
                'published_at' => $item['published_at'] ?? now(),
                'image' => $item['image'] ?? null,
                'meta_title' => $item['title'],
                'meta_description' => $item['excerpt'],
                'created_at' => $item['published_at'] ?? now(),
                'updated_at' => now(),
            ]);
        }

        // Add some random posts if we need to reach 30
        $remainingPosts = 30 - count($this->newsItems);
        if ($remainingPosts > 0) {
            $categories = Category::all();
            $images = [
                'images/Dr.-Isa-Ali-Ibrahim-Pantami.jpg',
                'images/Gombe-State-Medical-equipment-Handover.png',
                'images/DR--010.jpg',
                'images/IMG-20250913-WA0085.jpg',
                'images/Pantami-001.jpg',
                'images/download.jpeg'
            ];

            Post::factory()
                ->count($remainingPosts)
                ->state(function () use ($users, $categories, $images) {
                    return [
                        'author_id' => $users->random()->id,
                        'category_id' => $categories->random()->id,
                        'status' => 'published',
                        'published_at' => now()->subDays(rand(0, 60)),
                        'image' => $images[array_rand($images)],
                    ];
                })
                ->create();
        }
    }
}
