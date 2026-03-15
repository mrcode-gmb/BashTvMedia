<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    
    {{-- Homepage --}}
    <url>
        <loc>{{ config('app.url') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>hourly</changefreq>
        <priority>1.0</priority>
    </url>

    {{-- Categories --}}
    @foreach($categories as $category)
    <url>
        <loc>{{ config('app.url') }}/category/{{ $category->slug }}</loc>
        <lastmod>{{ $category->updated_at->toAtomString() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach

    {{-- Posts --}}
    @foreach($posts as $post)
    <url>
        <loc>{{ route('posts.show.full', $post->slug) }}</loc>
        <lastmod>{{ $post->updated_at->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
        
        {{-- News Sitemap Extension --}}
        <news:news>
            <news:publication>
                <news:name>{{ config('app.name') }}</news:name>
                <news:language>{{ app()->getLocale() }}</news:language>
            </news:publication>
            <news:publication_date>{{ $post->published_at->toAtomString() }}</news:publication_date>
            <news:title>{{ $post->title }}</news:title>
        </news:news>

        {{-- Image Extension --}}
        @if($post->image)
        <image:image>
            <image:loc>{{ asset($post->image) }}</image:loc>
            <image:title>{{ $post->title }}</image:title>
            <image:caption>{{ Str::limit(strip_tags($post->content), 100) }}</image:caption>
        </image:image>
        @endif
    </url>
    @endforeach

</urlset>
