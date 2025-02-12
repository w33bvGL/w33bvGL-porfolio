<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GitHubController extends Controller
{
    public function getGitHubProfile(Request $request): JsonResponse
    {
        $username = congig('');

        $response = Http::get('https://api.github.com/users/w33bvGL');

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json([
            'error' => 'Не удалось получить данные с GitHub',
        ], 500);
    }
}
