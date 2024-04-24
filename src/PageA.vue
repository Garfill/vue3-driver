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
  <div v-step:1>
    page A first
  </div>
  <div v-step:2>
    page A second
  </div>

  <ul>
    <li>
      <router-link to="/b">page b</router-link>
    </li>
    <li>
      <router-link to="/">back to home</router-link>
    </li>
  </ul>
</template>

<style scoped>

</style>