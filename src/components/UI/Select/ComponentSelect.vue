<template>
  <select :value="modelValue" @change="changeOptions">
    <option value="" selected disabled>Выберите по параметр </option>
    <option v-for="option in optionsList" :key='option.value' :value="option.value">
      {{ option.name }}
    </option>
  </select>

</template>
<script setup>
defineProps({
  optionsList: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  }
})
const emit = defineEmits(["update:modelValue"]);
const changeOptions = (e) => {
  emit("update:modelValue", e.target.value);
}
</script>
<style scoped>
</style>