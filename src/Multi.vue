<script
  setup
  lang="ts">
import { useDirver } from "@lib";

const driver1 = useDirver('first')
const driver2 = useDirver('second')

const handleClick = (key: number) => {
  if (key === 1) {
    driver1.drive()
  } else {
    driver2.drive()
  }
}
</script>

<template>
  <div class="multi1">
    <div v-step:1.first>This page has two drivers. They will not affect other one</div>
    <div v-step:2.first>This page has two drivers. They will not affect other one</div>
  </div>
  <div class="multi2">
    <div v-step:1.second>This page has two drivers. They will not affect other one</div>
  </div>
  <div>
    <button @click="handleClick(1)">start driver 1</button>
  </div>
  <div>
    <button @click="handleClick(2)">start driver 2</button>
  </div>

  <ul>
    <li>
      <router-link to="/a">page a</router-link>
    </li>
    <li>
      <router-link to="/b">page b</router-link>
    </li>
    <li>
      <router-link to="/">home</router-link>
    </li>
  </ul>
</template>

<style scoped>
.multi1 {
  background: skyblue;
  padding: 5px 0;
}

.multi2 {
  background: pink;
  padding: 5px 0;

}
</style>