import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../components/PostCard';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

const { width, height } = Dimensions.get('window');

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    username: 'wanderlust_sarah',
    location: 'Bali, Indonesia',
    title: 'Magical sunset at Tanah Lot',
    description: 'One of the most beautiful sunsets I\'ve ever witnessed. The temple silhouette against the golden sky was absolutely magical! 🌅',
    imageUrl: 'https://picsum.photos/400/600?random=1',
    userAvatar: 'https://picsum.photos/40/40?random=1',
    likes: 1234,
    comments: 89,
    tags: ['#bali', '#sunset', '#temple'],
    isLiked: false,
  },
  {
    id: 2,
    username: 'adventure_mike',
    location: 'Swiss Alps',
    title: 'Epic mountain hiking adventure',
    description: 'Reached the summit after 6 hours of hiking. The view was absolutely worth every step! Nothing beats the feeling of conquering a mountain 🏔️',
    imageUrl: 'https://picsum.photos/400/600?random=2',
    userAvatar: 'https://picsum.photos/40/40?random=2',
    likes: 2156,
    comments: 156,
    tags: ['#hiking', '#mountains', '#adventure'],
    isLiked: true,
  },
  {
    id: 3,
    username: 'foodie_travels',
    location: 'Tokyo, Japan',
    title: 'Street food paradise in Shibuya',
    description: 'Exploring the incredible street food scene in Tokyo. Every bite is a new adventure! The ramen here is absolutely incredible 🍜',
    imageUrl: 'https://picsum.photos/400/600?random=3',
    userAvatar: 'https://picsum.photos/40/40?random=3',
    likes: 987,
    comments: 67,
    tags: ['#tokyo', '#streetfood', '#ramen'],
    isLiked: false,
  },
];

const InspireMeScreen = () => {
  const [activeTab, setActiveTab] = useState('forYou');
  const flatListRef = useRef(null);

  const handleLike = (postId) => {
    console.log('Liked post:', postId);
  };

  const handleComment = (postId) => {
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId) => {
    console.log('Share post:', postId);
  };

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      onLike={handleLike}
      onComment={handleComment}
      onShare={handleShare}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.backgroundDark} />

      {/* Header with tabs */}
      <SafeAreaView style={styles.header}>
        <View style={styles.tabContainer}>
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

        {/* Search and Profile Icons */}
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={24} color={colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="person-circle" size={28} color={colors.textLight} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Content area - TikTok style feed */}
      <FlatList
        ref={flatListRef}
        data={mockPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height - 100}
        snapToAlignment="start"
        decelerationRate="fast"
        style={styles.feedContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screen.horizontal,
    paddingTop: spacing.base,
    paddingBottom: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.xs,
    borderRadius: borderRadius.full,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    color: colors.textLight,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    opacity: 0.7,
  },
  activeTabText: {
    opacity: 1,
    fontWeight: typography.weights.semibold,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: spacing.base,
    padding: spacing.xs,
  },
  feedContainer: {
    flex: 1,
  },
});

export default InspireMeScreen;
