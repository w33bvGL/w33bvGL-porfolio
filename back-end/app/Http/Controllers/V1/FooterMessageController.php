<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Services\FooterMessageService;
use App\Http\Resources\FooterMessageResource;

class FooterMessageController extends Controller
{
    protected FooterMessageService $footerMessageService;

    public function __construct(FooterMessageService $footerMessageService)
    {
        $this->footerMessageService = $footerMessageService;
    }

    public function random(Request $request): JsonResponse
    {
        $languageId = $request->input('languageId');

        $message = $this->footerMessageService->getRandomMessage($languageId)->first();

        return response()->json(new FooterMessageResource($message));
    }
}
