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
        animations: action.payload
      }
    case "loading":
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}
