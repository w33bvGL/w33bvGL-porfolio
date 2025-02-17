import { defineStore } from 'pinia';
import { useCookie } from 'nuxt/app';

export const contactMessageCooldownStore = defineStore('timer', {
    state: () => ({
        remainingTime: 300,
        isCooldown: false,
    }),
    actions: {
        initializeTimer() {
            const remainingTimeCookie = useCookie('remainingTime');
            const isCooldownCookie = useCookie('isCooldown');

            if (isCooldownCookie.value && remainingTimeCookie.value) {
                this.remainingTime = parseInt(remainingTimeCookie.value);
                this.isCooldown = true;
            }
        },

        initializeCooldown() {
            if (!this.isCooldown) return;
            this.startInterval();
        },

        startCooldown() {
            this.setRemainingTime(300);
            this.startInterval();
        },

        resetTimer() {
            this.setRemainingTime(300);
            this.isCooldown = false;
            this.clearCookies();
        },

        setRemainingTime(time: number) {
            this.isCooldown = true;
            this.remainingTime = time;
            this.updateCookies();
        },

        startInterval() {
            let interval = setInterval(() => {
                if (this.remainingTime > 0) {
                    this.remainingTime -= 1;
                    this.updateCookies();
                } else {
                    clearInterval(interval);
                    this.resetTimer();
                }
            }, 1000);
        },

        updateCookies() {
            useCookie('remainingTime').value = this.remainingTime.toString();
            useCookie('isCooldown').value = this.isCooldown.toString();
        },

        clearCookies() {
            useCookie('remainingTime').value = undefined;
            useCookie('isCooldown').value = undefined;
        },
    },
});
