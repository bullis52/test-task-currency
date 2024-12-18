import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import {persistor, store} from './src/store/store.ts';
import CurrencyExchangeScreen from './src/screens/CurrencyExchangeScreen.tsx';
import {PersistGate} from 'redux-persist/integration/react';

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaView style={styles.container}>
        <CurrencyExchangeScreen />
      </SafeAreaView>
    </PersistGate>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
