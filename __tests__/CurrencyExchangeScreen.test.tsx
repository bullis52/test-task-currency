import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import {store} from '../src/store/store.ts';
import CurrencyExchangeScreen from '../src/screens/CurrencyExchangeScreen.tsx';

jest.mock('../src/api/currencyApi.ts', () => ({
  fetchExchangeRatesFromApi: jest.fn(() =>
    Promise.resolve([
      { currency: 'USD', rate: 1.2 },
      { currency: 'EUR', rate: 0.9 },
    ])
  ),
}));

describe('CurrencyExchangeScreen', () => {
  it('renders loading state initially', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CurrencyExchangeScreen />
      </Provider>
    );

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders exchange rates after fetch', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <CurrencyExchangeScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText('USD: 1.2')).toBeTruthy();
      expect(getByText('EUR: 0.9')).toBeTruthy();
    });
  });
});
