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
        User::firstOrCreate(
            ['email' => 'admin@bashtvmedia.test'],
            [
                'name' => 'BASHTV Admin',
                'password' => bcrypt('password'),
                'role' => 'admin',
            ]
        );

        User::firstOrCreate(
            ['email' => 'viewer@bashtvmedia.test'],
            [
                'name' => 'BASHTV Viewer',
                'password' => bcrypt('password'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'editor@bashtvmedia.test'],
            [
                'name' => 'BASHTV Editor',
                'password' => bcrypt('password'),
                'role' => 'editor',
            ]
        );

        if (User::count() < 6) {
            User::factory()->count(6 - User::count())->create();
        }

        $this->call([
            CategorySeeder::class,
            SubCategorySeeder::class,
            SettingSeeder::class,
            ImagePostSeeder::class,
        ]);
    }
}
