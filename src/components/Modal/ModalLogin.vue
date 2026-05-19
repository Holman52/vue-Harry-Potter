<template>
  <div class="auth">
    <h2>Авторизация</h2>
    <form @submit.prevent="validateForm" class="auth-form">
      <div class="auth-block">
        <label class="auth-label" for="login">Логин</label>
        <input class="auth-input" v-model="dataForm.login" type="text" id="login">
        <span v-if="errors.login" class="error">{{ errors.login }}</span>
      </div>
      <div class="auth-block">
        <label class="auth-label" for="password">Пароль</label>
        <input class="auth-input" v-model="dataForm.password" type="password" id="password">
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>
      <button type="submit" class="submit-btn">Войти</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {useUserStore} from "@/stores/useUser.js";
const userStore = useUserStore()
const dataForm = ref({
  login: '',
  password: '',
});

const errors = ref({
  login: '',
  password: '',
});

const validateForm = () => {
  errors.value.login = '';
  errors.value.password = '';

  let isValid = true;

  if (!dataForm.value.login) {
    errors.value.login = 'Введите логин';
    isValid = false;
  }

  if (!dataForm.value.password) {
    errors.value.password = 'Введите пароль';
    isValid = false;
  }

  if (!isValid) return;

  const storedUser = localStorage.getItem(dataForm.value.login);

  if (!storedUser) {
    errors.value.login = 'Пользователь с таким логином не найден';
    return;
  }

  const userData = JSON.parse(storedUser);

  if (userData.password !== dataForm.value.password) {
    errors.value.password = 'Неверный пароль';
    return;
  }

  userStore.login(userData)

};

</script>

<style scoped>

</style>