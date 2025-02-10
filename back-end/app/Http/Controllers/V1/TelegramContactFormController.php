<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class TelegramContactFormController extends Controller
{
    public function send(Request $request): JsonResponse
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email|max:255',
                'message' => 'required|string|min:100|max:5000',
            ]);

            $telegramToken = config('telegram-bot.bot_token');
            $chatId        = config('telegram-bot.chat_id');

            $ipAddress = $request->ip();
            $userAgent = $request->userAgent();
            $locale = $request->getPreferredLanguage();

            $text = "📩 Новая заявка с сайта\n\n".
                "👤 Имя: {$data['name']}\n".
                "📧 Email: {$data['email']}\n".
                "🌍 IP Адрес: {$ipAddress}\n".
                "🌐 Язык: {$locale}\n".
                "🖥️ User-Agent: {$userAgent}\n".
                "💬 Сообщение: {$data['message']}\n";

            $response = Http::post("https://api.telegram.org/bot{$telegramToken}/sendMessage", [
                'chat_id' => $chatId,
                'text' => $text,
                'parse_mode' => 'HTML',
            ]);

            if ($response->failed()) {
                return response()->json(['success' => false, 'message' => 'Не удалось отправить сообщение в Telegram.'], 500);
            }

            return response()->json(['success' => true, 'message' => 'Сообщение успешно отправлено!']);

        } catch (ValidationException $e) {
            return response()->json($e->errors(), 422);
        }
    }
}
