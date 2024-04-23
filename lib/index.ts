import type { App } from 'vue';
import 'driver.js/dist/driver.css'
import { createInstance, getStepIndex } from "./helper.ts"; // inline for css inject

interface installFuncType {
  (app: App<Element>): void

  _installed: boolean
}

let DriverInstance: any

const install: installFuncType = (app: App<Element>, option: any = {}) => {
  if (install._installed) {
    console.error('Duplicated install. Just install the lib once')
    return
  }
  install._installed = true
  DriverInstance = createInstance(option)

  app.directive('step', {
    mounted(el, binding) {
      if (DriverInstance) {
        const stepIndex = getStepIndex(binding.arg)
        DriverInstance.changeStep(stepIndex, {
          element: el
        })
      }
    },
    beforeUnmount(_, binding) {
      if (DriverInstance) {
        const stepIndex = getStepIndex(binding.arg)
        DriverInstance.changeStep(stepIndex)
      }
    }
  })
}

install._installed = false


function useDirver() {
  return DriverInstance;
}


export default install;
export {
  useDirver
}