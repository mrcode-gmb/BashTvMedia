<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::where('author_id', auth()->id())
            ->with(['category'])
            ->when($request->input('status'), function ($query, $status) {
                return $query->where('status', $status);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Editor/Posts/Index', [
            'posts' => $posts,
            'filters' => $request->only(['status']),
        ]);
    }

    public function create()
    {
        $categories = Category::with(['subcategories' => function($query) {
            $query->select('id', 'category_id', 'name', 'slug')
                ->orderBy('name');
        }])->get();

        return Inertia::render('Editor/Posts/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'nullable|exists:subcategories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'video_url' => 'nullable|url',
            'credit'=>'nullable|string',
        ]);
        
        $data = $request->except('image');
        $data['author_id'] = auth()->id();
        $data['status'] = 'pending';
        
        // Generate unique slug by combining title slug with timestamp
        $baseSlug = Str::slug($request->title);
        $data['slug'] = $baseSlug;
        $data['public_id'] = self::generatePublicId();
        $data['uuid'] = Str::uuid();

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $data['image'] = '/images/'.$imageName;
        }

        // First, create the post
        $post = Post::create($data);

        // Then get all admins and send notifications
        $admins = \App\Models\User::where('role', 'admin')->get();
        
        foreach ($admins as $admin) {
            $admin->notify(new \App\Notifications\NewPostPendingReview($post, auth()->user()));
        }

        return redirect()->route('editor.dashboard')->with('success', 'Post created successfully and sent for review.');
    }

    public function edit(Post $post)
    {
        $categories = Category::with(['subcategories' => function($query) {
            $query->select('id', 'category_id', 'name', 'slug')
                ->orderBy('name');
        }])->get();

        return Inertia::render('Editor/Posts/Edit', [
            'post' => $post,
            'categories' => $categories,
        ]);
    }
    protected static function booted()
    {
        static::creating(function ($post) {
            if (! $post->public_id) {
                $post->public_id = self::generatePublicId();
            }
        });
    }

    public static function generatePublicId(int $length = 12): string
    {
        $alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $max = strlen($alphabet) - 1;

        do {
            $id = '';
            for ($i = 0; $i < $length; $i++) {
                $id .= $alphabet[random_int(0, $max)];
            }
        } while (Post::where('slug', $id)->exists()); // ultra-rare loop

        return $id;
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
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
            'credit'=>'nullable|string',
        ]);

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

        return redirect()->route('editor.posts.index')->with('success', 'Post updated successfully.');
    }
}
