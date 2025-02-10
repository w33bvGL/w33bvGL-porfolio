<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SocialTranslation extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = ['name'];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'name' => 'string',
    ];

    /** @return BelongsTo<Social, $this> */
    public function social(): BelongsTo
    {
        return $this->belongsTo(Social::class);
    }

    /** @return BelongsTo<Language, $this> */
    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }
}
