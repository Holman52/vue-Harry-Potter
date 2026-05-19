<template>
  <header>
    <nav v-if="!userStore.isAuthenticated">
      <component-button @click="handleOpenRegister" class="btn-auth">Регистрация</component-button>
      <component-button @click="handleOpenLogin" class="btn-auth ">Авторизация</component-button>
    </nav>
    <nav v-else>
      <h2>{{ userStore.userName }}</h2>
      <component-button @click="handleLogout" class="btn-auth logout-btn">Выйти</component-button>
    </nav>
  </header>

  <modal :auth="true" v-model:visability="onOpenLogin">
    <modal-login  />
  </modal>

  <modal :auth="true" v-model:visability="onOpenRegister">
    <modal-register  />
  </modal>
</template>

<script setup>
import { ref} from "vue";
import ComponentButton from "@/components/UI/ComponentButton.vue";
import Modal from "@/components/Modal/Modal.vue";
import ModalLogin from "@/components/Modal/ModalLogin.vue";
import ModalRegister from "@/components/Modal/ModalRegister.vue";
import {useUserStore} from "@/stores/useUser.js";

const userStore = useUserStore();
console.log(userStore.isAuthenticated);
const onOpenRegister = ref(false);
const onOpenLogin = ref(false);

const handleOpenLogin = () => {
  onOpenLogin.value = true;
};

const handleOpenRegister = () => {
  onOpenRegister.value = true;
};

const handleLogout = () => {
  userStore.logout();
};
</script>

<style scoped>
header {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
}
.btn-auth {
  background-color: #00009a;
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 10px;
  color: white;
  border: none;
  cursor: pointer;
}

.logout-btn{
  max-width: 100px;
}
</style>