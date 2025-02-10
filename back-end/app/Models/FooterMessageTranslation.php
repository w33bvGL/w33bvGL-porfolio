<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FooterMessageTranslation extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'message',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'message'=> 'string',
    ];

   /** @return BelongsTo<FooterMessage, $this> */
    public function footerMessage(): BelongsTo
    {
        return $this->belongsTo(FooterMessage::class, 'footer_messages_id');
    }

    /** @return BelongsTo<Language, $this> */
    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class, 'language_id');
    }
}
