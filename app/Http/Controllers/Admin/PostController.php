<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $posts = Post::with(['author', 'category'])
            ->when($request->input('status'), function ($query, $status) {
                return $query->where('status', $status);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::with(['subcategories' => function($query) {
            $query->select('id', 'category_id', 'name', 'slug')
                ->orderBy('name');
        }])->get();

        return Inertia::render('Admin/Posts/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:posts,slug',
            'content' => 'required|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'nullable|exists:subcategories,id',
            'status' => ['required', Rule::in(['draft', 'pending', 'published'])],
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'video_url' => 'nullable|url',
            'credit' => 'nullable|string',
        ]);

        $data = $request->except('image');
        $data['author_id'] = auth()->id();
        $data['slug'] = Str::slug($request->slug ?: $request->title);
        $data['published_at'] = $request->status === 'published' ? now() : null;

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $data['image'] = '/images/'.$imageName;
        }

        Post::create($data);

        return redirect()->route('admin.posts.index')->with(
            'success',
            $request->status === 'published'
                ? 'Post created and published successfully.'
                : 'Post created successfully.'
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load(['author', 'category', 'subcategory']);

        return Inertia::render('Admin/Posts/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $categories = Category::with(['subcategories' => function($query) {
            $query->select('id', 'category_id', 'name', 'slug')
                ->orderBy('name');
        }])->get();

        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:posts,slug,' . $post->id,
            'content' => 'required|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'nullable|exists:subcategories,id',
            'status' => ['required', Rule::in(['draft', 'pending', 'published', 'archived'])],
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'video_url' => 'nullable|url',
            'rejection_reason' => 'nullable|string',
            'credit'=>'nullable|string',
        ]);

        // Store the old status to check if it changed
        $oldStatus = $post->status;

        $data = $request->except('image');
        $data += ['published_at' => $request->status === 'published' ? now() : null];
        if ($request->hasFile('image')) {
            // Delete old image
            if ($post->image && file_exists(public_path($post->image))) {
                unlink(public_path($post->image));
            }

            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $data['image'] = '/images/'.$imageName;
        }

        $post->update($data);

        // Send notification to the author if status changed from pending
        if ($oldStatus === 'pending' && $request->status !== 'pending') {
            $author = $post->author;
            
            if ($request->status === 'published') {
                // Notify author that post was approved
                $author->notify(new \App\Notifications\PostApproved($post, auth()->user()));
            } elseif ($request->status === 'archived') {
                // Notify author that post was rejected
                $rejectionReason = $request->input('rejection_reason', 'No specific reason provided.');
                $author->notify(new \App\Notifications\PostRejected($post, auth()->user(), $rejectionReason));
            }
        }

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('admin.posts.index')->with('success', 'Post deleted successfully.');
    }
}
