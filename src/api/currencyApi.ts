import {API_KEY, API_URL} from '@env';
import axios from 'axios';

export const fetchExchangeRatesFromApi = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: { access_key: API_KEY },
    });
    return Object.entries(response.data.rates).map(([currency, rate]) => ({
      currency,
      rate: rate as number,
    }));
  } catch {
    throw new Error('Failed to fetch exchange rates.');
  }
};
