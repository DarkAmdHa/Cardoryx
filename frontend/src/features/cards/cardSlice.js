import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cardService from './cardService'

const initialState = {
  cards: [],
  card: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Create new card
export const addCard = createAsyncThunk(
  'cards/create',
  async (cardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cardService.addCard(cardData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Get all Cards
export const getCards = createAsyncThunk(
  'cards/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cardService.getCards(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getCard = createAsyncThunk(
  'cards/get',
  async (cardId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cardService.getCard(cardId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCard.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addCard.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCards.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cards = action.payload
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.card = action.payload
      })
      .addCase(getCard.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = cardSlice.actions
export default cardSlice.reducer
