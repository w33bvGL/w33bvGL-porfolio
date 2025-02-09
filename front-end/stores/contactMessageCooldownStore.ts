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
            } else {
                this.isCooldown = false;
                this.remainingTime = 300;
            }
        },

        startCooldown() {
            if (!this.isCooldown) return;

            this.isCooldown = true;
            useCookie('isCooldown').value = 'true';

            let interval = setInterval(() => {
                if (this.remainingTime > 0) {
                    this.remainingTime -= 1;
                    useCookie('remainingTime').value = this.remainingTime.toString();
                } else {
                    clearInterval(interval);
                    this.isCooldown = false;
                    useCookie('isCooldown').value = 'false';
                    useCookie('remainingTime').value = '0';
                }
            }, 1000);
        },

        resetTimer() {
            this.remainingTime = 300;
            this.isCooldown = false;
            useCookie('remainingTime').value = '300';
            useCookie('isCooldown').value = 'false';
        },

        setRemainingTime(time: number) {
            this.remainingTime = time;
            useCookie('remainingTime').value = time.toString();
        }
    }
});
