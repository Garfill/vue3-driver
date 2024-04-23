<script
  setup
  lang="ts">
import { useDirver } from "@lib";
import { onMounted } from "vue";

const driver = useDirver()
onMounted(() => {
  driver.drive()
})
</script>

<template>
  <ul>
    <li v-step:1>
      <router-link to="/a">page a</router-link>
    </li>
    <li v-step:2>
      <router-link to="/b">page b</router-link>
    </li>
  </ul>
</template>

<style scoped>

</style>