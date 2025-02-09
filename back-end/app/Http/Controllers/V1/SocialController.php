<?php

namespace App\Http\Controllers\V1;

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

    public function index(Request $request): SocialCollection
    {
        $languageId = $request->input('languageId');

        $socials = $this->socialService->getAllSocials($languageId);

        return new SocialCollection($socials);
    }
}
