<script setup>

defineProps({
  title: String,
});
const emit = defineEmits(['prevTitle', 'nextTitle'])

</script>

<template>
  <div class="title_container">
    <button @click="emit('prevTitle')"> Previous </button>
    <h1 class="title">{{ title }}</h1>
    <button @click="emit('nextTitle')"> Next </button>
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
