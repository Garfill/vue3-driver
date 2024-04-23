# V-Driver

Tool for Vue3 and driver.js

## Install

```js
pnpm i v-driver (npm or yarn)
```

## Usage
```js
// main.ts
import vdriver from 'v-driver'
vueapp.use(vdriver, option?)
```
Option can be found [here](https://driverjs.com/docs/configuration)

```vue 
// component.vue
// now you can use v-step:index
// template
<div v-step:1>/* first content */</div>
<div v-step:2>/* second content */</div>

// script in setup
<script setup>
    import { useDriver } from 'v-driver'
    const  driver = useDriver()
    onMounted(() => {
        driver.drive()
    })
</script>
```
## Notice
Please make sure the index in (v-step:[index]) is unique in one page.