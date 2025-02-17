<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\FooterMessage;
use App\Models\FooterMessageTranslation;
use App\Models\Language;
use Illuminate\Database\Seeder;

class FooterMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $messages = [
            [
                'slug' => 'all_rights_reserved',
                'translations' => [
                    'ru' => 'Все права защищены. 🚀',
                    'hy' => 'Բոլոր իրավունքները պաշտպանված են։ 🚀',
                    'en' => 'All rights reserved. 🚀',
                ],
            ],
            [
                'slug' => 'your_success_my_goal',
                'translations' => [
                    'ru' => 'Ваш успех — моя цель! 🌟',
                    'hy' => 'Ձեր հաջողությունը իմ նպատակն է! 🌟',
                    'en' => 'Your success is my goal! 🌟',
                ],
            ],
            [
                'slug' => 'made_with_love',
                'translations' => [
                    'ru' => 'Сделано с любовью! ❤️',
                    'hy' => 'Պատրաստված սիրով! ❤️',
                    'en' => 'Made with love! ❤️',
                ],
            ],
            [
                'slug' => 'coding_for_future',
                'translations' => [
                    'ru' => 'Кодим на будущее! 💻',
                    'hy' => 'Ծրագրավորում ենք ապագայի համար! 💻',
                    'en' => 'Coding for the future! 💻',
                ],
            ],
            [
                'slug' => 'keep_growing',
                'translations' => [
                    'ru' => 'Продолжаем развиваться! 🌱',
                    'hy' => 'Շարունակում ենք զարգանալ! 🌱',
                    'en' => 'Keep growing! 🌱',
                ],
            ],
            [
                'slug' => 'creating_together',
                'translations' => [
                    'ru' => 'Творим новое вместе! ✨',
                    'hy' => 'Ստեղծում ենք նորը միասին! ✨',
                    'en' => 'Creating new things together! ✨',
                ],
            ],
            [
                'slug' => 'reaching_new_heights',
                'translations' => [
                    'ru' => 'Достигаем высот! 🏔️',
                    'hy' => 'Հասնում ենք բարձունքների! 🏔️',
                    'en' => 'Reaching new heights! 🏔️',
                ],
            ],
            [
                'slug' => 'join_the_journey',
                'translations' => [
                    'ru' => 'Присоединяйтесь к путешествию! 🌍',
                    'hy' => 'Միացեք ճանապարհորդությանը! 🌍',
                    'en' => 'Join the journey! 🌍',
                ],
            ],
            [
                'slug' => 'stay_connected',
                'translations' => [
                    'ru' => 'Оставайтесь на связи! 📱',
                    'hy' => 'Մնացեք կապի մեջ! 📱',
                    'en' => 'Stay connected! 📱',
                ],
            ],
            [
                'slug' => 'no_bugs_just_features',
                'translations' => [
                    'ru' => 'Не баг, а фича! 🐞',
                    'hy' => 'Ոչ թե սխալ, այլ առանձնահատկություն! 🐞',
                    'en' => 'No bugs, just features! 🐞',
                ],
            ],
            [
                'slug' => 'code_or_die',
                'translations' => [
                    'ru' => 'Кодь или умри! 💀',
                    'hy' => 'Ծրագրիր կամ մեռիր! 💀',
                    'en' => 'Code or die! 💀',
                ],
            ],
            [
                'slug' => 'debugging_is_life',
                'translations' => [
                    'ru' => 'Отлаживаю, значит живу! 🛠️',
                    'hy' => 'Թեստավորում եմ, այսինքն ապրում եմ! 🛠️',
                    'en' => 'Debugging is life! 🛠️',
                ],
            ],
            [
                'slug' => 'commit_push_pray',
                'translations' => [
                    'ru' => 'Commit, push, молись! 🙏',
                    'hy' => 'Commit, push, աղոթիր! 🙏',
                    'en' => 'Commit, push, pray! 🙏',
                ],
            ],
            [
                'slug' => 'eat_sleep_code_repeat',
                'translations' => [
                    'ru' => 'Ем, сплю, кодю, повторяю! 🔁',
                    'hy' => 'Ուտում եմ, քնում եմ, ծրագրավորում եմ, կրկնում եմ! 🔁',
                    'en' => 'Eat, sleep, code, repeat! 🔁',
                ],
            ],
            [
                'slug' => 'hack_the_universe',
                'translations' => [
                    'ru' => 'Хакни вселенную! 🌌',
                    'hy' => 'Կոտրիր տիեզերքը! 🌌',
                    'en' => 'Hack the universe! 🌌',
                ],
            ],
            [
                'slug' => '404_no_sleep_found',
                'translations' => [
                    'ru' => '404: Сон не найден! 😵',
                    'hy' => '404: Քունը չի գտնվել! 😵',
                    'en' => '404: No sleep found! 😵',
                ],
            ],
            [
                'slug' => 'dont_touch_production',
                'translations' => [
                    'ru' => 'Не трогай продакшен! 🚨',
                    'hy' => 'Մի դիպչիր արտադրանքին! 🚨',
                    'en' => 'Don’t touch production! 🚨',
                ],
            ],
            [
                'slug' => 'deploy_and_pray',
                'translations' => [
                    'ru' => 'Деплой и молись! 🤲',
                    'hy' => 'Deploy արա ու աղոթիր! 🤲',
                    'en' => 'Deploy and pray! 🤲',
                ],
            ],
        ];
        foreach ($messages as $msg) {
            $footerMessage = FooterMessage::updateOrCreate(
                ['slug' => $msg['slug']],
                []
            );
            foreach ($msg['translations'] as $langCode => $translation) {
                $language = Language::where('code', $langCode)->first();
                if ($language) {
                    FooterMessageTranslation::updateOrCreate(
                        [
                            'footer_messages_id' => $footerMessage->id,
                            'language_id' => $language->id,
                        ],
                        [
                            'message' => $translation,
                        ]
                    );
                }
            }
        }
    }
}
