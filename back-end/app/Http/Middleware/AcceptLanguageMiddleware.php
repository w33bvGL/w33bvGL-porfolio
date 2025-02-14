<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\Language;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
class AcceptLanguageMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $acceptLanguage = $request->header('Accept-Language');

        if (empty($acceptLanguage)) {
            return response()->json([
                'message' => __('acceptLanguageMiddleware.header_required'),
            ], 400);
        }

        App::setLocale($acceptLanguage);

        $supportedLanguages = Language::pluck('code')->toArray();

        if (! in_array($acceptLanguage, $supportedLanguages)) {
            return response()->json([
                'ok' => false,
                'message' => __('acceptLanguageMiddleware.invalid_language', ['languages' => implode(', ', $supportedLanguages)]),
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }

        $languageCode = Cache::remember('language_'.$acceptLanguage, 10000, function () use ($acceptLanguage) {
            return Language::where('code', $acceptLanguage)->value('id');
        });

        $languageCode = (int) $languageCode;

        $request->merge(['locale' => $acceptLanguage, 'languageId' => $languageCode]);

        return $next($request);
    }
}
