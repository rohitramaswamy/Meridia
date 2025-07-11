import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const InspireMeScreen = () => {
  const [activeTab, setActiveTab] = useState('forYou');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with tabs */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'forYou' && styles.activeTab]}
          onPress={() => setActiveTab('forYou')}
        >
          <Text style={[styles.tabText, activeTab === 'forYou' && styles.activeTabText]}>
            For You
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'following' && styles.activeTab]}
          onPress={() => setActiveTab('following')}
        >
          <Text style={[styles.tabText, activeTab === 'following' && styles.activeTabText]}>
            Following
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content area - TikTok style feed will go here */}
      <View style={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            {activeTab === 'forYou' ? 'For You Feed' : 'Following Feed'}
          </Text>
          <Text style={styles.placeholderSubtext}>
            TikTok-style vertical scrolling posts will be implemented here
          </Text>
          <Text style={styles.placeholderSubtext}>
            • Swipeable travel posts
          </Text>
          <Text style={styles.placeholderSubtext}>
            • Popular destinations
          </Text>
          <Text style={styles.placeholderSubtext}>
            • User experiences
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#000',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  tabText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholderSubtext: {
    color: '#888',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default InspireMeScreen;
