<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    /**
     *  @var list<string>
     */
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

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'code' => 'string',
        'name' => 'string',
        'iso' => 'string',
        'locale' => 'string',
        'region' => 'string',
        'is_default' => 'boolean',
        'is_active' => 'boolean',
        'direction' => 'string',
        'native_name' => 'string',
        'priority' => 'integer',
    ];
}
