<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'iso',
        'locale',
        'region',
        'is_default',
        'is_active',
        'direction',
        'native_name',
        'priority',
    ];

    protected $casts = [
        'is_default' => 'boolean',
        'is_active' => 'boolean',
        'priority' => 'integer',
        'region' => 'string',
        'emoji' => 'string',
        'flag_url' => 'string',
        'direction' => 'string',
        'native_name' => 'string',
    ];
}
