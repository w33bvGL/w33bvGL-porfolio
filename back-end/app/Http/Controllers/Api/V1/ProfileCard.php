<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Services\Api\V1\ProfileCardGeneratorService;
use Illuminate\Http\JsonResponse;

class ProfileCard extends Controller
{
    public function generateProfileCard(): JsonResponse
    {
        $data = [
            'name' => 'Vahe Sargsyan',
            'role' => 'Full-stack Engineer',
            'email' => 'w33bv.gl@gmail.com',
            'imageUrl' => 'https://avatars.githubusercontent.com/u/140258231?v=4',
        ];

        $imagePath = (new ProfileCardGeneratorService)->generateProfileCard($data);

        return response()->json(['image_path' => $imagePath]);
    }
}
