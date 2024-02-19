import { createContext, useReducer } from "react";

const MovieContext = createContext();

const { Provider } = MovieContext;

const INITAIL_STATE = {
  allMovies: [],
  totalCount: 0,
  pages: 0,
  page: 1,
};

function MovieContextProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "movies":
        return {
          ...state,
          allMovies: [...action.payload?.Search],
          totalCount: action.payload.totalResults,
          pages: Math.ceil(action.payload.totalResults / 10),
        };
      case "setCount":
        return { ...state, totalCount: action.payload };
      case "next":
        return { ...state, page: Math.min(state.page + 1, state.pages) };
      case "prev":
        return { ...state, page: Math.max(state.page - 1, 1) };
      default:
        return state;
    }
  }, INITAIL_STATE);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { MovieContextProvider, MovieContext };
