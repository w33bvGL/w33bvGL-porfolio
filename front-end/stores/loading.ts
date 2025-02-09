// stores/loading.ts
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
    state: () => ({
        isLoading: false,
    }),
    actions: {
        setLoading(state: boolean) {
            this.isLoading = state;
        },
    },
});
