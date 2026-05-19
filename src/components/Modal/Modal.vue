<template>
  <div class="modal" v-show="visability" @click="hideModal">
    <div :class="['card', 'modal__content', auth && 'auth-style']" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import {onUnmounted, watch} from "vue";

const props = defineProps({
  visability: {
    type: Boolean,
    default: false
  },
  auth:{
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visability']);
let scrollPosition = 0;

const preventScroll = () => {
  scrollPosition = window.scrollY;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';
}

const allowScroll = () => {
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollPosition);
}

watch(() => props.visability, (newVal) => {
  if (newVal) {
    preventScroll();
  } else {
    allowScroll();
  }
}, { immediate: true });

onUnmounted(() => {
  allowScroll();
});

const hideModal = () => {
  emit('update:visability', false);
}

</script>
<style>
.modal{
  background-color: rgba(0, 0, 0, 0.48);
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 999;
  overflow-y: auto;
  padding: 20px;
  height: 100%;
}
.modal__content{
  width: 100%;
  display: flex;
  background: rgba(26, 26, 46, 0.9);
  padding: 10px;
  margin: 20px auto;
  max-width: 800px;
}
.auth-style{
  max-width: 400px;
}
</style>