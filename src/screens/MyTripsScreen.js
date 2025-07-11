import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

const MyTripsScreen = () => {
  const [activeTab, setActiveTab] = useState('planned');

  // Mock data for trips
  const plannedTrips = [
    {
      id: 1,
      title: 'Tokyo Adventure',
      destination: 'Tokyo, Japan',
      date: 'Dec 15-22, 2024',
      status: 'Planning',
      image: 'https://picsum.photos/300/200?random=4',
      budget: 2500,
      activities: 8,
      days: 7
    },
    {
      id: 2,
      title: 'European Tour',
      destination: 'Paris, Rome, Barcelona',
      date: 'Mar 10-25, 2025',
      status: 'Booked',
      image: 'https://picsum.photos/300/200?random=5',
      budget: 4200,
      activities: 15,
      days: 15
    },
  ];

  const pastTrips = [
    {
      id: 3,
      title: 'Bali Getaway',
      destination: 'Ubud, Bali',
      date: 'Aug 12-19, 2024',
      status: 'Completed',
      image: 'https://picsum.photos/300/200?random=6',
      budget: 1800,
      activities: 12,
      days: 7,
      rating: 4.8
    },
    {
      id: 4,
      title: 'NYC Weekend',
      destination: 'New York City',
      date: 'Jun 5-8, 2024',
      status: 'Completed',
      image: 'https://picsum.photos/300/200?random=7',
      budget: 1200,
      activities: 6,
      days: 3,
      rating: 4.5
    },
  ];

  const renderTripCard = ({ item }) => (
    <TouchableOpacity style={styles.tripCard}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.tripImageBackground}
        imageStyle={styles.tripImage}
      >
        <View style={styles.tripOverlay} />
        <View style={styles.tripContent}>
          <View style={styles.tripHeader}>
            <View style={styles.tripInfo}>
              <Text style={styles.tripTitle}>{item.title}</Text>
              <Text style={styles.tripDestination}>{item.destination}</Text>
              <Text style={styles.tripDate}>{item.date}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>

          <View style={styles.tripStats}>
            <View style={styles.statItem}>
              <Ionicons name="calendar-outline" size={16} color={colors.textLight} />
              <Text style={styles.statText}>{item.days} days</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="location-outline" size={16} color={colors.textLight} />
              <Text style={styles.statText}>{item.activities} activities</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="card-outline" size={16} color={colors.textLight} />
              <Text style={styles.statText}>${item.budget}</Text>
            </View>
            {item.rating && (
              <View style={styles.statItem}>
                <Ionicons name="star" size={16} color={colors.accent} />
                <Text style={styles.statText}>{item.rating}</Text>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planning': return colors.warning;
      case 'Booked': return colors.info;
      case 'Completed': return colors.success;
      default: return colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Trips</Text>
          <Text style={styles.headerSubtitle}>Plan your next adventure</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.textLight} />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {plannedTrips.length + pastTrips.length}
          </Text>
          <Text style={styles.statLabel}>Total Trips</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{plannedTrips.length}</Text>
          <Text style={styles.statLabel}>Planned</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {pastTrips.reduce((sum, trip) => sum + trip.days, 0)}
          </Text>
          <Text style={styles.statLabel}>Days Traveled</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'planned' && styles.activeTab]}
          onPress={() => setActiveTab('planned')}
        >
          <Text style={[styles.tabText, activeTab === 'planned' && styles.activeTabText]}>
            Upcoming ({plannedTrips.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past Trips ({pastTrips.length})
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
        <Ionicons name="add" size={24} color={colors.textLight} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screen.horizontal,
    paddingVertical: spacing.xl,
    backgroundColor: colors.primary,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.textLight,
  },
  headerSubtitle: {
    fontSize: typography.sizes.base,
    color: colors.textLight,
    opacity: 0.8,
    marginTop: spacing.xs,
  },
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: spacing.md,
    borderRadius: borderRadius.full,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screen.horizontal,
    paddingVertical: spacing.base,
    backgroundColor: colors.surface,
    marginTop: -spacing.lg,
    marginHorizontal: spacing.base,
    borderRadius: borderRadius.lg,
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  statNumber: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.base,
    marginTop: spacing.base,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  activeTabText: {
    color: colors.textLight,
    fontWeight: typography.weights.semibold,
  },
  content: {
    flex: 1,
    padding: spacing.screen.horizontal,
  },
  tripCard: {
    borderRadius: borderRadius.lg,
    marginBottom: spacing.base,
    overflow: 'hidden',
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  tripImageBackground: {
    height: 200,
    justifyContent: 'flex-end',
  },
  tripImage: {
    borderRadius: borderRadius.lg,
  },
  tripOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: borderRadius.lg,
  },
  tripContent: {
    padding: spacing.base,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  tripInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  tripTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  tripDestination: {
    fontSize: typography.sizes.base,
    color: colors.textLight,
    opacity: 0.9,
    marginBottom: spacing.xs,
  },
  tripDate: {
    fontSize: typography.sizes.sm,
    color: colors.textLight,
    opacity: 0.8,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.textLight,
  },
  tripStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: typography.sizes.sm,
    color: colors.textLight,
    marginLeft: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  fab: {
    position: 'absolute',
    bottom: spacing['4xl'],
    right: spacing.screen.horizontal,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow.heavy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 10,
  },
});

export default MyTripsScreen;
