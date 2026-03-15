<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($post)
    {
        $post = Post::where('public_id', $post)->orWhere("slug", $post)->firstOrFail()->slug;
        // return $post;
        // Find post by slug or ID, only if published - optimized query
        $post = Post::select([
            'id',
            'uuid',
            'title',
            'slug',
            "public_id",
            'content',
            'image',
            'video_url',
            'excerpt',
            'category_id',
            'author_id',
            'created_at',
            'credit',
            'updated_at',
            'published_at',
            'views',
            'status'
        ])
            ->where('slug', $post)
            ->orWhere('id', $post)
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->with([
                'category:id,name,slug',
                'author:id,name'
            ])
            ->firstOrFail();

        // Increment view count only once per IP address (forever)
        $ipAddress = request()->ip();
        $cacheKey = 'post_view_' . $post->id . '_' . $ipAddress;

        // Check if this IP has already viewed this post
        if (!\Illuminate\Support\Facades\Cache::has($cacheKey)) {
            $post->increment('views');
            // Store in cache forever - this IP will never increment this post again
            \Illuminate\Support\Facades\Cache::forever($cacheKey, true);
        }

        // Get trending posts with full image URLs - optimized
        $trendingPosts = Post::select(['id', 'uuid', 'title', 'slug', 'public_id', 'image', 'credit', 'video_url', 'published_at', 'views', 'category_id'])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('id', '!=', $post->id)
            ->with('category:id,name,slug')
            ->orderBy('views', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($item) {
                $item->image = $item->image ? asset($item->image) : null;
                return $item;
            });

        // Get related posts with full image URLs - optimized
        $relatedPosts = Post::select(['id', 'uuid', 'title', 'slug', 'public_id', 'image', 'video_url', 'credit', 'excerpt', 'published_at', 'category_id'])
            ->where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->with('category:id,name,slug')
            ->latest('published_at')
            ->limit(3)
            ->get()
            ->map(function ($item) {
                $item->image = $item->image ? asset($item->image) : null;
                return $item;
            });

        // Ensure post image has full URL
        $post->image = $post->image ? asset($post->image) : null;

        // If author has a profile photo, ensure it has full URL
        if ($post->author && $post->author->profile_photo_path) {
            $post->author->profile_photo_url = asset('storage/' . $post->author->profile_photo_path);
        }
        return Inertia::render('Post/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
            'trendingPosts' => $trendingPosts,
            'categories' => Category::with("subcategories")->orderBy('priority')->get(),
        ])->withViewData([
            'metaTitle' => $post->title,
            'metaDescription' => $post->excerpt,
            'metaImage' => asset($post->image),
        ]);
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
