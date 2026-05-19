<template>
  <div class="container">
    <navigation />
    <div class="three-columns">
      <aside class="column-filters">
        <filter-check
            :load="load"
            v-model="filters"
            :filtersSet="filtersSet"
        />
      </aside>

      <div class="column-content">
        <section class="section">
          <component-search @search="searchRequest=$event"/>
          <div class="select-block">
            <direction v-model="sortedDirection"/>
            <component-select class="select-sort" v-model="selectSort" :options-list="optionsSelect" />
          </div>
        </section>

        <div class="load-block" v-show="load">
          <h1 class="load">Загрузка...</h1>
        </div>
        <list-item class="grid-items" :charcters="sortedPosts" />
      </div>

      <aside class="column-favorites">
        <favorites />
      </aside>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import ListItem from "@/components/UI/ListItem.vue";
import ComponentSearch from "@/components/Search/ComponentSearch.vue";
import ComponentSelect from "@/components/UI/Select/ComponentSelect.vue";
import {FunFilter, FunFilters} from "@/utils/sortedFuns.js";
import Direction from "@/components/UI/Select/Direction.vue";
import FilterCheck from "@/components/Filters/FilterCheck.vue";
import Navigation from "@/components/Navigation/Navigation.vue";
import {useUserStore} from "@/stores/useUser.js";
import {useFavoritesStore} from "@/stores/useFavorite.js";
import Favorites from "@/components/Favorite/Favorites.vue";

const posts = ref([])
const optionsSelect = ref([
  {name: 'По имени', value: 'name'},
  {name: 'По происхождению', value: 'ancestry'},
  {name: 'По дате рождения', value: 'happyBirthday'},
])
const sortedDirection = ref('asc')
const load = ref(false)
const searchRequest = ref('')
const selectSort = ref('')
const filters = ref({
  species: [],
  alive: []
});
const filtersSet = ref([]);
const userStore = useUserStore()
const favoritesStore = useFavoritesStore()

const sortedPosts = computed(() => {
  let res = [...posts.value]
  const speciesArray = res
      .map(char => char.species)
      .filter(species => species && species.trim() !== "");
  filtersSet.value = [...new Set(speciesArray)].sort()

  if (searchRequest.value) {
    const query = searchRequest.value.toLowerCase()
    res = FunFilter(res, query)
  }
  res = FunFilters(res, selectSort.value, sortedDirection.value)
  if (filters.value.species.length > 0) {
    res = res.filter(item =>
        filters.value.species.includes(item.species)
    );
  }
  if (filters.value.alive.length > 0) {
    console.log(filters.value.alive)
    res = res.filter(item => {
      const isAlive = item.alive ? 'alive' : 'dead';
      return filters.value.alive.includes(isAlive);
    });
  }

  return res
})

const getPosts = async () => {
  try {
    load.value = true
    posts.value = await fetch("https://hp-api.onrender.com/api/characters")
        .then(res => res.json())
    console.log(posts.value)
  } catch (e){
    console.error(e)
  } finally {
    load.value = false
  }
}

onMounted(() => {
  getPosts()
  userStore.loadUserFromStorage();
  if (userStore.isAuthenticated) {
    favoritesStore.loadFavorites();
    console.log(favoritesStore.currentFavorites);
  }
})
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}
/* ТРИ КОЛОНКИ */
.three-columns {
  display: flex;
  width: 100%;
  gap: 30px;
  align-items: flex-start;
}

.column-filters {
  flex: 0 0 280px;
  position: sticky;
  top: 20px;
}

.column-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.column-favorites {
  flex: 0 0 280px;
  position: sticky;
  top: 20px;

}


.section {
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.grid-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  min-height: 60vh;
}

.load-block {
  width: 100%;
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.load {
  margin: auto;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 50px;
}

.select-block {
  width: 100%;
  font-size: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  align-items: center;
}

.select-sort {
  max-width: 300px;
  width: 100%;
  padding: 10px;
  background-color: #0f0f1a;
}

@media (max-width: 1024px) {
  .three-columns {
    gap: 20px;
  }

  .column-filters {
    flex: 0 0 250px;
  }

  .column-favorites {
    flex: 0 0 250px;
  }

  .grid-items {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .three-columns {
    flex-direction: column;
  }

  .column-filters {
    flex: 0 0 auto;
    width: 100%;
    position: static;
  }

  .column-favorites {
    flex: 0 0 auto;
    width: 100%;
    position: static;
  }

  .select-block {
    flex-direction: column;
    align-items: stretch;
  }

  .select-sort {
    max-width: 100%;
  }

  .grid-items {
    grid-template-columns: 1fr;
  }

  .load {
    font-size: 30px;
  }
}

@media (min-width: 1600px) {
  .container {
    max-width: 1600px;
  }

  .grid-items {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>