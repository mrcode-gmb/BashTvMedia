<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Headlines', 'slug' => 'headlines', 'priority' => '1'],
            ['name' => 'Hausa News', 'slug' => 'hausa-news', 'priority' => '2'],
            ['name' => 'Politics', 'slug' => 'politics', 'priority' => '3'],
            ['name' => 'Reports', 'slug' => 'reports', 'priority' => '4'],
            ['name' => 'Interviews', 'slug' => 'interviews', 'priority' => '5'],
            ['name' => 'Explainers', 'slug' => 'explainers', 'priority' => '6'],
            ['name' => 'Community Watch', 'slug' => 'community-watch', 'priority' => '7'],
            ['name' => 'Business', 'slug' => 'business', 'priority' => '8'],
            ['name' => 'World', 'slug' => 'world', 'priority' => '9'],
            ['name' => 'Media Watch', 'slug' => 'media-watch', 'priority' => '10'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                [
                    'name' => $category['name'],
                    'priority' => $category['priority'],
                ]
            );
        }
    }
}
