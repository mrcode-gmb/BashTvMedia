<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('q', '');
        
        // Validate search query
        if (empty(trim($query))) {
            return redirect()->route('welcome');
        }

        // Search posts
        $posts = Post::select([
                'id',
                'uuid',
                'title',
                'slug',
                'image',
                'video_url',
                'excerpt',
                'category_id',
                'author_id',
                'created_at',
                'published_at',
                'views'
            ])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where(function($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('content', 'like', "%{$query}%")
                  ->orWhere('excerpt', 'like', "%{$query}%");
            })
            ->with([
                'author:id,name',
                'category:id,name,slug'
            ])
            ->latest('published_at')
            ->paginate(20);

        // Transform image URLs for paginated results
        $posts->getCollection()->transform(function($post) {
            $post->image = $post->image ? asset($post->image) : null;
            return $post;
        });

        // Get all categories with subcategories for navigation
        $categories = \Illuminate\Support\Facades\Cache::remember('nav_categories', 3600, function () {
            return Category::select('id', 'name', 'slug')
                ->with(['subcategories' => function($query) {
                    $query->select('id', 'category_id', 'name', 'slug')
                        ->withCount('posts')
                        ->orderBy('name');
                }])
                ->withCount('posts')
                ->orderBy('name')
                ->get();
        });

        return Inertia::render('Search/Index', [
            'query' => $query,
            'posts' => $posts,
            'categories' => $categories,
        ]);
    }
}
