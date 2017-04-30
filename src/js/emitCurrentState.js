import store from '../store.js'

const CLIENT_EMIT_INTERVAL = 1000/30


let emitID
export default (socket) => {
  emitID = setInterval(() => {
    let hero = store.getState().hero
    socket.emit('clientUpdate', hero)
  }, CLIENT_EMIT_INTERVAL)
  return emitID
}
