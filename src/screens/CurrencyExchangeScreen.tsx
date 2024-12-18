import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchExchangeRates, toggleFavorite } from '../store/currencySlice';
import Header from '../components/Header';
import ExchangeRateItem from '../components/ExchangeRateItem';

const CurrencyExchangeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { exchangeRates, favorites, loading, error } = useAppSelector((state) => state.currency);

  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  if (error) {
    Alert.alert('Error', error);
  }

  const renderItem = ({ item }: { item: { currency: string; rate: number } }) => (
    <ExchangeRateItem
      item={item}
      isFavorite={favorites.includes(item.currency)}
      onToggleFavorite={() => dispatch(toggleFavorite(item.currency))}
    />
  );


  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <FlatList
          data={exchangeRates}
          keyExtractor={(item) => item.currency}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f3f3',
  },
  loading: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
});

export default CurrencyExchangeScreen;

