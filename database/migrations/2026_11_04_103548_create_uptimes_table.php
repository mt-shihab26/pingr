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
        Schema::create('uptimes', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('target_id')->unique()->constrained()->cascadeOnDelete();

            $table->string('method')->default('GET');
            $table->json('request_headers')->nullable();
            $table->text('payload')->nullable();
            $table->unsignedSmallInteger('timeout')->default(5);
            $table->boolean('follow_redirects')->default(true);
            $table->string('expected_status_codes')->default('2*');
            $table->string('verify_text')->nullable();
            $table->json('response_headers')->nullable();
            $table->json('body_assertions')->nullable();
            $table->string('location')->default('tokyo');
            $table->unsignedSmallInteger('frequency_value')->default(1);
            $table->string('frequency_unit')->default('minute');
            $table->unsignedSmallInteger('downtime_threshold')->default(2);
            $table->unsignedInteger('performance_threshold')->default(1000);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uptimes');
    }
};
