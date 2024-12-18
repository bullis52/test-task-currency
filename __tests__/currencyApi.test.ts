import axios from 'axios';
import {fetchExchangeRatesFromApi} from '../src/api/currencyApi.ts';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchExchangeRatesFromApi', () => {
  it('fetches exchange rates successfully', async () => {
    const mockResponse = {
      data: {
        rates: { USD: 1.2, EUR: 0.9 },
      },
    };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await fetchExchangeRatesFromApi();
    expect(result).toEqual([
      { currency: 'USD', rate: 1.2 },
      { currency: 'EUR', rate: 0.9 },
    ]);
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  it('throws an error if API fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));
    await expect(fetchExchangeRatesFromApi()).rejects.toThrow('Failed to fetch exchange rates.');
  });
});
