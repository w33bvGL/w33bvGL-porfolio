<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Models\Social;
use Illuminate\Database\Eloquent\Collection;

class SocialService
{
    public function getAllSocials(int $languageId): Collection|array
    {
        return Social::with(['translations' => function ($query) use ($languageId) {
            $query->where('language_id', $languageId);
        }])->get();
    }
}
