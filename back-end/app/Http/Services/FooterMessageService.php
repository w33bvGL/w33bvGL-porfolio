<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Models\FooterMessage;
use Illuminate\Database\Eloquent\Collection;

class FooterMessageService
{
    /**
     * Получить все переводы для сообщений
     *
     * @return Collection<int, FooterMessage>
     */
    public function getRandomMessage(): Collection
    {
        return FooterMessage::inRandomOrder()->limit(1)->get();
    }
}
