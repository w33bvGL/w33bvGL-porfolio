import { contactMessageCooldownStore } from '~/stores/contactMessageCooldownStore';

export default defineNuxtPlugin((nuxtApp) => {
    const timerStore = contactMessageCooldownStore();
    timerStore.initializeTimer();

    if (process.client) {
        timerStore.initializeCooldown();
    }
});
