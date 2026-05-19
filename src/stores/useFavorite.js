import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {useUserStore} from "@/stores/useUser.js";


export const useFavoritesStore = defineStore('favorites', () => {
    const userStore = useUserStore();

    const favorites = ref({}); // { [login]: [charters] }

    const currentFavorites = computed(() => {
        if (!userStore.currentUser) return [];
        const login = userStore.currentUser.login;
        return favorites.value[login] || [];
    });

    const isFavorite = (char) => {
        const login = userStore.currentUser?.login;
        if (!login) return false;

        const userFavorites = favorites.value[login] || [];
        return userFavorites.some(item => item.id === char.id);
    };

    const loadFavorites = () => {
        const login = userStore.currentUser?.login;
        if (!login) return;

        const stored = localStorage.getItem(`favorites_${login}`);
        if (stored) {
            favorites.value[login] = JSON.parse(stored);
        } else {
            favorites.value[login] = [];
        }
    };

    const saveFavorites = () => {
        const login = userStore.currentUser?.login;
        if (!login) return;

        localStorage.setItem(`favorites_${login}`, JSON.stringify(favorites.value[login]));
    };

    const addToFavorites = (char) => {
        const login = userStore.currentUser?.login;
        if (!login) return;

        if (!favorites.value[login]) {
            favorites.value[login] = [];
        }

        if (!favorites.value[login].includes(char)) {
            favorites.value[login].push(char);
            saveFavorites();
        }
    };

    const removeFromFavorites = (char) => {
        const login = userStore.currentUser?.login;
        if (!login) return;
        if (favorites.value[login]) {
            const index =favorites.value[login].findIndex(item => item.id === char.id);
            console.log(index)
            if (index !== -1) {
                favorites.value[login].splice(index, 1);
                saveFavorites();
            }
        }
    };

    const toggleFavorite = (char) => {
        console.log(isFavorite(char))
        if (isFavorite(char)) {
            removeFromFavorites(char);
            return false;
        } else {
            addToFavorites(char);
            return true;
        }
    };


    return {
        favorites,
        currentFavorites,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        loadFavorites,
    };
});