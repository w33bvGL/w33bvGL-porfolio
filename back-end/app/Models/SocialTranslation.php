<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SocialTranslation extends Model
{
    protected $fillable = ['name'];

    protected $casts = [
        'name' => 'string',
    ];

    public function social(): BelongsTo
    {
        return $this->belongsTo(Social::class);
    }
}
