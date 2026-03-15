<?php

namespace App\Services;

use App\Models\Post;
use Inertia\Inertia;

class SeoService
{
    /**
     * Generate SEO meta tags for a post
     */
    public static function generatePostMeta(Post $post): array
    {
        $description = strip_tags($post->meta_description ?? Str::limit($post->content, 160));
        $image = $post->image ? asset($post->image) : asset('images/logo.jpg');
        
        return [
            'title' => $post->meta_title ?? $post->title . ' - ' . config('app.name'),
            'description' => $description,
            'keywords' => $post->category->name ?? 'news',
            'og:type' => 'article',
            'og:title' => $post->title,
            'og:description' => $description,
            'og:image' => $image,
            'og:url' => route('posts.show.full', $post->slug),
            'article:published_time' => $post->published_at?->toIso8601String(),
            'article:modified_time' => $post->updated_at->toIso8601String(),
            'article:author' => $post->author->name ?? 'BASHTV MEDIA',
            'article:section' => $post->category->name ?? 'News',
            'twitter:card' => 'summary_large_image',
            'twitter:title' => $post->title,
            'twitter:description' => $description,
            'twitter:image' => $image,
        ];
    }

    /**
     * Generate structured data for a news article
     */
    public static function generateArticleSchema(Post $post): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'NewsArticle',
            'headline' => $post->title,
            'description' => strip_tags(Str::limit($post->content, 200)),
            'image' => $post->image ? asset($post->image) : asset('images/logo.jpg'),
            'datePublished' => $post->published_at?->toIso8601String(),
            'dateModified' => $post->updated_at->toIso8601String(),
            'author' => [
                '@type' => 'Person',
                'name' => $post->author->name ?? 'BASHTV MEDIA',
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => config('app.name'),
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => asset('images/logo.jpg'),
                ],
            ],
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => route('posts.show.full', $post->slug),
            ],
        ];
    }

    /**
     * Generate breadcrumb schema
     */
    public static function generateBreadcrumbSchema(Post $post): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                [
                    '@type' => 'ListItem',
                    'position' => 1,
                    'name' => 'Home',
                    'item' => config('app.url'),
                ],
                [
                    '@type' => 'ListItem',
                    'position' => 2,
                    'name' => $post->category->name ?? 'News',
                    'item' => config('app.url') . '/category/' . ($post->category->slug ?? 'news'),
                ],
                [
                    '@type' => 'ListItem',
                    'position' => 3,
                    'name' => $post->title,
                    'item' => route('posts.show.full', $post->slug),
                ],
            ],
        ];
    }
}
