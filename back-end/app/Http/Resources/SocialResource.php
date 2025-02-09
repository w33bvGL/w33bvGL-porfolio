<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int    $id
 * @property string $native_name
 */
class SocialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'native_name' => $this->native_name,
            'icon' => $this->icon,
            'link' => $this->link,
            'translations' => $this->translations->pluck('name', 'language.code')->toArray(),
        ];
    }
}

