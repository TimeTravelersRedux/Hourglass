export const redo = () => {
  return {
    type: 'REDO'

  }
}

export const undo = () => {
  return {
    type: 'UNDO'
  }
}

export const gotoState = stateIndex => {
  return {
    type: 'GOTO',
    stateIndex
  }
}
