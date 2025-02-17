<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\FooterMessage;
use App\Models\FooterMessageTranslation;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $message
 * @property string $slug
 * @property Collection<int, FooterMessage> $translations
 */
class FooterMessageResource extends JsonResource
{
    /**
     * @var Collection<int, FooterMessage>
     **/
    private Collection $translations;

    public function __construct($resource)
    {
        parent::__construct($resource);
        $this->translations = $this->resource->translations;
    }

    /**
     * @return array<string, mixed>
     **/
    public function toArray(Request $request): array
    {
        /** @var Collection<int, FooterMessageTranslation> $translations */
        $translations = $this->translations;

        $translations = $translations->keyBy('language.code')->map(
            static function (FooterMessageTranslation $translation): string {
                return $translation->message;
            }
        );

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'translations' => $translations,
        ];
    }
}
