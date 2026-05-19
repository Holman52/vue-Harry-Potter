<template>
  <div class="favorites-block">
    <h2>Избранное</h2>
    <div class="favorites-stats">
      <div class="stat-item">
        <span>волшебники - {{ favoriteWizardsCount }}</span>
      </div>
      <div class="stat-item">
        <span>не волшебники - {{ favoriteNonWizardsCount }}</span>
      </div>
    </div>
  </div>
</template>
<script setup >
import {useFavoritesStore} from "@/stores/useFavorite.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const favoritesStore = useFavoritesStore();
const { currentFavorites } = storeToRefs(favoritesStore);
const favoriteWizardsCount = computed(() => {
  if (!currentFavorites.value) return 0;
  return currentFavorites.value.filter(item => item.wizard === true).length;
});

const favoriteNonWizardsCount = computed(() => {
  if (!currentFavorites.value) return 0;
  return currentFavorites.value.filter(item => item.wizard === false).length;
});


console.log('Избранное:', favoritesStore.currentFavorites);
</script>
<style>
.favorites-block {
  background: #1a1a2e;
  border-radius: 10px;
  padding: 20px;
}

.favorites-block h2 {
  font-size: 20px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  color: white;
}

.favorites-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-item {
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  color: white;
  font-size: 14px;
}

</style>