import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ExchangeRateItem from '../src/components/ExchangeRateItem.tsx';

describe('ExchangeRateItem Component', () => {
  const mockItem = { currency: 'USD', rate: 1.2 };
  const mockToggleFavorite = jest.fn();

  it('renders currency and rate correctly', () => {
    const { getByText } = render(
      <ExchangeRateItem
        item={mockItem}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    expect(getByText('USD: 1.2')).toBeTruthy();
    expect(getByText('☆')).toBeTruthy(); // Not favorited
  });

  it('displays favorite icon when favorited', () => {
    const { getByText } = render(
      <ExchangeRateItem
        item={mockItem}
        isFavorite={true}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    expect(getByText('★')).toBeTruthy(); // Favorited
  });

  it('calls toggleFavorite when pressed', () => {
    const { getByText } = render(
      <ExchangeRateItem
        item={mockItem}
        isFavorite={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    fireEvent.press(getByText('☆'));
    expect(mockToggleFavorite).toHaveBeenCalledWith('USD');
  });
});
