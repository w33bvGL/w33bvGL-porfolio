<?php

declare(strict_types=1);

use App\Http\Controllers\V1\SocialController;
use App\Http\Controllers\V1\TelegramContactFormController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\FooterMessageController;

Route::prefix('v1')->group(function () {
    Route::prefix('contact')->group(function () {
        Route::post('send', [TelegramContactFormController::class, 'send']);
    });

    Route::prefix('social')->group(function () {
        Route::get('', [SocialController::class, 'index']);
    });

    Route::prefix('footer')->group(function () {
        Route::prefix('message')->group(function () {
            Route::get('random', [FooterMessageController::class, 'random']);
        });
    });
});
