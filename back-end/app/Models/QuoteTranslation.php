<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuoteTranslation extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'quote',
        'author',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'quote' => 'string',
        'author' => 'string',
    ];

    /** @return BelongsTo<Quote, $this> */
    public function quote(): BelongsTo
    {
        return $this->belongsTo(Quote::class, 'quote_id');
    }

    /** @return BelongsTo<Language, $this> */
    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class, 'language_id');
    }
}
