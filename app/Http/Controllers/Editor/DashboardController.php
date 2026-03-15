<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $posts = Post::where('author_id', auth()->id())->get();
         $recentPosts = $user->posts()
        ->latest()
        ->take(5)
        ->get(['id', 'title', 'slug', 'status', 'created_at']);
        $stats = [
            'total' => $posts->count(),
            'draft' => $posts->where('status', 'draft')->count(),
            'pending' => $posts->where('status', 'pending')->count(),
            'published' => $posts->where('status', 'published')->count(),
            'rejected' => $posts->where('status', 'rejected')->count(),
        ];

        return Inertia::render('Editor/Dashboard', [
            'stats' => $stats,
            'recentPosts' => $recentPosts,

        ]);
    }
}
