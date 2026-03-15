<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Post;

class BackfillPostPublicIds extends Command
{
    protected $signature = 'posts:backfill-public-ids {--chunk=500}';
    protected $description = 'Generate public_id for existing posts that do not have it';

    public function handle(): int
    {
        $chunk = (int) $this->option('chunk');

        Post::whereNull('slug')
            ->select(['id', 'slug'])
            ->orderBy('id')
            ->chunkById($chunk, function ($posts) {
                foreach ($posts as $post) {
                    // Generate + save (uses your model generator method)
                    $post->slug = Post::generatePublicId(12);
                    $post->save(); // avoids firing events if you want
                }
            });

        $this->info('Done backfilling public_id.');
        return self::SUCCESS;
    }
}
