<script setup>
import { ref } from 'vue';
import data from '../public/data.json'
import ShowTitle from './components/ShowTitle.vue';
import ShowHeader from './components/ShowHeader.vue';
import ShowDay from './components/ShowDay.vue';
import ShowInstructions from './components/ShowInstructions.vue';
const currentTitle = ref(0);
const currentDay = ref(0);

const hasDate = () =>
  data[currentTitle.value] !== undefined &&
  data[currentTitle.value].extra !== undefined &&
  data[currentTitle.value].extra[currentDay.value] !== undefined &&
  data[currentTitle.value].extra[currentDay.value].date !== undefined;
const getDay = () => {
  if (hasDate()) {
    return data[currentTitle.value].extra[currentDay.value];
  }
  return {}
}
const nextTitle = () => {
  if (currentTitle.value + 1 > data.length - 1) {
    return;
  }
  currentTitle.value++;
  currentDay.value = 0;
}

const prevTitle = () => {
  if (currentTitle.value - 1 < 0) {
    return;
  }
  currentTitle.value--;
  currentDay.value = 0;
}

const nextDay = () => {
  if (currentDay.value + 1 > data[currentTitle.value].extra.length - 1) {
    currentDay.value = 0;
    currentTitle.value++;
    return;
  }
  currentDay.value++;
}

const prevDay = () => {
  if (currentDay.value - 1 < 0) {
    currentTitle.value--;
    currentDay.value = data[currentTitle.value].extra.length - 1;
    console.log(currentDay.value)
    return;
  }
  currentDay.value--;
}
</script>

<template>
  <div class="container">
    <ShowTitle :title="data[currentTitle].title" @nextTitle="nextTitle()" @prevTitle="prevTitle()" />
    <ShowHeader :header="data[currentTitle].header"></ShowHeader>
    <ShowDay v-if="hasDate()" :date="getDay().date" @nextDay="nextDay()" @prevDay="prevDay()"></ShowDay>
    <ShowInstructions v-if="hasDate()" :date="getDay()"></ShowInstructions>
    <div class="links">
      <a href="https://psnprofiles.com/guide/11946-persona-5-royal-100-perfect-schedule#3-recommended-fusion-path" target="_blank">Recommended
        fusion path</a> 
      <br/>
      <a href="https://psnprofiles.com/guide/11946-persona-5-royal#5-shadows-information" target="_blank">Shadows information</a>
    </div>
    <div class="footer">
      All the information shown here is extracted fromm: <a href="https://psnprofiles.com/guide/11946-persona-5-royal-100-perfect-schedule">here</a>.
      This is only a easier way to show the information.
    </div>
  </div>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* align-content: center; */
  /* justify-content: center; */
  width: 90%;
  height: 100%;
}

.links {
  margin-top: 25px;
  font-size: 25px;
}
</style>
