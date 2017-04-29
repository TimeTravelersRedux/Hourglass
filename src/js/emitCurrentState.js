import store from '../store.js'

const CLIENT_EMIT_INTERVAL = 4000


let emitID
export default (socket) => {
  emitID = setInterval(() => {
    let state = store.getState()
    let currentPlayerPos = state.playerMap[socket.id]
    socket.emit('clientUpdate', currentPlayerPos )
  }, CLIENT_EMIT_INTERVAL)
  return emitID
}
