<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use App\Http\Services\Api\V1\ProfileCardGeneratorService;

class ProfileCard extends Controller
{
    public function generateProfileCard(): JsonResponse
    {
        $data = [
            'name' => 'Иван Иванов',
            'role' => 'Разработчик',
            'email' => 'ivan@example.com',
            'imageUrl' => 'https://www.example.com/path/to/profile-image.jpg',
        ];

        $imagePath = (new ProfileCardGeneratorService)->generateProfileCard($data);

        return response()->json(['image_path' => $imagePath]);
    }
}





