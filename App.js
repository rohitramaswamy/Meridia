import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const screens = ['Inspire', 'Curate', 'Trips', 'Map', 'Profile'];

export default function App() {
  const [activeScreen, setActiveScreen] = useState('Inspire');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{activeScreen} Me</Text>
        <Text style={styles.subtitle}>Beautiful dark theme working!</Text>
      </View>
      
      <View style={styles.tabBar}>
        {screens.map((screen) => (
          <TouchableOpacity
            key={screen}
            style={[
              styles.tab,
              activeScreen === screen && styles.activeTab
            ]}
            onPress={() => setActiveScreen(screen)}
          >
            <Text style={[
              styles.tabText,
              activeScreen === screen && styles.activeTabText
            ]}>
              {screen}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0B',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1F1F23',
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: '#8B5CF6',
  },
  tabText: {
    color: 'gray',
    fontSize: 12,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
