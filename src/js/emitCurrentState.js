import store from '../store.js'

const CLIENT_EMIT_INTERVAL = 1000 / 30


let emitID
export default (socket) => {
  emitID = setInterval(() => {
    const state = store.getState();
    const update = {
      player: state.hero,
      keyHolderId: state.keyHolderId
    }
    socket.emit('clientUpdate', update)
  }, CLIENT_EMIT_INTERVAL)
  return emitID
}
