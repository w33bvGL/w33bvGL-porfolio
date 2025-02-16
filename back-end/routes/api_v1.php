<?php

declare(strict_types=1);

use App\Http\Controllers\Api\V1\FooterMessageController;
use App\Http\Controllers\Api\V1\GithubController;
use App\Http\Controllers\Api\V1\ProfileCard;
use App\Http\Controllers\Api\V1\QuoteController;
use App\Http\Controllers\Api\V1\SocialController;
use App\Http\Controllers\Api\V1\TelegramContactFormController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::prefix('user')->group(callback: function () {
        Route::prefix('github')->group(function () {
            Route::get('generateProfileCard', [GithubController::class, 'profile']);
            Route::get('languages', [GithubController::class, 'languages']);
        });

        Route::prefix('profile')->group(function () {
            Route::prefix('card')->group(function () {
                Route::get('', [ProfileCard::class, '']);
                Route::post('', [ProfileCard::class, 'generateProfileCard']);
            });
        });
    });

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

    Route::prefix('quote')->group(callback: function () {
        Route::get('random', [QuoteController::class, 'random']);
    });
});
