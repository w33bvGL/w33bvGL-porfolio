<?php

declare(strict_types=1);

namespace App\Http\Services;

use Illuminate\Database\Eloquent\Collection;
use App\Models\FooterMessage;

class FooterMessageService
{
    /**
     * @return Collection<int, FooterMessage>
     */
    public function getRandomMessage(string $languageId): Collection
    {
        return FooterMessage::with(['translations' => function ($query) use ($languageId) {
            $query->where('language_id', $languageId);
        }])->inRandomOrder()->limit(1)->get();
    }
}

