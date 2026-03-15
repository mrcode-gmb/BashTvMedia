<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        $title = $this->faker->unique()->sentence(6, true);
        $slug = Str::slug($title).'-'.Str::random(6);
        return [
            'title' => $title,
            'slug' => $slug,
            'content' => $this->faker->paragraphs(6, true),
            'image' => 'https://picsum.photos/seed/'.$slug.'/1200/675',
            'status' => 'draft',
            'category_id' => Category::factory(),
            'author_id' => User::factory(),
            'published_at' => null,
        ];
    }

    public function published(): self
    {
        return $this->state(function () {
            return [
                'status' => 'published',
                'published_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
            ];
        });
    }
}
