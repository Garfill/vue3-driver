<template>
  <div v-step:0>
    first
  </div>
  <div v-step:1>
    second
  </div>
</template>


<script lang="ts" setup>
  import { useDirver } from "@lib";
  import { onMounted } from "vue";

  const driver = useDirver()

  onMounted(() => {
    console.log(driver)
    driver.drive()
  })
</script>

