<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $slug
 * @property string $message
 */
class FooterMessage extends Model
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

    /** @return HasMany<FooterMessageTranslation, $this> */
    public function translations(): HasMany
    {
        return $this->hasMany(FooterMessageTranslation::class, 'footer_messages_id');
    }
}
