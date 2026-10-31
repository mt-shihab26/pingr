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
        Schema::create('targets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->string('type');
            $table->string('label')->nullable();
            $table->string('endpoint', 2048);
            $table->unsignedSmallInteger('ai_frequency_value')->nullable();
            $table->string('ai_frequency_unit')->nullable();
            $table->boolean('check_uptime')->default(false);
            $table->boolean('check_certificate_health')->default(false);
            $table->boolean('check_broken_links')->default(false);
            $table->boolean('check_mixed_content')->default(false);
            $table->boolean('check_lighthouse')->default(false);
            $table->boolean('check_scheduled_tasks')->default(false);
            $table->boolean('check_application_health')->default(false);
            $table->boolean('check_sitemap')->default(false);
            $table->boolean('check_dns')->default(false);
            $table->boolean('check_domain')->default(false);
            $table->boolean('check_dns_blocklist')->default(false);
            $table->boolean('check_open_ports')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('targets');
    }
};
