<?php

namespace App\Console\Commands;

use App\Models\Post;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class BackfillPostUuids extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:backfill-post-uuids';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate UUIDs for existing posts that do not have one.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $posts = Post::whereNull('uuid')->get();
        $this->info("Found {$posts->count()} posts to backfill with UUIDs.");

        if ($posts->isEmpty()) {
            $this->info('No posts to update.');
            return;
        }

        $bar = $this->output->createProgressBar($posts->count());
        $bar->start();

        foreach ($posts as $post) {
            $post->uuid = Str::uuid();
            $post->save();
            $bar->advance();
        }

        $bar->finish();
        $this->info("\nSuccessfully backfilled UUIDs for all posts.");
    }
}
