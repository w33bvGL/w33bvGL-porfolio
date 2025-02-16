<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;

class ProfileCard extends Controller
{
    public function generateProfileCard(Request $request): JsonResponse
    {
        $name = "vahe";
        $position = "developer";
        $backgroundColor = '#3498db';
        $textColor = '#ffffff';

        $width = 400;
        $height = 200;
        $image = imagecreatetruecolor($width, $height);

        // Устанавливаем фоновый цвет
        $bgColor = imagecolorallocate($image, hexdec(substr($backgroundColor, 1, 2)), hexdec(substr($backgroundColor, 3, 2)), hexdec(substr($backgroundColor, 5, 2)));
        imagefill($image, 0, 0, $bgColor);

        // Создаем белый цвет для среза
        $whiteColor = imagecolorallocate($image, 255, 255, 255);

        // Указываем координаты для среза
        $sliceWidth = 100; // Ширина среза
        $sliceHeight = $height; // Высота среза равна высоте изображения

        // Точки среза
        $points = [
            0, 0, // Верхний левый угол
            $sliceWidth, 0, // Верхний правый угол
            $sliceWidth, $sliceHeight, // Нижний правый угол
        ];

        // Отображаем срез
        imagefilledpolygon($image, $points, 3, $whiteColor);

        // Генерация QR-кода
        $qrCode = new QrCode('https://t.me/your_telegram_link'); // Укажите ссылку на ваш Telegram
        $qrCode->setSize(60); // Размер QR-кода
        $writer = new PngWriter();
        $qrData = $writer->writeString($qrCode); // Генерация изображения QR-кода

        // Сохраняем QR-код в файл
        $qrPath = storage_path('app/public/qr_code.png');
        file_put_contents($qrPath, $qrData);

        // Загружаем QR-код в изображение
        $qrImage = imagecreatefrompng($qrPath);
        imagecopy($image, $qrImage, 0, 0, 0, 0, 60, 60); // Помещаем QR-код в верхнюю часть

        // Цвет текста
        $textColor = imagecolorallocate($image, hexdec(substr($textColor, 1, 2)), hexdec(substr($textColor, 3, 2)), hexdec(substr($textColor, 5, 2)));

        // Добавляем текст
        $font = 5;
        imagestring($image, $font, 10 + $sliceWidth, 10, "Name: $name", $textColor);
        imagestring($image, $font, 10 + $sliceWidth, 40, "Position: $position", $textColor);

        // Сохраняем изображение
        $filePath = 'profile_cards/' . uniqid('profile_card_') . '.png';
        imagepng($image, storage_path("app/public/{$filePath}"));
        imagedestroy($image);
        imagedestroy($qrImage);

        // URL изображения
        $imageUrl = url("storage/{$filePath}");

        return response()->json([
            'message' => 'Profile card created successfully',
            'image_url' => $imageUrl
        ]);
    }
}





