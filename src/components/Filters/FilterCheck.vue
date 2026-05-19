<template>
  <form class="form-check card">
    <div class="load-block" v-if="load">
    <h2 class="load">Загрузка...</h2>
  </div>
    <div v-else class="check">
      <h2>Разновидность</h2>
      <div class="check-block" v-for="filter in filtersSet" :key="filter">

          <input
              class="check-input"
              type="checkbox"
              :value="filter"
              v-model="filters.species"
              @change="handleChange"
          >
        <label>
          {{ filter }}
        </label>
      </div>
    </div>
    <div class="check">
      <h2>Жив</h2>
      <div class="check-block">
        <input type="checkbox" class="check-input" value="alive" v-model="filters.alive" @change="handleChange">
        <label>
          Да
        </label>
      </div>
        <div class="check-block">
         <input type="checkbox" class="check-input" value="dead" v-model="filters.alive" @change="handleChange">
         <label>
           Нет
         </label>
       </div>
    </div>
  </form>
</template>
<script setup>
import {ref} from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      species: [],
      alive: [],
    })
  },
  filtersSet: {
    type: Array,
    default: () => ['human', 'cat', 'dog']
  },
  load:{
    type: Boolean,
    default: false
  }

});

const emit = defineEmits(["update:modelValue"]);
const filters = ref({ ...props.modelValue });

const handleChange = () => {
  emit("update:modelValue", filters.value);
};
</script>
<style scoped>
.form-check {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  justify-content: center;
  gap: 20px;
}
.check-block {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
}
.check-input {
  width: 20px;
  height: 20px;
}
</style>

