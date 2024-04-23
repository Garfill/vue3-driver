import { spawn } from "node:child_process";

console.log('release start ==================', new Date().toLocaleString())

// 执行打包命令
const build = spawn("npm", ['run', 'build'], { stdio: "inherit" })
build.on('exit', () => {
  console.log(' ============= build finish =======')
  releaseAction().then(releaseAction)
})


function gitCommit() {
  return new Promise((resolve, reject) => {
    const action = spawn('git', ['commit', '-m', 'new version'], { stdio: "inherit" })
    action.on('exit', () => {
      console.log('git commit successfully')
      resolve()
    })
  })
}

function gitAdd() {
  return new Promise((resolve, reject) => {
    const action = spawn('git', ['add', '.'], { stdio: "inherit" })
    action.on('exit', () => {
      console.log('git add successfully')
      resolve()
    })
  })
}

function gitPush() {
  return new Promise((resolve, reject) => {
    const action = spawn('git', ['push', 'origin'], { stdio: "inherit" })
    action.on('exit', () => {
      console.log('git push successfully')
      resolve()
    })
  })
}


function npmVersionChange() {
  return new Promise((resolve, reject) => {
    const version = process.argv[2]
    if (versions.indexOf(version) === -1) {
      console.error("version " + version + " not found")
      return
    }
    console.log(`Release version: ${ version }`)
    const action = spawn('npm', ['version', version], { stdio: "inherit" })
    action.on('exit', () => {
      console.log('release successfully')
      resolve()
    })
  })
}

function npmPublish() {
  return new Promise((resolve, reject) => {
    const action = spawn('npm', ['publish'], { stdio: "inherit" })
    action.on('exit', () => {
      console.log('Version publish successfully')
      resolve()
    })
  })
}

function releaseAction() {

  const actions = [gitAdd, gitCommit, npmVersionChange , npmPublish, gitPush]


  return new Promise((resolve, reject) => {
    function execGitActions() {
      if (actions.length) {
        const a = actions.shift()
        a().then(() => {
          execGitActions()
        })
      } else {
        resolve()
      }
    }

    execGitActions()
  })
}


// 发布版本
const versions = ['major', 'minor', 'patch']
