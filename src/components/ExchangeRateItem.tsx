import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ExchangeRateItemProps = {
  item: { currency: string; rate: number };
  isFavorite: boolean;
  onToggleFavorite: (currency: string) => void;
};

const ExchangeRateItem: React.FC<ExchangeRateItemProps> = ({ item, isFavorite, onToggleFavorite }) => (
  <TouchableOpacity style={[styles.item, isFavorite && styles.favoriteItem]} onPress={() => onToggleFavorite(item.currency)}>
    <Text style={styles.currencyText}>{item.currency}: {item.rate}</Text>
    <Text style={styles.favoriteText}>{isFavorite ? '★' : '☆'}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  favoriteItem: {
    backgroundColor: '#fce4ec',
  },
  currencyText: {
    fontSize: 18,
    fontWeight: '500',
  },
  favoriteText: {
    fontSize: 20,
    color: '#d81b60',
  },
});
export default ExchangeRateItem;
