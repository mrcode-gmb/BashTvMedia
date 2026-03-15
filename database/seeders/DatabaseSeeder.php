<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@pantamitimes.test',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'Editor',
            'email' => 'editor@pantamitimes.test',
            'password' => bcrypt('password'),
            'role' => 'editor',
        ]);

        User::factory()->count(4)->create();

        $this->call([
            CategorySeeder::class,
            SettingSeeder::class,
            // Comment out the original PostSeeder if you want to use ImagePostSeeder instead
            // PostSeeder::class,
            ImagePostSeeder::class, // Use this to seed with images from public/images
            // PostSeeder::class, // Use this to seed with images from public/images
        ]);
    }
}
