import currencyReducer, {
  toggleFavorite,
  fetchExchangeRates,
} from '../src/store/currencySlice.ts';

describe('currencySlice Reducer', () => {
  const initialState = {
    exchangeRates: [],
    favorites: [],
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(currencyReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should toggle favorites', () => {
    const stateWithFavorites = {
      ...initialState,
      favorites: ['USD'],
    };

    const nextState = currencyReducer(stateWithFavorites, toggleFavorite('USD'));
    expect(nextState.favorites).toEqual([]); // USD removed

    const newState = currencyReducer(nextState, toggleFavorite('EUR'));
    expect(newState.favorites).toEqual(['EUR']); // EUR added
  });

  it('should set loading on fetchExchangeRates.pending', () => {
    const nextState = currencyReducer(initialState, {
      type: fetchExchangeRates.pending.type,
    });
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should set exchangeRates on fetchExchangeRates.fulfilled', () => {
    const mockRates = [{ currency: 'USD', rate: 1.2 }];
    const nextState = currencyReducer(initialState, {
      type: fetchExchangeRates.fulfilled.type,
      payload: mockRates,
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.exchangeRates).toEqual(mockRates);
  });

  it('should handle fetchExchangeRates.rejected', () => {
    const nextState = currencyReducer(initialState, {
      type: fetchExchangeRates.rejected.type,
      error: { message: 'API Error' },
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('API Error');
  });
});
