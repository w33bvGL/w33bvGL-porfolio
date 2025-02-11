<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int    $id
 * @property string $native_message
 * @property \Illuminate\Database\Eloquent\Collection $translations
 */
class FooterMessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $languageCode = $request->input('locale');
        $translations = collect($this->translations);
        $translation  = $translations->where('language.code', $languageCode)->first();

        return [
            'id' => $this->id,
            'message' => $translation ? $translation->message : $this->native_message,
        ];
    }
}

