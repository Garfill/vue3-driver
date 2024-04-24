import type { App } from 'vue';
import 'driver.js/dist/driver.css'
import { createInstanceMaker, getStepIndex } from "./helper.ts"; // inline for css inject

interface installFuncType {
  (app: App<Element>): void

  _installed: boolean
}

const driverInstMap = new Map()

let createInstance: any

const install: installFuncType = (app: App<Element>, option: any = {}) => {
  if (install._installed) {
    console.error('Duplicated install. Just install the lib once')
    return
  }

  createInstance = createInstanceMaker(option)

  install._installed = true

  app.directive('step', {
    mounted(el, binding) {
      const instanceKey = Object.keys(binding.modifiers)[0]
      const instance = getDriverInstanceFromKey(instanceKey)
      const popover = binding.value
      if (instance) {
        const stepIndex = getStepIndex(binding.arg)
        instance.changeStep(stepIndex, {
          element: el,
          popover,
        })
      }
    },
    beforeUnmount(_, binding) {
      const instanceKey = Object.keys(binding.modifiers)[0]
      const instance = getDriverInstanceFromKey(instanceKey)
      if (instance) {
        const stepIndex = getStepIndex(binding.arg)
        instance.changeStep(stepIndex)
      }
    }
  })
}

install._installed = false


function useDirver(key: string = 'default') {
  let inst = driverInstMap.get(key)
  if (!inst) {
    inst = createInstance()
    driverInstMap.set(key, inst)
  }
  return inst
}

function getDriverInstanceFromKey(key: string = 'default') {
  return driverInstMap.get(key)
}


export default install;
export {
  useDirver
}