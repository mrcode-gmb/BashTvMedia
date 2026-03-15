<!-- resources/views/home.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PantamiTimess | Newsroom</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.min.js"></script>
    <script>
        tailwind.config = {
            darkMode: 'class'
        }
    </script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .serif { font-family: 'Playfair Display', serif; }
        .accent-gold { color: #D4A017; }
        .bg-gold { background-color: #D4A017; }
        .border-gold { border-color: #D4A017; }
        .hover-gold:hover { color: #D4A017; }
        .dark .dark-bg { background-color: #1a1a1a; }
        .dark .dark-text { color: #e5e5e5; }
        .dark .dark-border { border-color: #333333; }
    </style>
</head>
<body class="antialiased">

    <!-- 1. HEADER WITH NAVIGATION -->
    <header class="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div class="container mx-auto px-4 lg:px-8">
            <!-- Top Social Bar -->
            <div class="hidden lg:flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 text-xs">
                <div class="flex gap-4">
                    <span class="text-gray-600 dark:text-gray-400">Follow us:</span>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:accent-gold transition">Facebook</a>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:accent-gold transition">Twitter</a>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:accent-gold transition">Instagram</a>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:accent-gold transition">LinkedIn</a>
                </div>
                <div class="flex gap-4 items-center">
                    <button @click="darkMode = !darkMode" class="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                        <svg v-if="!darkMode" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clip-rule="evenodd"></path></svg>
                        {{-- <span class="text-xs">{{ :darkMode ? 'Dark' : 'Light' }}</span> --}}
                    </button>
                </div>
            </div>

            <!-- Main Header -->
            <div class="flex items-center justify-between py-4">
                <div class="flex gap-4">
                    <span class="text-gray-600 dark:text-gray-400">Follow us:</span>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:accent-gold transition">Facebook</a>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:accent-gold transition">Twitter</a>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:accent-gold transition">Instagram</a>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:accent-gold transition">LinkedIn</a>
                </div>
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <a href="/" class="serif text-3xl md:text-4xl font-bold tracking-tighter">
                        THE<span class="accent-gold">PANTAMI</span><span class="dark:text-gray-400">TIMES</span>
                    </a>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">News. Trusted. Delivered.</p>
                </div>

                <!-- Search Bar (Desktop) -->
                <div class="hidden md:flex flex-1 mx-8">
                    <div class="w-full max-w-md">
                        <input type="text" placeholder="Search news..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gold">
                    </div>
                </div>

                <!-- Right Section -->
                <div class="flex items-center gap-4">
                    <!-- Subscribe Button (Desktop) -->
                    <button class="hidden md:inline-block px-4 py-2 bg-gold text-white rounded font-semibold text-sm hover:bg-yellow-600 transition">
                        Subscribe
                    </button>

                    <!-- Dark Mode Toggle (Mobile) -->
                    <button @click="darkMode = !darkMode" class="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                        <svg v-if="!darkMode" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clip-rule="evenodd"></path></svg>
                    </button>

                    <!-- Mobile Menu Button -->
                    <button @click="open = !open" class="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Main Navigation (Desktop) -->
            <nav class="hidden md:flex items-center justify-between border-t border-gray-200 dark:border-gray-800 py-3 overflow-x-auto">
                <div class="flex gap-1 flex-wrap">
                    <a href="#" class="px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">News</a>
                    <a href="#" class="px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Metro</a>
                    <a href="#" class="px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Sport</a>
                    <a href="#" class="px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Life</a>
                    <a href="#" class="px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Tech</a>
                    <a href="#" class="px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Business</a>
                    <a href="#" class="px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Opinion</a>
                    <a href="#" class="px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Features</a>
                </div>
                <a href="#" class="px-4 py-2 bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600 transition whitespace-nowrap">e-Paper</a>
            </nav>
        </div>

        <!-- Mobile Navigation Menu -->
        <div x-data="{ open: false }" @click.away="open = false" class="md:hidden">
            <nav x-show="open" x-transition class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 space-y-2">
                <a href="#" class="block px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">News</a>
                <a href="#" class="block px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Metro</a>
                <a href="#" class="block px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Sport</a>
                <a href="#" class="block px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Life</a>
                <a href="#" class="block px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Tech</a>
                <a href="#" class="block px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Business</a>
                <a href="#" class="block px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Opinion</a>
                <a href="#" class="block px-4 py-2 text-sm font-semibold uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded">Features</a>
                <hr class="border-gray-200 dark:border-gray-800 my-2">
                <a href="#" class="block px-4 py-2 bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600 transition">e-Paper</a>
                <button class="w-full px-4 py-2 bg-gold text-white rounded font-semibold text-sm hover:bg-yellow-600 transition">Subscribe</button>
            </nav>
        </div>
    </header>

    <main class="container mx-auto px-4 lg:px-8">
        
        <!-- 2. Top Advertisement Banner -->
        <div class="my-6">
            <div class="w-full h-24 md:h-32 border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 text-sm uppercase tracking-widest">
                Advertisement
            </div>
        </div>

        <!-- 3. Lead News Section (Hero Area) -->
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <!-- Large Featured Story (Left) -->
            <div class="lg:col-span-8">
                <div class="group cursor-pointer">
                    <div class="relative overflow-hidden mb-4">
                        <img src="{{asset("images/download.jpeg")}}" alt="{{ $featuredPost['title'] ?? 'Featured News' }}" class="w-full object-cover transition-transform duration-300 group-hover:scale-105">
                        <span class="absolute top-0 left-0 bg-gold text-white px-3 py-1 text-xs font-bold uppercase">Top News</span>
                    </div>
                    <h2 class="serif text-3xl md:text-4xl font-bold mb-3 leading-tight group-hover:underline decoration-gold">
                        {{ $featuredPost['title'] ?? 'Major Policy Shift Announced as Government Unveils New Economic Roadmap' }}
                    </h2>
                    <p class="text-gray-600 text-lg mb-4 line-clamp-3">
                        {{ $featuredPost['excerpt'] ?? 'In a landmark move today, the administration revealed a comprehensive strategy aimed at stabilizing the national currency and boosting local manufacturing through targeted subsidies and infrastructure development.' }}
                    </p>
                    <div class="flex items-center text-xs text-gray-500 uppercase font-bold">
                        <span class="accent-gold mr-2">Politics</span>
                        <span>&bull; 2 hours ago</span>
                    </div>
                </div>
            </div>

            <!-- Smaller Stacked Headlines (Right) -->
            <div class="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l lg:pl-8 pt-6 lg:pt-0">
                <h3 class="text-xs font-bold uppercase border-b-2 border-gold inline-block mb-4">Latest News</h3>
                @foreach(range(1, 4) as $index)
                <div class="flex gap-4 group cursor-pointer">
                    <div class="flex-1">
                        <span class="accent-gold text-[10px] font-bold uppercase block mb-1">Category</span>
                        <h4 class="serif text-lg font-bold leading-snug group-hover:text-gold transition-colors">
                            {{ $latestPosts[$index]['title'] ?? 'Global Markets React to New Trade Agreements in West Africa' }}
                        </h4>
                    </div>
                    <div class="w-24 h-16 flex-shrink-0 overflow-hidden">
                        <img src="https://via.placeholder.com/150x100" alt="Thumbnail" class="w-full h-full object-cover">
                    </div>
                </div>
                <hr class="border-gray-100">
                @endforeach
            </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Main Content Area -->
            <div class="lg:col-span-9">
                
                <!-- 5. Section Blocks (Repeated Like PantamiTimes) -->
                @php
                    $sections = ['Politics', 'Business', 'Sports', 'Technology', 'Features', 'Opinion'];
                @endphp

                @foreach($sections as $section)
                <section class="mb-12">
                    <!-- 4. Category Strip / Section Divider -->
                    <div class="flex items-center justify-between border-b border-gray-200 mb-6">
                        <h2 class="text-sm font-black uppercase tracking-wider py-2 border-b-4 border-gold -mb-[2px]">
                            {{ $section }}
                        </h2>
                        <a href="#" class="text-xs font-bold accent-gold hover:underline">See All</a>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Main Story in Section -->
                        <div class="group cursor-pointer">
                            <img src="https://via.placeholder.com/600x350" alt="Section Main" class="w-full h-48 object-cover mb-4">
                            <h3 class="serif text-2xl font-bold mb-2 group-hover:underline decoration-gold">
                                {{ $categoryPosts[$section][0]['title'] ?? "Key Developments in $section Shaping the Future of the Nation" }}
                            </h3>
                            <p class="text-gray-600 text-sm line-clamp-2">
                                {{ $categoryPosts[$section][0]['excerpt'] ?? 'Experts weigh in on the latest trends and what they mean for the average citizen in the coming months.' }}
                            </p>
                        </div>

                        <!-- Secondary Stories in Section -->
                        <div class="space-y-4">
                            @foreach(range(1, 3) as $subIndex)
                            <div class="flex gap-4 group cursor-pointer items-start">
                                <div class="w-20 h-20 flex-shrink-0 bg-gray-100">
                                    <img src="https://via.placeholder.com/100x100" alt="Sub" class="w-full h-full object-cover">
                                </div>
                                <div>
                                    <h4 class="serif text-base font-bold leading-tight group-hover:text-gold">
                                        {{ $categoryPosts[$section][$subIndex]['title'] ?? "Breaking updates from the $section desk regarding recent events." }}
                                    </h4>
                                    <span class="text-[10px] text-gray-400 uppercase mt-1 block">15 mins ago</span>
                                </div>
                            </div>
                            @if(!$loop->last) <hr class="border-gray-100"> @endif
                            @endforeach
                        </div>
                    </div>
                </section>
                @endforeach

                <!-- 6. Mixed Content Grid -->
                <section class="mb-12 bg-gray-50 p-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        @foreach(['Metro', 'Life', 'World'] as $mixedCat)
                        <div>
                            <h3 class="text-xs font-bold uppercase border-b border-gold pb-2 mb-4">{{ $mixedCat }}</h3>
                            <div class="space-y-4">
                                @foreach(range(1, 3) as $mIndex)
                                <div class="group cursor-pointer">
                                    <h4 class="serif text-sm font-bold leading-snug group-hover:text-gold">
                                        {{ $mixedPosts[$mixedCat][$mIndex]['title'] ?? "Insightful coverage of $mixedCat stories you might have missed." }}
                                    </h4>
                                    @if(!$loop->last) <hr class="mt-4 border-gray-200"> @endif
                                </div>
                                @endforeach
                            </div>
                        </div>
                        @endforeach
                    </div>
                </section>

            </div>

            <!-- 7. Sidebar (Desktop Only) -->
            <aside class="hidden lg:block lg:col-span-3">
                <div class="sticky top-6 space-y-8">
                    <!-- Trending -->
                    <div class="border border-gray-100 p-4">
                        <h3 class="text-xs font-bold uppercase accent-gold mb-4 flex items-center">
                            <span class="w-2 h-2 bg-gold rounded-full mr-2"></span> Trending
                        </h3>
                        <div class="space-y-4">
                            @foreach(range(1, 5) as $tIndex)
                            <div class="flex gap-3 items-start group cursor-pointer">
                                <span class="serif text-2xl font-bold text-gray-200">{{ $tIndex }}</span>
                                <h4 class="text-sm font-medium leading-tight group-hover:text-gold">
                                    {{ $trendingPosts[$tIndex]['title'] ?? 'The most discussed topic in the newsroom today.' }}
                                </h4>
                            </div>
                            @endforeach
                        </div>
                    </div>

                    <!-- Sidebar Ad -->
                    <div class="w-full h-64 border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 text-xs uppercase tracking-widest">
                        Ad Block
                    </div>

                    <!-- Most Read -->
                    <div>
                        <h3 class="text-xs font-bold uppercase border-b-2 border-black inline-block mb-4">Most Read</h3>
                        <div class="space-y-4">
                            @foreach(range(1, 4) as $rIndex)
                            <div class="group cursor-pointer">
                                <h4 class="serif text-sm font-bold leading-snug group-hover:underline decoration-gold">
                                    {{ $mostReadPosts[$rIndex]['title'] ?? 'A deep dive into the stories everyone is reading right now.' }}
                                </h4>
                                <span class="text-[10px] text-gray-400 uppercase mt-1 block">Category &bull; 4 min read</span>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </aside>
        </div>

        <!-- 8. Footer Teaser Area -->
        <section class="border-t-4 border-black pt-12 pb-20 mt-12">
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                @foreach(['News', 'Opinion', 'Business', 'Sport', 'Life', 'Tech'] as $footerCat)
                <div>
                    <h4 class="text-xs font-bold uppercase mb-4">{{ $footerCat }}</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-xs text-gray-600 hover:text-gold">Latest</a></li>
                        <li><a href="#" class="text-xs text-gray-600 hover:text-gold">Most Read</a></li>
                        <li><a href="#" class="text-xs text-gray-600 hover:text-gold">Archive</a></li>
                        <li><a href="#" class="text-xs text-gray-600 hover:text-gold font-bold accent-gold">View More &rarr;</a></li>
                    </ul>
                </div>
                @endforeach
            </div>
        </section>
    </main>

    <footer class="bg-black text-white py-8">
        <div class="container mx-auto px-4 text-center">
            <p class="text-xs text-gray-500">&copy; {{ date('Y') }} PantamiTimess. All rights reserved.</p>
        </div>
    </footer>

</body>
</html>
