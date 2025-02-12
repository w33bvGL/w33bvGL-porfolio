<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuoteResource;
use App\Http\Services\QuoteService;
use Illuminate\Http\JsonResponse;

class QuoteController extends Controller
{
     protected QuoteService $quoteService;

    public function __construct(QuoteService $quoteService)
    {
        $this->quoteService = $quoteService;
    }

    public function random(): JsonResponse
    {
        $message = $this->quoteService->getRandomQuote()->first();

        return response()->json(new QuoteResource($message));
    }
}
