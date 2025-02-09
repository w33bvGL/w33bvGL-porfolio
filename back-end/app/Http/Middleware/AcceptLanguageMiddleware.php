<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Language;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;

class AcceptLanguageMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $acceptLanguage = $request->header('Accept-Language');
        App::setLocale($acceptLanguage);

        if (empty($acceptLanguage)) {
            return response()->json([
                'message' => __('acceptLanguageMiddleware.header_required'),
            ], 400);
        }

        $supportedLanguages = Language::pluck('code')->toArray();

        if (! in_array($acceptLanguage, $supportedLanguages)) {
            return response()->json([
                'message' => __('acceptLanguageMiddleware.invalid_language', ['languages' => implode(', ', $supportedLanguages)]),
            ], 400);
        }

        $languageCode = Cache::remember('language_'.$acceptLanguage, 10000, function () use ($acceptLanguage) {
            return Language::where('code', $acceptLanguage)->pluck('id')->first();
        });

        $languageCode = (int) $languageCode;

        $request->merge(['locale' => $acceptLanguage, 'languageId' => $languageCode]);

        return $next($request);
    }
}
