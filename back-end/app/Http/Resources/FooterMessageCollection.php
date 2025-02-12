<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class FooterMessageCollection extends ResourceCollection
{
    /**
     * @return SocialResource[]
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($message) {
            return new FooterMessageResource($message);
        })->toArray();
    }
}
