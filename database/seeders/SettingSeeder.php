<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $pairs = [
            'site_name' => 'BASHTV MEDIA',
            'tagline' => 'Bold Hausa journalism through video, headlines, and sharp reporting.',
            'accent_color' => '#D38C28',
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
