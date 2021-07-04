import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from './reducer/counter-slice'

const rootReducer = combineReducers({
  counter: counterReducer
})

export type CoreState = ReturnType<typeof rootReducer>

export default configureStore({
  reducer: rootReducer,
  devTools: true
})