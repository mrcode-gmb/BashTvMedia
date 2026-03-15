<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $names = [
                ['name' => 'News', 'slug' => 'news'],
                ['name' => 'Metro', 'slug' => 'metro'],
                ['name' => 'Technology', 'slug' => 'technology'],
                ['name' => 'Science', 'slug' => 'science'],
                ['name' => 'Health', 'slug' => 'health'],
                ['name' => 'Sports', 'slug' => 'sports'],
                ['name' => 'Entertainment', 'slug' => 'entertainment'],
                ['name' => 'Business', 'slug' => 'business'],
                ['name' => 'Politics', 'slug' => 'politics'],
        ];
        foreach ($names as $name) {
            Category::firstOrCreate(
                ['slug' => $name['slug']],
                ['name' => $name['name']]
            );
        }
    }
}
