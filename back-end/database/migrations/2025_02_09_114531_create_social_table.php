<?php

declare(strict_types=1);

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
        Schema::create('socials', function (Blueprint $table) {
            $table->id()->comment('Social network ID');
            $table->string('native_name')->unique()->nullable(false)->comment('Native name of the social network');
            $table->string('icon')->unique()->nullable(false)->comment('Icon of the social network (URL)');
            $table->string('link')->unique()->nullable(false)->comment('Link to the social network');
            $table->timestamps();
        });

        Schema::create('social_translations', function (Blueprint $table) {
            $table->id()->comment('Social network translation ID');
            $table->unsignedBigInteger('social_id')->comment('ID of the social network');
            $table->unsignedBigInteger('language_id')->comment('ID of the language');
            $table->string('name', 100)->comment('Translated name of the social network');
            $table->timestamps();

            $table->foreign('social_id')->references('id')->on('socials')->onDelete('cascade');
            $table->foreign('language_id')->references('id')->on('languages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('social_translations');
        Schema::dropIfExists('socials');
    }
};
