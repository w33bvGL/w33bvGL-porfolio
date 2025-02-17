<script setup lang="ts">
import { z } from 'zod';
import { useI18n } from '#i18n';
import { contactMessageCooldownStore } from '~/stores/contactMessageCooldownStore';
import { computed, ref, reactive } from 'vue';

const toast = useToast();
const timerStore = contactMessageCooldownStore();

const { t, locale } = useI18n();

const schema = z.object({
    name: z
        .string()
        .min(2, t('contact.validation.nameMinLength'))
        .max(50, t('contact.validation.nameMaxLength'))
        .regex(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, t('contact.validation.nameRegex')),
    email: z
        .string()
        .email(t('contact.validation.invalidEmail'))
        .max(100, t('contact.validation.emailMaxLength')),
    message: z
        .string()
        .min(100, t('contact.validation.messageMinLength'))
        .max(5000, t('contact.validation.messageMaxLength')),
});

let isLoading = ref(false);

const state = reactive({
    name: '',
    email: '',
    message: '',
});

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    let timeString = '';
    if (minutes > 0) {
        timeString += `${minutes}м `;
    }
    timeString += `${remainingSeconds}с`;

    return timeString;
};

const remainingTime = computed(() => timerStore.remainingTime);

const handleSubmit = async () => {
    try {
        if (timerStore.isCooldown) {
            alert(
                t('validation.cooldownMessage', { time: remainingTime.value }),
            );
            return;
        }

        isLoading.value = true;

        const res = await $fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Accept-Language': locale.value,
            },
            body: state,
        });

        if (res.ok) {
            toast.add({
                title: res.message,
            });
            timerStore.startCooldown();
        } else {
            toast.add({
                title: res.message,
            });
        }
    } catch (error) {
        toast.add({
            title: t('contact.form.sendingError') + error,
        });
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <UCard class="mt-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex flex-col">
                <h2
                    class="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left"
                >
                    {{ t('contact.title') }}
                </h2>
                <p
                    class="text-center md:text-left text-gray-600 dark:text-gray-400"
                >
                    {{ t('contact.description') }}
                </p>
                <ul class="mt-4 space-y-4">
                    <li>
                        <strong class="font-medium">Telegram:</strong>
                        <UButton
                            variant="link"
                            :padded="false"
                            to="https://t.me/Vahesargsyan2005"
                            >@Vahesargsyan2005</UButton
                        >
                    </li>
                    <li>
                        <strong class="font-medium"
                            >{{ t('contact.phone') }}:</strong
                        >
                        <UButton
                            variant="link"
                            :padded="false"
                            to="tel:+37494161331"
                            >+374(94) 161-331</UButton
                        >
                    </li>
                    <li>
                        <strong class="font-medium"
                            >{{ t('contact.email') }}:</strong
                        >
                        <UButton
                            variant="link"
                            :padded="false"
                            to="mailto:w33bv.gl@gmail.com"
                            >w33bv.gl@gmail.com</UButton
                        >
                    </li>
                </ul>
            </div>
            <div class="flex flex-col">
                <h2
                    class="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left"
                >
                    {{ t('contact.formTitle') }}
                </h2>
                <UForm
                    @submit.prevent="handleSubmit"
                    :schema="schema"
                    :state="state"
                >
                    <UFormGroup
                        :label="t('contact.form.nameLabel')"
                        name="name"
                        size="xl"
                    >
                        <UInput
                            v-model="state.name"
                            size="xl"
                            :placeholder="t('contact.form.namePlaceholder')"
                            required
                        />
                    </UFormGroup>
                    <UFormGroup
                        :label="t('contact.form.emailLabel')"
                        name="email"
                        class="mt-4"
                        size="xl"
                    >
                        <UInput
                            v-model="state.email"
                            size="xl"
                            :placeholder="t('contact.form.emailPlaceholder')"
                            required
                        />
                    </UFormGroup>
                    <UFormGroup
                        :label="t('contact.form.messageLabel')"
                        name="message"
                        class="mt-4"
                        size="xl"
                    >
                        <UTextarea
                            v-model="state.message"
                            size="xl"
                            :placeholder="t('contact.form.messagePlaceholder')"
                            required
                        />
                    </UFormGroup>
                    <UButton
                        block
                        :disabled="timerStore.isCooldown"
                        :loading="isLoading"
                        type="submit"
                        size="xl"
                        class="mt-4 px-8 bg-primary text-white rounded-xl hover:bg-primary-dark"
                        v-if="timerStore.remainingTime !== null"
                    >
                        {{
                            timerStore.isCooldown
                                ? t('contact.form.waitMessage', {
                                      time: formatTime(
                                          timerStore.remainingTime,
                                      ),
                                  })
                                : t('contact.form.submit')
                        }}
                    </UButton>
                </UForm>
            </div>
        </div>
    </UCard>
</template>
