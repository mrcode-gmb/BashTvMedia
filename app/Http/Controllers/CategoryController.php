<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of all categories.
     */
    public function index()
    {
        $categories = Category::withCount('posts')->get();
        
        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show posts for a specific category.
     */
    public function show($slug)
    {
        $category = Category::where('slug', $slug)
            ->orderBy("priority", "asc")
            ->firstOrFail();
        
        $posts = Post::select([
                'id',
                'uuid',
                'title',
                'slug',
                'image',
                'video_url',
                'excerpt',
                'public_id',
                'category_id',
                'author_id',
                'created_at',
                'published_at',
                'views'
            ])
            ->where('category_id', $category->id)
            ->where('status', 'published')
            ->whereNotNull('published_at')
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
        $categories = Category::with(['subcategories' => function($query) {
            $query->select('id', 'category_id', 'name', 'slug')
                ->withCount('posts')
                ->orderBy('name');
        }])
        ->withCount('posts')
        ->orderBy('priority', 'asc')
        ->get();
        
        return Inertia::render('Categories/Show', [
            'category' => $category,
            'posts' => $posts,
            'categories' => $categories,
        ]);
    }

    /**
     * Show posts for a specific subcategory.
     */
    public function showSubcategory($categorySlug, $subcategorySlug)
    {
        // Find the category
        $category = Category::where('slug', $categorySlug)
            ->orderBy("priority", "asc")
            ->firstOrFail();

        // Find the subcategory
        $subcategory = SubCategory::select('id', 'category_id', 'name', 'slug', 'description')
            ->where('slug', $subcategorySlug)
            ->where('category_id', $category->id)
            ->firstOrFail();

        // Get posts for this subcategory
        $posts = Post::select([
                'id',
                'uuid',
                'title',
                'slug',
                'image',
                'video_url',
                'excerpt',
                'public_id',
                'category_id',
                'subcategory_id',
                'author_id',
                'created_at',
                'published_at',
                'views'
            ])
            ->where('subcategory_id', $subcategory->id)
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->with([
                'author:id,name',
                'category:id,name,slug',
                'subcategory:id,name,slug'
            ])
            ->latest('published_at')
            ->paginate(20);

        // Transform image URLs for paginated results
        $posts->getCollection()->transform(function($post) {
            $post->image = $post->image ? asset($post->image) : null;
            return $post;
        });

        // Get all categories with subcategories for navigation
        $categories = Category::with(['subcategories' => function($query) {
            $query->select('id', 'category_id', 'name', 'slug')
                ->withCount('posts')
                ->orderBy('name');
        }])
        ->withCount('posts')
        ->orderBy('priority', 'asc')
        ->get();

        // return to all sub category here 
        return Inertia::render('SubCategories/Show', [
            'category' => $category,
            'subcategory' => $subcategory,
            'posts' => $posts,
            'categories' => $categories,
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