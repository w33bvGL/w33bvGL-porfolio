<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int    $id
 * @property string $native_name
 * @property string $icon
 * @property string $link
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
        $languageCode = $request->input('locale');

        $translation = $this->translations->where('language.code', $languageCode)->first();

        return [
            'id' => $this->id,
            'native_name' => $this->native_name,
            'name' => $translation ? $translation->name : $this->native_name,
            'icon' => $this->icon,
            'link' => $this->link,
        ];
    }
}

