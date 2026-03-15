<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $mostReadPosts = Post::orderBy('views', 'desc')->take(10)->get();
        $categoryPopularity = Category::withCount('posts')->orderBy('posts_count', 'desc')->get();
        $editorActivity = User::where('role', 'editor')
            ->withCount('posts')
            ->orderBy('posts_count', 'desc')
            ->get();

        return Inertia::render('Admin/Reports/Index', [
            'mostReadPosts' => $mostReadPosts,
            'categoryPopularity' => $categoryPopularity,
            'editorActivity' => $editorActivity,
        ]);
    }
}
