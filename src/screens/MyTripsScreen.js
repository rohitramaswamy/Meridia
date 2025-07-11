import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MyTripsScreen = () => {
  const [activeTab, setActiveTab] = useState('planned');

  // Mock data for trips
  const plannedTrips = [
    { id: 1, title: 'Tokyo Adventure', date: 'Dec 2024', status: 'Planning' },
    { id: 2, title: 'European Tour', date: 'Mar 2025', status: 'Booked' },
  ];

  const pastTrips = [
    { id: 3, title: 'Bali Getaway', date: 'Aug 2024', status: 'Completed' },
    { id: 4, title: 'NYC Weekend', date: 'Jun 2024', status: 'Completed' },
  ];

  const renderTripCard = ({ item }) => (
    <TouchableOpacity style={styles.tripCard}>
      <View style={styles.tripInfo}>
        <Text style={styles.tripTitle}>{item.title}</Text>
        <Text style={styles.tripDate}>{item.date}</Text>
        <Text style={[styles.tripStatus, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planning': return '#FF9500';
      case 'Booked': return '#007AFF';
      case 'Completed': return '#34C759';
      default: return '#666';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trips</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'planned' && styles.activeTab]}
          onPress={() => setActiveTab('planned')}
        >
          <Text style={[styles.tabText, activeTab === 'planned' && styles.activeTabText]}>
            Planned
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past Trips
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'planned' ? (
          <FlatList
            data={plannedTrips}
            renderItem={renderTripCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={pastTrips}
            renderItem={renderTripCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripInfo: {
    flex: 1,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  tripStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default MyTripsScreen;
