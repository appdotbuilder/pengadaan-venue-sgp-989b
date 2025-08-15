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
        Schema::create('venues', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Venue name');
            $table->text('description')->nullable()->comment('Venue description');
            $table->text('address')->nullable()->comment('Venue address');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Venue status');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('name');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('venues');
    }
};