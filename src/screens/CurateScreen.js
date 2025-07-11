import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

// Mock curated experiences data
const mockExperiences = [
  {
    id: 1,
    title: 'Sunset Yoga in Ubud',
    location: 'Ubud, Bali',
    price: 25,
    rating: 4.8,
    duration: '1.5 hours',
    category: 'Wellness',
    image: 'https://picsum.photos/300/200?random=1',
    tags: ['Yoga', 'Sunset', 'Meditation'],
  },
  {
    id: 2,
    title: 'Street Food Tour',
    location: 'Bangkok, Thailand',
    price: 35,
    rating: 4.9,
    duration: '3 hours',
    category: 'Food',
    image: 'https://picsum.photos/300/200?random=2',
    tags: ['Food', 'Culture', 'Local'],
  },
  {
    id: 3,
    title: 'Volcano Hiking Adventure',
    location: 'Mount Batur, Bali',
    price: 45,
    rating: 4.7,
    duration: '6 hours',
    category: 'Adventure',
    image: 'https://picsum.photos/300/200?random=3',
    tags: ['Hiking', 'Sunrise', 'Adventure'],
  },
];

const CurateScreen = () => {
  const [budget, setBudget] = useState('');
  const [distance, setDistance] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Adventure', 'Food', 'Wellness', 'Culture', 'Nature'];

  const renderExperienceCard = ({ item }) => (
    <TouchableOpacity style={styles.experienceCard}>
      <Image source={{ uri: item.image }} style={styles.experienceImage} />
      <View style={styles.experienceContent}>
        <View style={styles.experienceHeader}>
          <Text style={styles.experienceTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={colors.accent} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.experienceDetails}>
          <Text style={styles.location}>
            <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
            {' '}{item.location}
          </Text>
          <Text style={styles.duration}>
            <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
            {' '}{item.duration}
          </Text>
        </View>
        <View style={styles.experienceFooter}>
          <Text style={styles.price}>${item.price}</Text>
          <View style={styles.tagsContainer}>
            {item.tags.slice(0, 2).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Curate</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons
            name={showFilters ? "close" : "options"}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Customize Your Experience</Text>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Budget Range</Text>
            <View style={styles.budgetContainer}>
              <TextInput
                style={styles.filterInput}
                placeholder="Min $"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
                placeholderTextColor={colors.textTertiary}
              />
              <Text style={styles.budgetSeparator}>to</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Max $"
                keyboardType="numeric"
                placeholderTextColor={colors.textTertiary}
              />
            </View>
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Distance</Text>
            <TextInput
              style={[styles.filterInput, styles.fullWidthInput]}
              placeholder="Within miles of your location"
              value={distance}
              onChangeText={setDistance}
              keyboardType="numeric"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategoryButton
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.activeCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Curated Experiences */}
      <FlatList
        data={mockExperiences}
        renderItem={renderExperienceCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.experiencesList}
      />
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
    paddingVertical: spacing.base,
    backgroundColor: colors.surface,
    shadowColor: colors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  filterButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryLight + '20',
  },
  filtersContainer: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    marginHorizontal: spacing.base,
    marginVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  filtersTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  filterRow: {
    marginBottom: spacing.lg,
  },
  filterLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetSeparator: {
    marginHorizontal: spacing.md,
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
  },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    fontSize: typography.sizes.base,
    backgroundColor: colors.surface,
  },
  fullWidthInput: {
    flex: 0,
    width: '100%',
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.base,
    alignItems: 'center',
    marginTop: spacing.base,
  },
  applyButtonText: {
    color: colors.textLight,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
  categoriesContainer: {
    maxHeight: 60,
    marginVertical: spacing.sm,
  },
  categoriesContent: {
    paddingHorizontal: spacing.screen.horizontal,
  },
  categoryButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeCategoryButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  activeCategoryText: {
    color: colors.textLight,
  },
  experiencesList: {
    padding: spacing.screen.horizontal,
  },
  experienceCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.base,
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  experienceImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  experienceContent: {
    padding: spacing.base,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  experienceTitle: {
    flex: 1,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
  },
  experienceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  location: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  duration: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  experienceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: colors.primaryLight + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.xs,
  },
  tagText: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
});

export default CurateScreen;
