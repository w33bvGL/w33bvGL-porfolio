<?php

declare(strict_types=1);

// app/Services/ProfileCardGeneratorService.php

namespace App\Http\Services\Api\V1;

use Intervention\Image\ImageManager;

class ProfileCardGeneratorService
{
    public function generateProfileCard($data): string
    {
        $html = view('profile_cards.profile_card', $data)->render();

        $outputPath = storage_path('app/public/profile_cards/'.uniqid('profile_card_', true).'.png');

        $this->generateImageWithWkhtmltoimage($html, $outputPath);

        return $outputPath;
    }

    private function generateImageWithWkhtmltoimage($html, $outputPath): void
    {
        $tempHtmlPath = storage_path('app/temp_profile_card.html');
        file_put_contents($tempHtmlPath, $html);

        $command = "wkhtmltoimage --width 1920 --height 1080 --quality 100 {$tempHtmlPath} {$outputPath}";

        $output = null;
        $returnVar = null;

        exec($command, $output, $returnVar);
        $this->generateResizedImages($outputPath);
        unlink($tempHtmlPath);
    }

    private function generateResizedImages($originalPath): void
    {
        $sizes = [
            'og-image-1280x720.png' => [1280, 720],
            'og-image-1024x576.png' => [1024, 576],
            'og-image-800x450.png' => [800, 450],
            'og-image-400x225.png' => [400, 225],
        ];

        $outputDir = public_path('og-image');
        if (! file_exists($outputDir)) {
            mkdir($outputDir, 0777, true);
        }

        foreach ($sizes as $filename => [$width, $height]) {
            $image = ImageManager::imagick()->read($originalPath);
            $image->resize($width, $height);
            $image->save($outputDir.'/'.$filename, 90);
        }
    }
}
