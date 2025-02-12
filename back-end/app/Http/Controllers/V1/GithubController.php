<?php

declare(strict_types=1);

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class GithubController extends Controller
{
    public function profile(): JsonResponse
    {
        $baseUrl      = config('github.base_url');
        $username     = config('github.github_username');

        $response = Http::get($baseUrl.'/users/'.$username);

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json([
            'error' => __('githubController.failed_to_fetch_data'),
        ], 500);
    }

    public function languages(): JsonResponse
    {
        $cacheKey = 'github_languages';
        $cacheTime = 93600;

        return Cache::remember($cacheKey, $cacheTime, function () {
            $baseUrl  = config('github.base_url');
            $username = config('github.github_username');

            $reposResponse = Http::get($baseUrl.'/users/'.$username.'/repos');

            if (! $reposResponse->successful()) {
                return response()->json([
                    'error' => __('githubController.failed_to_fetch_repos'),
                ], 500);
            }

            $repos        = $reposResponse->json();
            $languageData = [];

            foreach ($repos as $repo) {
                $languagesResponse = Http::get($baseUrl.'/repos/'.$username.'/'.$repo['name'].'/languages');

                if ($languagesResponse->successful()) {
                    $languages = $languagesResponse->json();

                    foreach ($languages as $language => $bytes) {
                        $languageData[$language] = ($languageData[$language] ?? 0) + $bytes;
                    }
                }
            }

            if (empty($languageData)) {
                return response()->json([
                    'error' => __('githubController.no_language_data'),
                ], 500);
            }

            $totalBytes = array_sum($languageData);

            $languagePercentage = array_map(function ($bytes) use ($totalBytes) {
                return round(($bytes / $totalBytes) * 100, 2);
            }, $languageData);

            arsort($languagePercentage);

            return response()->json($languagePercentage);
        });
    }
}
