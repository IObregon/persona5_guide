<script setup>

const props = defineProps({
  date: String,
});
const emit = defineEmits(['prevDay', 'nextDay'])

</script>

<template>
  <div class="title_container">
    <button @click="emit('prevDay')"> Previous </button>
    <h1 class="title">{{ date }}</h1>
    <button @click="emit('nextDay')"> Next </button>
  </div>
</template>

<style scoped>
.title_container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  width: 100%;
}
.title{
  min-width: 50%;
}
</style>
