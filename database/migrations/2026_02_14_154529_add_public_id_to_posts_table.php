<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // 1) Add as nullable first
        Schema::table('posts', function (Blueprint $table) {
            $table->string('public_id', 16)->nullable()->after('id');
        });

        // 2) Backfill (simple base62 random)
        $alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $max = strlen($alphabet) - 1;

        DB::table('posts')->whereNull('public_id')->orderBy('id')->chunkById(500, function ($rows) use ($alphabet, $max) {
            foreach ($rows as $row) {
                do {
                    $id = '';
                    for ($i = 0; $i < 12; $i++) {
                        $id .= $alphabet[random_int(0, $max)];
                    }
                    $exists = DB::table('posts')->where('public_id', $id)->exists();
                } while ($exists);

                DB::table('posts')->where('id', $row->id)->update(['public_id' => $id]);
            }
        });

        // 3) Add unique index (and index)
        Schema::table('posts', function (Blueprint $table) {
            $table->unique('public_id');
        });

        // 4) Make not null (DB-specific raw SQL)
        // MySQL / MariaDB:
        DB::statement("ALTER TABLE posts MODIFY public_id VARCHAR(16) NOT NULL");
        // If you're on PostgreSQL instead, tell me and I’ll give the exact statement.
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropUnique(['public_id']);
            $table->dropColumn('public_id');
        });
    }
};
