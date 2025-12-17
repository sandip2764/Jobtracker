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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            
            // Foreign Key
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Foreign key to users table

            // Required Fields
            $table->string('company', 255)->notNull();
            $table->string('position', 255)->notNull();
            $table->date('applied_date')->notNull();

            // Job Details
            $table->text('job_url')->nullable();
            $table->string('location', 255)->nullable();
            
            // ENUMs and Defaults
            $table->enum('work_type', ['Remote', 'Hybrid', 'On-site'])->default('Remote');
            $table->enum('salary_type', ['Per Annum', 'Per Month', 'Per Hour'])->default('Per Annum');
            $table->enum('status', ['Applied', 'Interview', 'Offer', 'Rejected'])->default('Applied');
            $table->enum('source', ['LinkedIn', 'Naukri', 'Company Website', 'Referral', 'Other'])->default('LinkedIn');

            // Salary Details
            // DECIMAL(10, 2) ke liye 'decimal' function use karenge
            $table->decimal('salary_min', 10, 2)->nullable();
            $table->decimal('salary_max', 10, 2)->nullable();

            $table->text('job_description')->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index('user_id', 'idx_user_id');
            $table->index('status', 'idx_status');
            $table->index('applied_date', 'idx_applied_date');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
