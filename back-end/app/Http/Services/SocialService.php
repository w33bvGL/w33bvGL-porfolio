<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Models\Language;
use App\Models\Social;
use Illuminate\Database\Eloquent\Collection;

class SocialService
{
    public function getAllSocials(int $languageId): Collection|array
    {
        $language = Language::find($languageId);

        if (! $language) {
            return [];
        }

        return Social::with(['translations' => function ($query) use ($language) {
            $query->where('language_id', $language->id);
        }])->get();
    }
}
