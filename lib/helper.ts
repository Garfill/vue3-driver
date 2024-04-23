import { driver } from 'driver.js'

function getStepIndex(num: any): number | null {
  return isNaN(num) ? null :  Number(num) - 1
}


interface VDriverConfig {
  steps: any[]
  [param: string]: any
}


const defaultOption = {
  showProgress: true
}

class VDriver {
  static instance: any
  _driver: any
  steps: any[]
  options: VDriverConfig | undefined
  constructor(steps: any[], options?: VDriverConfig) {
    if (typeof steps === 'object' && !Array.isArray(steps)) {
      options = steps
      steps = []
    }
    this.steps = steps.filter(s => !!s)
    this.options = Object.assign({}, defaultOption, options)
    this._driver = driver(Object.assign({steps: this.steps}, options))
  }
  drive() {
    this.steps = this.steps.filter(s => !!s)
    this._driver.setSteps(this.steps) // reset steps
    this._driver.drive()
  }
  changeStep(index: number, step: any) {
    this.steps[index] = step || undefined
  }
}

function createInstance(steps: any[], options?: VDriverConfig) {
  if (!VDriver.instance) {
    VDriver.instance = new VDriver(steps, options)
  }
  return VDriver.instance
}

export {
  getStepIndex,
  createInstance,
}