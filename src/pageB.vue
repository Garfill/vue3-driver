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
    page B first
  </div>
  <div v-step:2>
    page B second
  </div>
  <div v-step:3>
    page B third
  </div>

  <ul>
    <li>
      <router-link to="/a">page a</router-link>
    </li>
    <li>
      <router-link to="/">back to home</router-link>
    </li>
  </ul>

</template>

<style scoped>

</style>