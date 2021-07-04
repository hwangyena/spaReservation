import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

type CounterState = {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

// createSlice = action과 reducer를 생성해주는 함수

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset: (state) => {
      state.value = 0
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const {
  increment,
  decrement,
  reset,
  incrementByAmount,
} = counterSlice.actions


export const incrementAsync = (amount: number) => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

export default counterSlice.reducer