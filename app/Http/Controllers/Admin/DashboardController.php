<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $stats = [
            'published_posts' => \App\Models\Post::where('status', 'published')->count(),
            'pending_posts' => \App\Models\Post::where('status', 'pending')->count(),
            'draft_posts' => \App\Models\Post::where('status', 'draft')->count(),
            'editors' => \App\Models\User::where('role', 'editor')->count(),
            'categories' => \App\Models\Category::count(),
        ];

        return inertia('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }
}
