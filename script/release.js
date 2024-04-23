import { spawn } from "node:child_process";

console.log('release start ==================', new Date().toLocaleString())

// 执行打包命令
const build = spawn("npm", ['run', 'build'], { stdio: "inherit" })
build.on('exit', () => {
  console.log(' ============= build finish =======')
  gitActions().then(releaseVersion)
})

function gitActions() {

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

  const actions = [gitAdd, gitCommit, gitPush]


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

function releaseVersion() {
  const version = process.argv[2]
  if (versions.indexOf(version) === -1) {
    console.error("version " + version + " not found")
    return
  }
  console.log(`Release version: ${ version }`)
  const release = spawn('npm', ['version', version], { stdio: "inherit" })
  release.on('exit', () => {
    console.log('Version closed')
    spawn('npm', ['publish'])
  })
}