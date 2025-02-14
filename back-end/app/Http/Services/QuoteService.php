<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Models\Quote;
use Illuminate\Database\Eloquent\Collection;

class QuoteService
{
    /**
     * @return Collection<int, Quote>
     */
    public function getRandomQuote(): Collection
    {
        return Quote::inRandomOrder()->limit(1)->get();
    }
}
