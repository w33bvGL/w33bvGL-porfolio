<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Quote;
use App\Models\QuoteTranslation;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int        $id
 * @property string     $slug
 * @property string     $author
 * @property string     $quote
 * @property Collection<int, Quote> $translations
 */
class QuoteResource extends JsonResource
{
    /**
     * @var Collection<int, Quote>
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
        /** @var Collection<int, QuoteTranslation> $translations */
        $translations = $this->translations;

        $translations = $translations->keyBy('language.code')->map(
            static function (QuoteTranslation $translation): array {
                return [
                    'author' => $translation->author,
                    'quote'  => $translation->quote,
                ];
            }
        );

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'translations' => $translations,
        ];
    }
}
