<template>
  <div class="card-char">
    <div class="char__image-wrapper">
      <img class="char__img" :src="props.char.image ? props.char.image : '/src/assets/image/noAvatar.jpg'"
           :alt="char.name"/>
    </div>
    <div class="char__content">
      <h2 class="char__name">{{ char.name }}</h2>
      <div class="char__info">
        <div class="char__info-item">
          <span class="info-label">Gender</span>
          <span class="info-value">{{ char.gender || 'Unknown' }}</span>
        </div>
        <div class="char__info-item">
          <span class="info-label">Species</span>
          <span class="info-value">{{ char.species || 'Unknown' }}</span>
        </div>
        <div class="char__info-item">
          <span class="info-label">Status</span>
          <div class="status-badge" :class="getStatusClass(char.alive)">
            {{ formatStatus(char.alive) }}
          </div>
        </div>
      </div>
      <component-button @click="onOpenModal" class="char__btn">Подробнее</component-button>
      <component-button @click="handleFavorite" v-if="userStore.isAuthenticated"
                        :class="getFavoriteClass()">{{isFavorite ? 'Удалить из избранного' : 'В избранное'}}</component-button>
    </div>
  </div>
  <modal v-model:visability="openModal" >
    <content-card-modal :char="char"/>
  </modal>
</template>

<script setup>
import Modal from "./Modal/Modal.vue";
import {computed, ref} from "vue";
import ContentCardModal from "@/components/Modal/ContentCardModal.vue";
import ComponentButton from "@/components/UI/ComponentButton.vue";
import {useUserStore} from "@/stores/useUser.js";
import {useFavoritesStore} from "@/stores/useFavorite.js";
import {storeToRefs} from "pinia";

const props = defineProps({
  char: {
    type: Object,
    required: true,
  }
})

const openModal = ref(false);
const onOpenModal = () => {
  openModal.value = true;
};
const getStatusClass = (status) => {
  if (status === true) return 'status-alive'
  if (status === false) return 'status-dead'
}


const formatStatus = (status) => {
  if (status === true) return 'Alive'
  if (status === false) return 'Dead'
}
const userStore = useUserStore()
const favoritesStore = useFavoritesStore();
const isFavorite = computed(() => {
  return favoritesStore.isFavorite(props.char);
});
const getFavoriteClass = () => {
  return isFavorite.value ? "fav isFavorite" : "fav"
}
const handleFavorite = () => {
  favoritesStore.toggleFavorite(props.char);
};
</script>

<style>
.card-char {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  border: 1px solid rgba(24, 122, 255, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
}


.card-char:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(197, 223, 255, 0.4);
}

.char__image-wrapper {
  position: relative;
  overflow: hidden;
  background: #0f0f1a;
}


.char__img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.4s ease;
  display: block;
}

.card-char:hover .char__img {
  transform: scale(1.05);
}

.char__content {
  display: grid;
  grid-template-rows: 100px auto;
  padding: 24px;
  width: 100%;
  background: rgba(26, 26, 46, 0.9);
}

.char__name {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin: 0 0 20px 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.char__info {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
}

.char__info-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.char__info-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

.char__info-item {
  display: flex;
  justify-content: space-between;

  align-items: flex-start;
  gap: 5px;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.fav{
  margin-top:5px;
  background-color: #f44336;
}
.isFavorite{
  background-color: #00009a !important;
}
.info-label {
  font-size: 14px;
  font-weight: 500;
  color: #8b92a8;
  text-transform: uppercase;

}

.info-value {
  font-size: 16px;
  font-weight: 600;
  color: #4caf50;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
}
.char__btn{
  background-color: #4caf50;
}
.status-alive {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.1);
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

}

.status-dead {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
  box-shadow: 0 0 10px rgba(244, 67, 54, 0.1);
}
</style>