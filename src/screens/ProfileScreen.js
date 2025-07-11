import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('trips');

  // Mock user data
  const userData = {
    name: 'John Traveler',
    username: '@johntraveler',
    bio: 'Adventure seeker | 25 countries visited | Next stop: Japan 🇯🇵',
    followers: 1234,
    following: 567,
    trips: 15,
    avatar: null, // Will use placeholder
  };

  // Mock trips data
  const userTrips = [
    { id: 1, title: 'Bali Adventure', image: null, likes: 45 },
    { id: 2, title: 'European Tour', image: null, likes: 78 },
    { id: 3, title: 'NYC Weekend', image: null, likes: 32 },
    { id: 4, title: 'Mountain Hiking', image: null, likes: 56 },
  ];

  const renderTripItem = ({ item }) => (
    <TouchableOpacity style={styles.tripItem}>
      <View style={styles.tripImagePlaceholder}>
        <Ionicons name="image" size={40} color="#ccc" />
      </View>
      <View style={styles.tripOverlay}>
        <Text style={styles.tripTitle}>{item.title}</Text>
        <View style={styles.tripStats}>
          <Ionicons name="heart" size={12} color="#fff" />
          <Text style={styles.tripLikes}>{item.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#ccc" />
            </View>
          </View>
          
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.bio}>{userData.bio}</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.trips}</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'trips' && styles.activeTab]}
            onPress={() => setActiveTab('trips')}
          >
            <Ionicons name="briefcase" size={20} color={activeTab === 'trips' ? '#007AFF' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'trips' && styles.activeTabText]}>
              Trips
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}
          >
            <Ionicons name="bookmark" size={20} color={activeTab === 'saved' ? '#007AFF' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>
              Saved
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Grid */}
        <View style={styles.gridContainer}>
          <FlatList
            data={userTrips}
            renderItem={renderTripItem}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
          />
        </View>
      </ScrollView>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  gridContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  tripItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tripImagePlaceholder: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
  },
  tripTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  tripStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripLikes: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 4,
  },
});

export default ProfileScreen;
