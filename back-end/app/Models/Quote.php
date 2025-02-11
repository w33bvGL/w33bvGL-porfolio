<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quote extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [

    ];

    /** @return HasMany<QuoteTranslation, $this> */
    public function translations(): HasMany
    {
        return $this->hasMany(QuoteTranslation::class, 'quote_id');
    }
}
