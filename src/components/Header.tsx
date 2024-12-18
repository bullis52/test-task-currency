import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Header: React.FC = () => <Text style={styles.header}>Currency Exchange Rates</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200ea',
  },
});

export default Header;
