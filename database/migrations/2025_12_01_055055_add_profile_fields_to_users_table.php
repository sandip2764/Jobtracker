<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 20)->nullable()->after('avatar');
            $table->string('location')->nullable()->after('phone');
            $table->string('current_role')->nullable()->after('location');
            $table->string('experience', 50)->nullable()->after('current_role');
            $table->text('bio')->nullable()->after('experience');
            $table->string('portfolio_url')->nullable()->after('bio');
            $table->string('github_url')->nullable()->after('portfolio_url');
            $table->string('linkedin_url')->nullable()->after('github_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone', 
                'location', 
                'current_role', 
                'experience', 
                'bio', 
                'portfolio_url', 
                'github_url', 
                'linkedin_url'
            ]);
        });
    }
};
