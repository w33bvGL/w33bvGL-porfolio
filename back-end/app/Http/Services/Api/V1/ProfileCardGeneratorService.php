<?php

// app/Services/ProfileCardGeneratorService.php

namespace App\Http\Services\Api\V1;

use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\File;

class ProfileCardGeneratorService
{
    public function generateProfileCard($data): string
    {
        $html = view('profile_cards.profile_card', $data)->render();

        $outputPath = storage_path('app/public/profile_cards/' . uniqid('profile_card_', true) . '.png');

        $this->generateImageWithPuppeteer($html, $outputPath);

        return $outputPath;
    }

    private function generateImageWithPuppeteer($html, $outputPath): void
    {
        $nodeScript = base_path('scripts/generate-image.js');

        $command = "node {$nodeScript} '{$html}' '{$outputPath}'";

        exec($command);
    }
}
