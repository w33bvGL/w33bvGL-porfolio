<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class GithubController extends Controller
{
    public function getGitHubProfile(): JsonResponse
    {
        $baseUrl      = config('github.base_url');
        $username = config('github.github_username');

        $response = Http::get($baseUrl . "/users/" . $username);

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json([
            'error' => __('githubController.failed_to_fetch_data'),
        ], 500);
    }
}
