<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\FooterMessageResource;
use App\Http\Services\FooterMessageService;
use Illuminate\Http\JsonResponse;

class FooterMessageController extends Controller
{
    protected FooterMessageService $footerMessageService;

    public function __construct(FooterMessageService $footerMessageService)
    {
        $this->footerMessageService = $footerMessageService;
    }

    public function random(): JsonResponse
    {
        $message = $this->footerMessageService->getRandomMessage()->first();

        return response()->json(new FooterMessageResource($message));
    }
}
