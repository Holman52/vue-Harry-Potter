<template>
  <div class="search">
    <input type="text" v-model="searchInput" class="search-input">
    <div class="button-block">
      <component-button class="search-button" @click.prevent="search">Поиск</component-button>
    </div>
  </div>
</template>
<script setup>

import ComponentButton from "@/components/UI/ComponentButton.vue";
import {ref} from "vue";

const searchInput = ref("");
const emit = defineEmits(['search']);
const search = () =>{
  emit("search", searchInput.value);
}
</script>
<style scoped>
.search{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  border-radius: 15px;
  width: 100%;
}
.search-input{
  padding: 10px 15px;
  width: 80%;
  font-size: 16px;
}
.button-block{
  width: 20%;
  height: 100%;
}
.search-button{
  background-color: #f44336;
  width: 100%;
  border-radius: 15px;
  color: #f2f2f2;
  font-size: 18px;
  font-weight: 400;
  padding: 10px 15px;
}
.search-button:hover{
  background-color: #ed0f00;
}
</style>