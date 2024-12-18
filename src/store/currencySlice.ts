import {createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchExchangeRatesFromApi } from '../api/currencyApi';

type CurrencyState = {
  exchangeRates: { currency: string; rate: number }[];
  favorites: string[];
  loading: boolean;
  error: string | null;
};

const initialState: CurrencyState = {
  exchangeRates: [],
  favorites: [],
  loading: false,
  error: null,
};

export const fetchExchangeRates = createAsyncThunk('currency/fetchExchangeRates', async () => {
  return await fetchExchangeRatesFromApi();
});

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter((currency) => currency !== action.payload);
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.loading = false;
        state.exchangeRates = action.payload;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch exchange rates';
      });
  },
});

export const { toggleFavorite } = currencySlice.actions;
export default currencySlice.reducer;

