<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Social extends Model
{
    use HasFactory;

    protected $fillable = ['icon', 'native_name', 'link'];

    protected $casts = [
        'icon' => 'string',
        'native_name' => 'string',
        'link' => 'string',
    ];

    public function translations(): HasMany
    {
        return $this->hasMany(SocialTranslation::class);
    }
}
