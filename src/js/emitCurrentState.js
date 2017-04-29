import store from '../store.js'

const CLIENT_EMIT_INTERVAL = 4000


let emitID
export default (socket) => {
  emitID = setInterval(() => {
    console.log("socket", socket);

    let state = store.getState()
    console.log("state", state);
    let currentPlayerPos = state.playerMap[socket.id]
    console.log("currentPlayerPos", currentPlayerPos);
    socket.emit('clientUpdate', currentPlayerPos )
  }, CLIENT_EMIT_INTERVAL)
  return emitID
}
