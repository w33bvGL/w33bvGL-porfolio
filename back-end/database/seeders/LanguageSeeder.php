<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
            [
                'code' => 'en',
                'name' => 'English',
                'iso' => 'ENG',
                'locale' => 'en_US',
                'region' => 'US',
                'emoji' => '🇺🇸',
                'flag_url' => 'https://flagcdn.com/w320/us.png',
                'is_default' => true,
                'is_active' => true,
                'direction' => 'ltr',
                'native_name' => 'English',
                'priority' => 1,
            ],
            [
                'code' => 'hy',
                'name' => 'Armenian',
                'iso' => 'ARM',
                'locale' => 'hy_AM',
                'region' => 'AM',
                'emoji' => '🇦🇲',
                'flag_url' => 'https://flagcdn.com/w320/am.png',
                'is_default' => false,
                'is_active' => true,
                'direction' => 'ltr',
                'native_name' => 'Հայերեն',
                'priority' => 2,
            ],
            [
                'code' => 'ru',
                'name' => 'Russian',
                'iso' => 'RUS',
                'locale' => 'ru_RU',
                'region' => 'RU',
                'emoji' => '🇷🇺',
                'flag_url' => 'https://flagcdn.com/w320/ru.png',
                'is_default' => false,
                'is_active' => true,
                'direction' => 'ltr',
                'native_name' => 'Русский',
                'priority' => 3,
            ],
        ];

        foreach ($languages as $language) {
            Language::updateOrCreate(
                ['code' => $language['code']],
                $language
            );
        }
    }
}
