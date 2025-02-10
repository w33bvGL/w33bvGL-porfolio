<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FooterMessage extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [

    ];

    /** @return HasMany<FooterMessageTranslation, $this> */
    public function translations(): HasMany
    {
        return $this->hasMany(FooterMessageTranslation::class, 'footer_messages_id');
    }
}
