<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cache Duration Settings
    |--------------------------------------------------------------------------
    |
    | Define cache durations for different types of data
    |
    */

    'cache' => [
        'categories' => env('CACHE_CATEGORIES_DURATION', 3600), // 1 hour
        'posts' => env('CACHE_POSTS_DURATION', 600), // 10 minutes
        'navigation' => env('CACHE_NAVIGATION_DURATION', 3600), // 1 hour
    ],

    /*
    |--------------------------------------------------------------------------
    | Query Optimization Settings
    |--------------------------------------------------------------------------
    */

    'query' => [
        'homepage_posts_limit' => env('HOMEPAGE_POSTS_LIMIT', 20),
        'category_posts_per_page' => env('CATEGORY_POSTS_PER_PAGE', 20),
    ],

    /*
    |--------------------------------------------------------------------------
    | Image Optimization
    |--------------------------------------------------------------------------
    */

    'images' => [
        'lazy_load' => env('IMAGE_LAZY_LOAD', true),
        'webp_enabled' => env('IMAGE_WEBP_ENABLED', true),
    ],
];
