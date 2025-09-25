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
        Schema::create('high_scores', function (Blueprint $table) {
            $table->id();
            $table->string('player_name', 50);
            $table->integer('score')->unsigned();
            $table->timestamps();
            
            // Index for faster queries on score ordering
            $table->index(['score', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('high_scores');
    }
};
