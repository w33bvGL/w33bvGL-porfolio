<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Quote;
use App\Models\QuoteTranslation;
use App\Models\Language;
use Illuminate\Database\Seeder;

class FooterQuoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quotes = [
            [
                'slug' => 'richard_hamming',
                'translations' => [
                    'ru' => [
                        'quote' => 'Существует два типа людей: те, кто решает проблему, и те, кто жалуется на нее.',
                        'author' => 'Ричард Хэмминг'
                    ],
                    'hy' => [
                        'quote' => 'Որոշ մարդիկ լուծում են խնդիրը, իսկ որոշ մարդիկ բողոքում են դրա մասին։',
                        'author' => 'Ռիչարդ Համմինգ'
                    ],
                    'en' => [
                        'quote' => 'There are two types of people: those who solve the problem, and those who complain about it.',
                        'author' => 'Richard Hamming'
                    ],
                ],
            ],
            [
                'slug' => 'torvalds_code',
                'translations' => [
                    'ru' => [
                        'quote' => 'Я не боюсь говорить, что я лучший программист, потому что я точно знаю, что я лучший программист.',
                        'author' => 'Линус Торвальдс'
                    ],
                    'hy' => [
                        'quote' => 'Ես չեմ վախենում ասել, որ ես լավագույն ծրագրավորողն եմ, որովհետև ես ճիշտ գիտեմ, որ ես լավագույն ծրագրավորողն եմ։',
                        'author' => 'Լինուս Տորվալդս'
                    ],
                    'en' => [
                        'quote' => 'I’m not afraid to say I’m the best programmer, because I know for sure I’m the best programmer.',
                        'author' => 'Linus Torvalds'
                    ],
                ],
            ],
            [
                'slug' => 'aristotle_education',
                'translations' => [
                    'ru' => [
                        'quote' => 'Образование — это зажигание пламени, а не наполнение сосуда.',
                        'author' => 'Аристотель'
                    ],
                    'hy' => [
                        'quote' => 'Կրթությունը կրակի վառումն է, ոչ թե տարայի լցվելը։',
                        'author' => 'Արիստոտել'
                    ],
                    'en' => [
                        'quote' => 'Education is the lighting of a fire, not the filling of a vessel.',
                        'author' => 'Aristotle'
                    ],
                ],
            ],
            [
                'slug' => 'php_js_worst',
                'translations' => [
                    'ru' => [
                        'quote' => 'PHP – это худшее, что случалось с веб-разработкой, после JavaScript.',
                        'author' => 'Джейми Завински'
                    ],
                    'hy' => [
                        'quote' => 'PHP-ն ամենավատն է, ինչ տեղի է ունեցել վեբ ծրագրավորման հետ, JavaScript-ից հետո։',
                        'author' => 'Ջեյմի Զավինսկի'
                    ],
                    'en' => [
                        'quote' => 'PHP is the worst thing that happened to web development after JavaScript.',
                        'author' => 'Jamie Zawinski'
                    ],
                ],
            ],
            [
                'slug' => 'einstein_insanity',
                'translations' => [
                    'ru' => [
                        'quote' => 'Безумие — это повторять одно и то же действие, ожидая другого результата.',
                        'author' => 'Альберт Эйнштейн'
                    ],
                    'hy' => [
                        'quote' => 'Խելագարությունը նույն գործողությունը կրկնելն է՝ սպասելով տարբեր արդյունքի։',
                        'author' => 'Ալբերտ Էյնշտեյն'
                    ],
                    'en' => [
                        'quote' => 'Insanity is doing the same thing over and over again and expecting different results.',
                        'author' => 'Albert Einstein'
                    ],
                ],
            ],
            [
                'slug' => 'einstein_insanity',
                'translations' => [
                    'ru' => [
                        'quote' => 'Безумие — это повторять одно и то же действие, ожидая другого результата.',
                        'author' => 'Альберт Эйнштейн'
                    ],
                    'hy' => [
                        'quote' => 'Խելագարությունը նույն գործողությունը կրկնելն է՝ սպասելով տարբեր արդյունքի։',
                        'author' => 'Ալբերտ Էյնշտեյն'
                    ],
                    'en' => [
                        'quote' => 'Insanity is doing the same thing over and over again and expecting different results.',
                        'author' => 'Albert Einstein'
                    ],
                ],
            ],
            [
                'slug' => 'gates_lazy_dev',
                'translations' => [
                    'ru' => [
                        'quote' => 'Я выбираю ленивого человека для сложной работы. Он найдёт лёгкий путь её выполнить.',
                        'author' => 'Билл Гейтс'
                    ],
                    'hy' => [
                        'quote' => 'Ես բարդ աշխատանքների համար ծույլ մարդ եմ ընտրում։ Նա հեշտ լուծում կգտնի։',
                        'author' => 'Բիլ Գեյթս'
                    ],
                    'en' => [
                        'quote' => 'I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.',
                        'author' => 'Bill Gates'
                    ],
                ],
            ],
            [
                'slug' => 'john_carmack_quotes',
                'translations' => [
                    'ru' => [
                        'quote' => 'Лучший способ предсказать будущее — это создать его.',
                        'author' => 'Джон Кармак'
                    ],
                    'hy' => [
                        'quote' => 'Լավագույնն այն է, որ մենք կանխատեսենք ապագան՝ այն ստեղծելով։',
                        'author' => 'Ջոն Կարմաք'
                    ],
                    'en' => [
                        'quote' => 'The best way to predict the future is to create it.',
                        'author' => 'John Carmack'
                    ],
                ],
            ],
            [
                'slug' => 'programming_art',
                'translations' => [
                    'ru' => [
                        'quote' => 'Программирование — это искусство, если ты делаешь это с любовью и страстью.',
                        'author' => 'Джон Кармак'
                    ],
                    'hy' => [
                        'quote' => 'Ծրագրավորումը արվեստ է, եթե դու անում ես դա սիրով և կրքով։',
                        'author' => 'Ջոն Կարմաք'
                    ],
                    'en' => [
                        'quote' => 'Programming is an art if you do it with love and passion.',
                        'author' => 'John Carmack'
                    ],
                ],
            ],
            [
                'slug' => 'alan_turing_quotes',
                'translations' => [
                    'ru' => [
                        'quote' => 'Каждая хорошая программа — это, в первую очередь, хорошо спроектированная структура.',
                        'author' => 'Алан Тьюринг'
                    ],
                    'hy' => [
                        'quote' => 'Յուրաքանչյուր լավ ծրագիր առաջին հերթին լավ նախագծված կառուցվածք է։',
                        'author' => 'Ալան Թյուրինգ'
                    ],
                    'en' => [
                        'quote' => 'Every good program is, first and foremost, a well-designed structure.',
                        'author' => 'Alan Turing'
                    ],
                ],
            ],
            [
                'slug' => 'chuck_norris_quotes',
                'translations' => [
                    'ru' => [
                        'quote' => 'Чак Норрис не пишет код. Он просто смотрит на него, и он становится правильным.',
                        'author' => 'Чак Норрис'
                    ],
                    'hy' => [
                        'quote' => 'Չաք Նորիսը չի գրում կոդ։ Նա պարզապես նայում է դրան, և այն դառնում է ճիշտ։',
                        'author' => 'Չաք Նորիս'
                    ],
                    'en' => [
                        'quote' => 'Chuck Norris doesn’t write code. He just looks at it, and it becomes correct.',
                        'author' => 'Chuck Norris'
                    ],
                ],
            ],
        ];

        foreach ($quotes as $quoteData) {
            $quote = Quote::updateOrCreate(
                ['slug' => $quoteData['slug']],
                []
            );

            foreach ($quoteData['translations'] as $langCode => $translation) {
                $language = Language::where('code', $langCode)->first();

                if ($language && !empty($translation)) {
                    QuoteTranslation::updateOrCreate(
                        [
                            'quote_id' => $quote->id,
                            'language_id' => $language->id,
                        ],
                        [
                            'quote' => $translation['quote'],
                            'author' => $translation['author'],
                        ]
                    );
                }
            }
        }
    }
}
