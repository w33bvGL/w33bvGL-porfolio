<script setup lang="ts">
import { useI18n } from '#i18n';
const { t, locale } = useI18n();

interface FooterMessageData {
    id: number;
    slug: string;
    translations: {
        [key: string]: string;
    };
}

const { data: footerMessageData } = await useAsyncData<FooterMessageData>(
    'messages-random',
    () =>
        $fetch('/api/footer/messages/random', {
            method: 'GET',
            headers: { 'Accept-Language': locale.value },
        }),
);

interface QuoteData {
    id: number;
    slug: string;
    translations: {
        [key: string]: {
            author: string;
            quote: string;
        };
    };
}

const { data: footerQuoteData } = await useAsyncData<QuoteData>(
    'quote-random',
    () =>
        $fetch('/api/quote/random', {
            method: 'GET',
            headers: { 'Accept-Language': locale.value },
        }),
);
</script>

<template>
    <div class="my-6">
        <div class="flex justify-between items-center">
            <p class="text-sm">
                &copy; 2022 - {{ new Date().getFullYear() }} Vahe Sargsyan.
                {{
                    footerMessageData?.translations[locale.valueOf()] ||
                    footerMessageData?.translations.en
                }}
            </p>
            <div class="italic text-sm text-gray-500">
                <p>
                    {{
                        footerQuoteData?.translations[locale.valueOf()]
                            ?.quote || footerQuoteData?.translations.en?.quote
                    }}
                    -
                    {{
                        footerQuoteData?.translations[locale.valueOf()]
                            ?.author || footerQuoteData?.translations.en?.author
                    }}
                </p>
            </div>
        </div>
    </div>
</template>
