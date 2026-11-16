
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#080D18"
      />

      <Text style={styles.logo}>
        FINPULSE<Text style={styles.ai}> AI</Text>
      </Text>

      <Text style={styles.subtitle}>
        PREDICTIVE CRYPTO & STOCK SIGNAL RADAR
      </Text>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Welcome to FinPulse AI
        </Text>

        <Text style={styles.description}>
          Your intelligent financial market
          companion.
        </Text>

        <Text style={styles.status}>
          SYSTEM INITIALIZED
        </Text>
      </View>

      <Text style={styles.footer}>
        POWERED BY AI MARKET INTELLIGENCE
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080D18',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  ai: {
    color: '#20D6A0',
  },
  subtitle: {
    fontSize: 10,
    color: '#8793A8',
    letterSpacing: 2,
    marginTop: 10,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#111B2C',
    borderRadius: 20,
    padding: 25,
    marginTop: 45,
    borderWidth: 1,
    borderColor: '#26364A',
    alignItems: 'center',
  },
  heading: {
    fontSize: 21,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  description: {
    color: '#A4B0C2',
    fontSize: 13,
    marginTop: 12,
    textAlign: 'center',
  },
  status: {
    color: '#20D6A0',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 25,
    letterSpacing: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 35,
    color: '#68758A',
    fontSize: 9,
    letterSpacing: 1.5,
  },
});
