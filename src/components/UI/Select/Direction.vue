<template>
  <form class="direction">
    <div class="direction__block">
      <input type="radio" value="asc" @change="handleChange" v-model="selectedDirection" name="radio" class="direction-input" id="asc">
      <label for="asc" class="direction-label">По возрастанию</label>
    </div>
    <div class="direction__block">
      <input type="radio" @change="handleChange" value="desc" v-model="selectedDirection" name="radio" class="direction-input" id="desc">
      <label for="desc" class="direction-label">По убыванию</label>
    </div>
  </form>
</template>
<script setup>
import {ref} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "asc"
  }
});

const emit = defineEmits(["update:modelValue"]);

const selectedDirection = ref(props.modelValue);

const handleChange = () => {
  emit("update:modelValue", selectedDirection.value);
};

</script>
<style scoped>
.direction {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  gap: 20px;
}
.direction__block {
  display: inline-flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}
.direction-label{
  white-space: nowrap
}
</style>