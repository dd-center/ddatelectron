const EventEmitter = require('events')

const stateEmitter = new EventEmitter()

const state = new Proxy({
  completeNum: 0,
  completeNumNow: 0,
  logs: [],
  danmakus: [],
  homes: []
}, {
  set(target, key, value) {
    target[key] = value
    stateEmitter.emit(key, value)
  }
})

stateEmitter.on('log', log => {
  state.logs.unshift(log)
  if (state.logs.length > 233) {
    state.logs.pop()
  }
})

stateEmitter.on('danmaku', ([nickname, danmaku]) => {
  state.danmakus.unshift([nickname, danmaku])
  if (state.danmakus.length > 25) {
    state.danmakus.pop()
  }
})

module.exports = { state, stateEmitter }
