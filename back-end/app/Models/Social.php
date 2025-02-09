<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $name
 * @property string $native_name
 * @property string $link
 */
class Social extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'icon',
        'native_name',
        'link'
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'icon' => 'string',
        'native_name' => 'string',
        'link' => 'string',
    ];

    /** @return HasMany<SocialTranslation, $this> */
    public function translations(): HasMany
    {
        return $this->hasMany(SocialTranslation::class);
    }
}
