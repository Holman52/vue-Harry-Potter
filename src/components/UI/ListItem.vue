<template>
  <div>
    <div  v-for="char in charcters">
      <card-item :char="char" />
    </div>
  </div>
</template>

<script setup>
  import CardItem from "@/components/CardItem.vue";
 defineProps({
    charcters:{
      type: Array,
      required: true,
    }
  })
</script>
<style scoped>
</style>