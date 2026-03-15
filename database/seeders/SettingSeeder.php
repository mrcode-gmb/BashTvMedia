<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $pairs = [
            'site_name' => 'PantamiTimess',
            'tagline' => 'News, Analysis, and Exclusive Stories',
            'accent_color' => '#D4A017',
            'theme_default' => 'light',
            'allow_editors_to_publish' => 'no',
            'enable_email_notifications' => 'yes',
            'homepage_featured_category' => '1',
            'default_post_status' => 'draft',
        ];

        foreach ($pairs as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
