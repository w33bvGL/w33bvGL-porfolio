<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Social;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\URL;

class SocialSeeder extends Seeder
{
    /**
     * Запуск сидера.
     */
    public function run(): void
    {
        $socials = [
            [
                'native_name' => 'Facebook',
                'icon' => URL::to('/storage/social/facebook.svg'),
                'link' => 'https://www.facebook.com/profile.php?id=61551120939139',
                'translations' => [
                    'ru' => 'Фейсбук',
                    'hy' => 'Ֆեյսբուք',
                    'en' => 'Facebook',
                ],
            ],
            [
                'native_name' => 'YouTube',
                'icon' => URL::to('/storage/social/youtube.svg'),
                'link' => 'https://www.youtube.com/@ota-ku_official',
                'translations' => [
                    'ru' => 'Ютуб',
                    'hy' => 'Յութուբ',
                    'en' => 'YouTube',
                ],
            ],
            [
                'native_name' => 'Telegram',
                'icon' => URL::to('/storage/social/telegram.svg'),
                'link' => 'https://t.me/Vahesargsyan2005',
                'translations' => [
                    'ru' => 'Телеграм',
                    'hy' => 'Տելեգրամ',
                    'en' => 'Telegram',
                ],
            ],
            [
                'native_name' => 'Github',
                'icon' => URL::to('/storage/social/github.svg'),
                'link' => 'https://github.com/w33bvGL',
                'translations' => [
                    'ru' => 'Гитхаб',
                    'hy' => 'Գիտհաբ',
                    'en' => 'Github',
                ],
            ],
            [
                'native_name' => 'Gmail',
                'icon' => URL::to('/storage/social/gmail.svg'),
                'link' => 'mailto:w33bv.gl@gmail.com',
                'translations' => [
                    'ru' => 'Эл. почта',
                    'hy' => 'Էլ․ հասցե',
                    'en' => 'email',
                ],
            ],
            [
                'native_name' => 'Telephone',
                'icon' => URL::to('/storage/social/tel.svg'),
                'link' => 'tel:+374(94)161-331',
                'translations' => [
                    'ru' => 'Телефон',
                    'hy' => 'Հեռախոսահամար',
                    'en' => 'Telephone',
                ],
            ],
        ];

        foreach ($socials as $socialData) {
            $social = Social::updateOrCreate(
                ['native_name' => $socialData['native_name']],
                [
                    'icon' => $socialData['icon'],
                    'link' => $socialData['link'],
                ]
            );

            foreach ($socialData['translations'] as $langCode => $translation) {
                $language = Language::where('code', $langCode)->first();

                if ($language) {
                    $social->translations()->updateOrCreate(
                        ['language_id' => $language->id],
                        ['name' => $translation]
                    );
                }
            }
        }
    }
}
