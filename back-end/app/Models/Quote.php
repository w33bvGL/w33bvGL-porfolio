<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
/**
 * @property string $quote
 * @property string $slug
 * @property string $author
 */
class Quote extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'slug'
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'slug' => 'string',
    ];

    /** @return HasMany<QuoteTranslation, $this> */
    public function translations(): HasMany
    {
        return $this->hasMany(QuoteTranslation::class, 'quote_id');
    }
}
