<script setup>

const props = defineProps({
  date: Object,
});
console.log(props.date)
const emit = defineEmits(['prevDay', 'nextDay'])

</script>

<template>
  <div class="title_container">
    <div class="row">
      <h3>Day:</h3>
      <h3>Night:</h3>
    </div>
    <div class="row">
      <span class="title">{{ date.day }}</span>
      <span class="title">{{ date.night }}</span>
    </div>
  </div>
</template>

<style scoped>
.title_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  width: 100%;
}

.row {
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  justify-content: space-around;
  width: 100%;
  white-space: pre;
  text-wrap: wrap;
}

.title {
  min-width: 50%;
}
</style>
