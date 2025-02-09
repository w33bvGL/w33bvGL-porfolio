<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TelegramContactFormController extends Controller
{
    public function send(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        $telegramToken = env('TELEGRAM_BOT_TOKEN');
        $chatId        = env('TELEGRAM_CHAT_ID');

        $text = "📩 Новая заявка с сайта\n\n".
            "👤 Имя: {$data['name']}\n".
            "📧 Email: {$data['email']}\n".
            "💬 Сообщение: {$data['message']}";

        $response = Http::post("https://api.telegram.org/bot{$telegramToken}/sendMessage", [
            'chat_id' => $chatId,
            'text' => $text,
            'parse_mode' => 'HTML',
        ]);

        if ($response->failed()) {
            return response()->json(['success' => false, 'message' => 'Не удалось отправить сообщение в Telegram.'], 500);
        }

        return response()->json(['success' => true, 'message' => 'Сообщение успешно отправлено!']);
    }
}
