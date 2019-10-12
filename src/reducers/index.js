export const rootReducer = (state, action) => {
  switch (action.type) {
    case "user":
      return {
        ...state,
        user: action.payload
      }
    case "posts":
      return {
        ...state,
        posts: action.payload
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
    case "loadingMedia":
      return {
        ...state,
        isLoadingMedia: action.payload
      }
    case "userPost":
      return {
        ...state,
        userPost: action.payload
      }
    default:
      return state
  }
}
