<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\TelegramContactFormRequest;
use App\Http\Services\Api\V1\TelegramService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class TelegramContactFormController extends Controller
{
    private TelegramService $telegramService;

    public function __construct(TelegramService $telegramService)
    {
        $this->telegramService = $telegramService;
    }

    public function send(TelegramContactFormRequest $request): JsonResponse
    {
        $data = $request->validated();

        $ipAddress = $request->ip();
        $userAgent = $request->userAgent();
        $locale    = $request->getPreferredLanguage();

        $text = "📩 Новая заявка с сайта\n\n".
            "👤 Имя: {$data['name']}\n".
            "📧 Email: {$data['email']}\n".
            "🌍 IP Адрес: {$ipAddress}\n".
            "🌐 Язык: {$locale}\n".
            "🖥️ User-Agent: {$userAgent}\n".
            "💬 Сообщение: {$data['message']}\n";

        if (! $this->telegramService->sendMessage($text)) {
            return response()->json(['ok' => false, 'message' => __('telegramContractFormController.message_sent_failed')], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['ok' => true, 'message' => __('telegramContractFormController.message_sent_success')]);
    }
}
