<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TrustHosts
{
	public function handle(Request $request, Closure $next)
	{
		$response = $next($request);

		$response->headers->set('Content-Security-Policy', "script-src 'self' 'unsafe-inline' http://localhost:5173; style-src 'self' 'unsafe-inline' http://localhost:5173;");

		return $response;
	}
}
