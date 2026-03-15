<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ImagePostSeeder extends Seeder
{
    protected $imageDirectory = 'public/images';
    protected $imageUrls = [];

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
            'category' => 'news',
            'status' => 'published',
            'published_at' => '2025-12-01',
            'image' => 'images/Dr.-Isa-Ali-Ibrahim-Pantami.jpg',
        ],
    ];

    public function run(): void
    {
        // Get or create a default user if none exists
        $user = User::first();
        if (!$user) {
            $user = User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
            ]);
        }

        // Create categories if they don't exist
        $categories = [];
        $categorySlugs = array_unique(array_column($this->newsItems, 'category'));

        foreach ($categorySlugs as $slug) {
            $categories[$slug] = Category::firstOrCreate(
                ['slug' => $slug],
                ['name' => ucfirst($slug)]
            );
        }

        // Create posts from news items
        foreach ($this->newsItems as $item) {
            Post::firstOrCreate(
                ['title' => $item['title']],
                [
                    'slug' => Str::slug($item['title']),
                    'public_id' => uniqid(),
                    'excerpt' => $item['excerpt'],
                    'content' => $item['content'],
                    'category_id' => $categories[$item['category']]->id,
                    'author_id' => $user->id,
                    'status' => $item['status'],
                    'published_at' => $item['published_at'],
                    'image' => $item['image'] ?? null,
                    'meta_title' => $item['title'],
                    'meta_description' => $item['excerpt'],
                    'created_at' => $item['published_at'],
                    'updated_at' => now(),
                ]
            );
        }

        // Create additional random posts if needed
    //     $remainingPosts =  count($this->newsItems);
    //     if ($remainingPosts < 0) {
    //         $categories = Category::all();

    //         for ($i = 0; $i < $remainingPosts; $i++) {
    //             $category = $categories->random();

    //             Post::factory()->create([
    //                 'category_id' => $category->id,
    //                 'author_id' => $user->id,
    //                 'status' => 'published',
    //                 'published_at' => now()->subDays(rand(0, 60)),
    //             ]);
    //         }
    //     }

    //     if (empty($this->imageUrls)) {
    //         $this->command->warn('No images found in the public/images directory. Using placeholder images.');
    //         $this->imageUrls = [
    //             'https://picsum.photos/1200/675?random=1',
    //             'https://picsum.photos/1200/675?random=2',
    //             'https://picsum.photos/1200/675?random=3',
    //         ];
    //     }

    //     // Create 50 posts
    //     $this->command->info('Creating 50 posts with images...');

    //     $posts = [];
    //     $faker = \Faker\Factory::create();

    //     for ($i = 1; $i <= 2; $i++) {
    //         $category = $categories->random();
    //         $content = $this->generateContent($faker, $category->name);

    //         // Extract first sentence from content to generate relevant title
    //         $firstSentence = trim(explode('.', strip_tags($content))[0]);
    //         $words = array_filter(explode(' ', $firstSentence));
    //         $title = '';

    //         // Create a title based on the first sentence
    //         if (count($words) > 5) {
    //             $title = ucfirst(implode(' ', array_slice($words, 0, 8)));
    //             $title = rtrim($title, ',.') . '...';
    //         } else {
    //             // Fallback to Faker if the first sentence is too short
    //             $title = $faker->sentence(rand(4, 8));
    //         }

    //         $slug = Str::slug($title) . '-' . Str::random(6);
    //         $image = $this->imageUrls[array_rand($this->imageUrls)];

    //         $posts[] = [
    //             'title' => $title,
    //             'slug' => $slug,
    //             'content' => $content,
    //             'image' => $image,
    //             'status' => 'published',
    //             'category_id' => $category->id,
    //             'author_id' => $user->id,
    //             'published_at' => now()->subDays(rand(0, 30)),
    //             'created_at' => now(),
    //             'updated_at' => now(),
    //         ];

    //         // Show progress
    //         if ($i % 10 === 0) {
    //             $this->command->info("Created {$i} posts...");
    //         }
    //     }

    //     // Insert all posts in chunks for better performance
    //     foreach (array_chunk($posts, 5) as $chunk) {
    //         Post::insert($chunk);
    //     }

    //     $this->command->info('Successfully created 50 posts with images!');
    // }

    // protected function getImageFiles(): void
    // {
    //     $imagesPath = base_path($this->imageDirectory);

    //     if (!File::exists($imagesPath)) {
    //         $this->command->warn("Directory {$imagesPath} does not exist.");
    //         return;
    //     }

    //     $files = File::files($imagesPath);

    //     foreach ($files as $file) {
    //         $extension = strtolower($file->getExtension());

    //         // Only include image files
    //         if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
    //             $this->imageUrls[] = '/images/' . $file->getRelativePathname();
    //         }
    //     }
    }

    protected function generateContent($faker, string $category): string
    {
        $intro = [
            'In recent developments,',
            'As we move forward into the new era,',
            'With the current trends showing,',
            'Recent analysis has revealed that',
            'In a significant turn of events,',
            'Experts in the field have observed that',
            'A growing body of evidence suggests',
            'In light of recent findings,',
            'The latest research indicates that',
            'Contrary to previous assumptions,',
        ];

        $transition = [
            'Furthermore, it is important to consider',
            'Moreover, additional research has demonstrated',
            'On the other hand, critics argue that',
            'Similarly, related studies have found',
            'In contrast to these findings,',
            'Building upon these results,',
            'To better understand this phenomenon,',
            'When examining the broader context,',
            'In addition to these developments,',
            'As a result of these discoveries,',
        ];

        $conclusion = [
            'These findings have significant implications for future research and practical applications.',
            'The implications of these results extend far beyond the immediate scope of this study.',
            'This research opens new avenues for further investigation into this important topic.',
            'The evidence presented here challenges conventional wisdom and suggests new directions.',
            'These insights provide a foundation for future studies in this rapidly evolving field.',
        ];

        // Generate rich, detailed content based on category
        $content = "<h2>Introduction</h2>";
        $content .= "<p>" . $intro[array_rand($intro)] . " " . $this->getDetailedContent($category) . "</p>";
        $content .= "<p>" . $faker->paragraph(8) . "</p>";

        $content .= "<h2>Key Findings</h2>";
        $content .= "<p>" . $transition[array_rand($transition)] . " " . $this->getDetailedContent($category) . "</p>";
        $content .= "<p>" . $faker->paragraph(10) . "</p>";

        // Add a blockquote for emphasis
        $content .= '<blockquote class="bg-gray-100 p-4 italic border-l-4 border-primary my-6">';
        $content .= '"'. $faker->sentence(15) . '"</blockquote>';

        $content .= "<h2>Analysis and Discussion</h2>";
        $content .= "<p>" . $transition[array_rand($transition)] . " " . $this->getDetailedContent($category) . "</p>";
        $content .= "<p>" . $faker->paragraph(12) . "</p>";

        // Add a list of key points
        $content .= '<h3 class="mt-6 mb-3 text-xl font-semibold">Key Points:</h3>';
        $content .= '<ul class="list-disc pl-6 space-y-2 mb-6">';
        for ($i = 0; $i < 5; $i++) {
            $content .= '<li class="leading-relaxed">' . $this->getKeyPoint($category) . '</li>';
        }
        $content .= "</ul>";

        $content .= "<h2>Conclusion</h2>";
        $content .= "<p>" . $conclusion[array_rand($conclusion)] . " " . $this->getDetailedContent($category) . "</p>";
        $content .= "<p>" . $faker->paragraph(8) . "</p>";

        // Add a final thought or call to action
        $content .= '<div class="bg-blue-50 p-4 rounded-lg mt-6">';
        $content .= '<h3 class="text-lg font-semibold mb-2">Final Thoughts</h3>';
        $content .= "<p>" . $faker->paragraph(6) . "</p>";
        $content .= "</div>";

        return $content;
    }

    protected function getDetailedContent(string $category): string
    {
        $content = [
            'technology' => [
                'The rapid advancement of artificial intelligence and machine learning technologies has revolutionized the way we interact with digital systems. Neural networks and deep learning algorithms are now capable of performing complex tasks that were once thought to be exclusive to human intelligence. From natural language processing to computer vision, these technologies are being integrated into various aspects of our daily lives.',
                'The Internet of Things (IoT) has transformed ordinary devices into smart, interconnected systems that can collect, analyze, and act on data. This network of physical objects, embedded with sensors and software, enables seamless communication between devices, creating opportunities for automation and improved efficiency across multiple industries.',
                'Blockchain technology, initially developed for digital currencies, has found applications far beyond cryptocurrency. Its decentralized and secure nature makes it ideal for supply chain management, voting systems, and digital identity verification, among other use cases.',
            ],
            'science' => [
                'Recent breakthroughs in quantum computing have opened new frontiers in scientific research. These powerful machines leverage the principles of quantum mechanics to perform calculations at speeds unimaginable with classical computers, potentially solving complex problems in fields ranging from cryptography to drug discovery.',
                'The study of dark matter and dark energy continues to challenge our understanding of the universe. These mysterious components, which make up approximately 95% of the total mass-energy content of the cosmos, remain among the greatest unsolved problems in modern physics.',
                'Advancements in genetic engineering, particularly CRISPR-Cas9 technology, have revolutionized the field of molecular biology. This precise gene-editing tool allows scientists to modify DNA sequences with unprecedented accuracy, offering potential cures for genetic disorders and improvements in agricultural productivity.'
            ],
            'health' => [
                'The importance of mental health has gained significant attention in recent years, with growing recognition of its impact on overall well-being. Research shows that mental health conditions affect millions worldwide, and addressing them requires a comprehensive approach that includes therapy, medication, and social support systems.',
                'Personalized medicine is transforming healthcare by tailoring treatments to individual genetic profiles. This approach considers genetic, environmental, and lifestyle factors to develop targeted therapies that are more effective and have fewer side effects than traditional one-size-fits-all treatments.',
                'The global response to emerging infectious diseases has highlighted the importance of robust public health infrastructure. From pandemic preparedness to vaccination campaigns, coordinated efforts between governments, healthcare providers, and communities are essential for preventing and controlling disease outbreaks.'
            ],
            'sports' => [
                'The integration of technology in sports has revolutionized how athletes train, compete, and recover. From wearable devices that monitor performance metrics to video analysis software that breaks down technique, these innovations are helping athletes push the boundaries of human potential.',
                'The business of sports continues to grow exponentially, with media rights deals, sponsorships, and merchandise sales generating billions annually. This economic impact extends beyond professional leagues to local communities that benefit from sports-related tourism and infrastructure development.',
                'Sports psychology has emerged as a critical component of athletic success, with mental conditioning now considered as important as physical training. Techniques such as visualization, mindfulness, and goal-setting are helping athletes maintain focus and perform under pressure.'
            ],
            'business' => [
                'The shift towards remote and hybrid work models has fundamentally changed the modern workplace. Companies are reimagining office spaces, implementing digital collaboration tools, and developing new policies to support employee productivity and work-life balance in this evolving landscape.',
                'Sustainable business practices are no longer optional but essential for long-term success. Organizations are adopting environmentally friendly initiatives, from reducing carbon footprints to implementing circular economy principles, in response to growing consumer demand for corporate responsibility.',
                'The rise of artificial intelligence in business operations is automating routine tasks, enhancing decision-making processes, and creating new opportunities for innovation. Companies that effectively leverage AI technologies are gaining competitive advantages through improved efficiency and customer experiences.',
                'The global supply chain is undergoing a significant transformation as businesses adapt to post-pandemic realities. Companies are diversifying suppliers, increasing inventory buffers, and leveraging technology to create more resilient and transparent supply networks.',
                'Fintech innovations are disrupting traditional banking and financial services, with digital payment solutions, blockchain technology, and AI-driven financial advice platforms gaining widespread adoption among consumers and businesses alike.',
                'The gig economy continues to expand, with more professionals opting for freelance and contract work. This shift is prompting businesses to rethink talent acquisition and management strategies to accommodate this growing segment of the workforce.',
                'Corporate social responsibility has evolved from a marketing strategy to a business imperative. Companies are being held accountable not just for their financial performance but also for their impact on society and the environment.',
                'The rise of direct-to-consumer (DTC) brands is challenging traditional retail models. These digitally-native companies are leveraging social media and data analytics to build strong customer relationships and disrupt established markets.',
                'Businesses are increasingly adopting data-driven decision-making processes. The ability to collect, analyze, and act on data is becoming a key differentiator in competitive markets across industries.'
            ],
            'metro' => [
                'Urban transportation systems are undergoing major transformations with the introduction of electric vehicles, bike-sharing programs, and smart traffic management solutions. These innovations aim to reduce congestion and improve air quality in major metropolitan areas.',
                'Affordable housing remains a critical issue in many major cities, with local governments and developers exploring creative solutions such as micro-apartments, co-living spaces, and inclusionary zoning policies to address the growing demand.',
                'The revitalization of downtown areas is a priority for many city planners, with mixed-use developments that combine residential, commercial, and recreational spaces becoming increasingly popular in urban centers.',
                'Public safety initiatives are leveraging technology such as predictive policing algorithms and smart surveillance systems to enhance security while addressing concerns about privacy and civil liberties in urban environments.',
                'The pandemic has accelerated the transformation of urban spaces, with many cities reallocating street space for outdoor dining, pedestrian zones, and expanded cycling infrastructure to support social distancing and active transportation.',
                'Waste management and recycling programs are being reimagined in major cities, with smart bins, composting initiatives, and zero-waste policies helping to reduce landfill contributions and promote sustainability.',
                'The integration of green spaces and urban parks is being prioritized in city planning, with research showing significant benefits for mental health, air quality, and community well-being in densely populated areas.',
                'Public transportation systems are being modernized with contactless payment options, real-time tracking, and improved accessibility features to enhance the commuter experience and encourage greater ridership.',
                'The rise of 15-minute neighborhoods, where residents can access most daily needs within a short walk or bike ride, is reshaping urban planning priorities and reducing reliance on private vehicles.',
                'Affordable high-speed internet access is being recognized as essential urban infrastructure, with many cities launching municipal broadband initiatives to bridge the digital divide and support economic development.'
            ],
            'politics' => [
                'Global geopolitical tensions continue to shape international relations, with shifting alliances and economic competitions redefining power dynamics. These developments have far-reaching implications for trade policies, security arrangements, and diplomatic relations between nations.',
                'The role of social media in politics has become increasingly significant, influencing public opinion and election outcomes. While these platforms provide opportunities for political engagement, they also raise concerns about misinformation, echo chambers, and foreign interference in democratic processes.',
                'Climate change policy has emerged as a central issue in political discourse worldwide. Governments are facing growing pressure to implement ambitious emissions reduction targets and transition to renewable energy sources while balancing economic considerations and energy security concerns.'
            ],
            'entertainment' => [
                'The streaming revolution has transformed the entertainment industry, with platforms like Netflix, Disney+, and Amazon Prime Video changing how content is produced, distributed, and consumed. This shift has led to an unprecedented boom in high-quality television series and films, creating a golden age of content.',
                'Virtual and augmented reality technologies are creating immersive entertainment experiences that blur the line between the digital and physical worlds. From gaming to live events, these innovations are opening new possibilities for storytelling and audience engagement.',
                'The music industry continues to evolve with the rise of streaming services and social media platforms. Independent artists now have unprecedented access to global audiences, while established stars are finding new ways to connect with fans through virtual concerts and interactive experiences.'
            ],
            'default' => [
                'In today\'s rapidly changing world, staying informed about current events and emerging trends is more important than ever. The ability to analyze information critically and make well-informed decisions has become a crucial skill in both personal and professional contexts.',
                'The intersection of technology and society continues to raise important questions about privacy, ethics, and the future of human interaction. As we navigate these complex issues, thoughtful discussion and evidence-based decision-making will be essential for creating a better future for all.',
                'The importance of continuous learning and adaptation has been underscored by the rapid pace of change in the modern world. Whether in our careers or personal lives, developing a growth mindset and embracing new challenges is key to long-term success and fulfillment.'
            ]
        ];

        $category = strtolower($category);
        $category = isset($content[$category]) ? $category : 'default';
        return $content[$category][array_rand($content[$category])];
    }

    protected function getKeyPoint(string $category): string
    {
        $points = [
            'technology' => [
                'AI-powered automation is transforming industries by increasing efficiency and reducing human error.',
                '5G technology is enabling faster, more reliable wireless communication networks worldwide.',
                'Cybersecurity remains a top priority as digital transformation accelerates across sectors.',
                'Cloud computing continues to revolutionize data storage and processing capabilities.',
                'The development of quantum-resistant cryptography is becoming increasingly important.'
            ],
            'science' => [
                'CRISPR gene editing shows promise for treating genetic disorders and improving crop yields.',
                'Renewable energy technologies are becoming more efficient and cost-effective.',
                'Neuroscience research is uncovering new insights into brain function and consciousness.',
                'Space exploration efforts are expanding with missions to Mars and beyond.',
                'Climate science continues to provide critical data on global environmental changes.'
            ],
            'health' => [
                'Preventive healthcare measures can significantly reduce the risk of chronic diseases.',
                'Mental health awareness is leading to better support systems and treatment options.',
                'Telemedicine is improving healthcare access for remote and underserved populations.',
                'Personalized nutrition plans based on genetic testing are gaining popularity.',
                'Advances in medical technology are enabling earlier and more accurate diagnoses.'
            ],
            'sports' => [
                'Data analytics is playing an increasingly important role in athlete performance and team strategy.',
                'Esports continues to grow as a legitimate and lucrative competitive field.',
                'Sports organizations are implementing more comprehensive concussion protocols.',
                'The economic impact of major sporting events extends beyond the games themselves.',
                'Youth sports participation has significant developmental benefits beyond physical fitness.'
            ],
            'business' => [
                'Remote work policies are becoming a standard benefit for attracting top talent.',
                'Sustainable business practices are increasingly important to consumers and investors.',
                'Digital transformation is no longer optional for remaining competitive in most industries.',
                'Customer experience has become a key differentiator in crowded markets.',
                'Supply chain resilience is a critical consideration in global business strategy.',
                'The subscription economy is reshaping traditional business models across industries.',
                'Employee well-being programs are proving to increase productivity and reduce turnover.',
                'Blockchain technology is finding applications beyond cryptocurrency in business operations.',
                'The circular economy is gaining traction as companies focus on sustainability.',
                'Data privacy regulations are forcing businesses to rethink their data management strategies.'
            ],
            'metro' => [
                'Urban farming initiatives are helping to increase food security in city centers.',
                'Smart city technologies are being deployed to improve traffic flow and reduce congestion.',
                'Affordable housing developments are being integrated with public transportation hubs.',
                'Pedestrian-only zones are transforming city centers into more livable spaces.',
                'Community policing initiatives are helping to build trust between residents and law enforcement.',
                'Green roofs and vertical gardens are becoming common features in urban architecture.',
                'Car-sharing and bike-sharing programs are reducing the need for private vehicle ownership.',
                'Urban renewal projects are preserving historical buildings while creating modern spaces.',
                'Noise pollution reduction measures are improving quality of life in dense urban areas.',
                'Public-private partnerships are funding major infrastructure improvements in cities.'
            ],
            'entertainment' => [
                'Streaming platforms are investing heavily in original content production.',
                'The line between film and television continues to blur with high-budget series.',
                'Virtual concerts and events have gained popularity during the pandemic.',
                'The gaming industry now rivals Hollywood in terms of revenue and cultural impact.',
                'Diversity and representation in media are receiving increased attention and scrutiny.'
            ],
            'default' => [
                'Critical thinking skills are essential for navigating today\'s complex information landscape.',
                'Lifelong learning is becoming increasingly important in a rapidly changing job market.',
                'Effective communication remains one of the most valuable professional skills.',
                'Work-life balance is crucial for long-term career satisfaction and personal well-being.',
                'Building strong professional networks can open doors to new opportunities.'
            ]
        ];

        $category = strtolower($category);
        $category = isset($points[$category]) ? $category : 'default';
        return $points[$category][array_rand($points[$category])];
    }
}
