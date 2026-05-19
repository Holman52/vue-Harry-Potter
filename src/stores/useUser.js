import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
    const currentUser = ref(null);

    const isAuthenticated = computed(() => currentUser.value !== null);
    const userName = computed(() => {
        if (!currentUser.value) return '';
        return `${currentUser.value.name} ${currentUser.value.surname} ${currentUser.value.otchestvo}`;
    });

    const login = (userData) => {
        currentUser.value = userData;
        localStorage.setItem('currentUser', JSON.stringify(userData));
    };

    const logout = () => {
        currentUser.value = null;
        localStorage.removeItem('currentUser');
    };

    const loadUserFromStorage = () => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            currentUser.value = JSON.parse(storedUser);
        }
    };

    return {
        currentUser,
        isAuthenticated,
        userName,
        login,
        logout,
        loadUserFromStorage
    };
});