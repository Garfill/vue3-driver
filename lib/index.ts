import type { App } from 'vue';
import { driver } from 'driver.js'
import type { Config } from  'driver.js'
import 'driver.js/dist/driver.css' // inline for css inject

interface installFuncType {
  (app: App<Element>): void
  _installed: boolean
}

let DriverInstance: any

// default driver config
const defaultDriverOption: Config = {
  showProgress: true,
  steps: []
}

let userOption: any

const install: installFuncType = (app: App<Element>, option: any = {}) => {
  if (install._installed) {
    console.error('Duplicated install. Just install the lib once')
    return
  }
  install._installed = true
  userOption = option

  app.directive('step', {
    mounted(el, binding) {
      // binding.arg starts from 1
      const stepIndex = binding.arg !== '' ? Number(binding.arg) - 1 : 1
      if (!defaultDriverOption.steps![stepIndex]) {
        defaultDriverOption.steps![stepIndex] = {
          element: el,
        }
      }
    }
  })
}

install._installed = false


function creaetDriver(option: any) {
  const config = Object.assign({}, defaultDriverOption, option)
  return {
    driverObj: driver(config),
  }
}

function useDirver() {
  if (!DriverInstance) {
    DriverInstance = creaetDriver(userOption)
  }
  return DriverInstance.driverObj;
}

export default install;
export {
  useDirver
}