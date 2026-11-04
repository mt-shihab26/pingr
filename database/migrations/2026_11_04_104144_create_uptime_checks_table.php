<?php

use App\Enums\UptimeCheckStatus;
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
        Schema::create('uptime_checks', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('uptime_id')->constrained()->cascadeOnDelete();

            $table->string('status')->default(UptimeCheckStatus::Up->value);
            $table->string('location');
            $table->unsignedSmallInteger('status_code')->nullable();
            $table->unsignedInteger('response_time')->nullable();
            $table->text('error')->nullable();
            $table->timestamp('checked_at');

            $table->timestamps();

            $table->index(['uptime_id', 'checked_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uptime_checks');
    }
};
