<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int    $id
 * @property string $native_message
 * @property Collection $translations
 */
class FooterMessageResource extends JsonResource
{
    /**
     * Преобразовать ресурс в массив.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $translations = $this->translations->keyBy('language.code')->map(function ($translation) {
            return $translation->message;
        });

        return [
            'id' => $this->id,
            'native_message' => $this->native_message,
            'translations' => $translations,
        ];
    }
}
