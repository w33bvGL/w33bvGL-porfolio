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
        Schema::create('footer_messages', function (Blueprint $table) {
            $table->id()->comment('Footer message entry ID');
            $table->timestamps();
        });

        Schema::create('footer_message_translations', function (Blueprint $table) {
            $table->id()->comment('Footer message translation ID');
            $table->unsignedBigInteger('footer_messages_id')->comment('Footer message ID');
            $table->unsignedBigInteger('language_id')->comment('Language ID');
            $table->string('message', 100)->comment('Footer message text');
            $table->timestamps();

            $table->foreign('footer_messages_id')->references('id')->on('footer_messages')->onDelete('cascade');
            $table->foreign('language_id')->references('id')->on('languages')->onDelete('cascade');
        });

        Schema::create('quotes', function (Blueprint $table) {
            $table->id()->comment('Quote record ID');
            $table->timestamps();
        });

        Schema::create('quote_translations', function (Blueprint $table) {
            $table->id()->comment('Quote translation ID');
            $table->unsignedBigInteger('quote_id')->comment('Quote ID');
            $table->unsignedBigInteger('language_id')->comment('Language ID');
            $table->string('quote', 255)->comment('Quote text');
            $table->string('author', 50)->comment('Quote author');
            $table->timestamps();

            $table->foreign('quote_id')->references('id')->on('quotes')->onDelete('cascade');
            $table->foreign('language_id')->references('id')->on('languages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quote_translations');
        Schema::dropIfExists('quotes');
        Schema::dropIfExists('footer_message_translations');
        Schema::dropIfExists('footer_messages');
    }
};
