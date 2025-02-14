<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\SocialCollection;
use App\Http\Services\SocialService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SocialController extends Controller
{
    protected SocialService $socialService;

    public function __construct(SocialService $socialService)
    {
        $this->socialService = $socialService;
    }

    public function index(Request $request): JsonResponse
    {
        $languageId = $request->input('languageId');

        $socials = $this->socialService->getAllSocials($languageId);

        return response()->json(new SocialCollection($socials), 200);
    }
}
