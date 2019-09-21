export const rootReducer = (state, action) => {
  switch (action.type) {
    case "user":
      return {
        ...state,
        user: action.payload
      }
    case "animation":
      return {
        ...state,
        animation: action.payload
      }
    default:
      return state
  }
}
