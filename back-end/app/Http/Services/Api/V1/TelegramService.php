<?php

declare(strict_types=1);

namespace App\Http\Services\Api\V1;

use Illuminate\Support\Facades\Http;

class TelegramService
{
    private string $token;

    private string $chatId;

    public function __construct()
    {
        $this->token  = config('telegram-bot.bot_token');
        $this->chatId = config('telegram-bot.chat_id');
    }

    public function sendMessage(string $text): bool
    {
        $response = Http::post("https://api.telegram.org/bot{$this->token}/sendMessage", [
            'chat_id' => $this->chatId,
            'text' => $text,
            'parse_mode' => 'HTML',
        ]);

        return $response->successful();
    }
}
