<script
  setup
  lang="ts">
  import { useDirver } from "@lib";
  import { onMounted } from "vue";

  const driver = useDirver()
  onMounted(() => {
    driver.drive()
  })

  const popoverOption = {
    title: '弹窗信息',
    description: '弹窗内容',
    nextBtnText: '下一个',
    prevBtnText: '上一个',
  }
</script>

<template>
  <div v-step:1="popoverOption" class="popover">
    You can set popover option in v-step="option"
  </div>
  <div v-step:2="popoverOption" class="popover">
    You can find popover option <a href="https://driverjs.com/docs/configuration" target="_blank">here</a>
  </div>
</template>

<style scoped>
  .popover {
    margin: 10px 0;
    background: skyblue;
  }
</style>