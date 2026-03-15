<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $posts = Post::with(['category', 'author'])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->orderByDesc('published_at')
            ->get();

        $featuredPost = $posts->first();
        $latestPosts = $posts->skip(1);

        $postsByCategory = $posts->groupBy(function ($post) {
            return optional($post->category)->name;
        });

        $trendingPosts = $posts->sortByDesc('published_at');
        $mostReadPosts = $posts->shuffle();

        return view('home', compact(
            'featuredPost',
            'latestPosts',
            'postsByCategory',
            'trendingPosts',
            'mostReadPosts'
        ));
    }
}
