import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

const { width, height } = Dimensions.get('window');

const PostCard = ({ post, onLike, onComment, onShare }) => {
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike && onLike(post.id);
  };

  return (
    <View style={styles.container}>
      {/* Background Image/Video */}
      <ImageBackground
        source={{ uri: post?.imageUrl || 'https://picsum.photos/400/600' }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />
        
        {/* Content Overlay */}
        <View style={styles.contentContainer}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <Image
              source={{ uri: post?.userAvatar || 'https://picsum.photos/40/40' }}
              style={styles.userAvatar}
            />
            <View style={styles.userDetails}>
              <Text style={styles.username}>@{post?.username || 'traveler'}</Text>
              <Text style={styles.location}>
                <Ionicons name="location" size={12} color={colors.textLight} />
                {' '}{post?.location || 'Bali, Indonesia'}
              </Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>

          {/* Post Content */}
          <View style={styles.postContent}>
            <Text style={styles.postTitle}>
              {post?.title || 'Amazing sunset at Tanah Lot Temple'}
            </Text>
            <Text style={styles.postDescription}>
              {post?.description || 'One of the most beautiful sunsets I\'ve ever witnessed. The temple silhouette against the golden sky was absolutely magical! 🌅'}
            </Text>
            
            {/* Tags */}
            <View style={styles.tagsContainer}>
              {(post?.tags || ['#bali', '#sunset', '#temple']).map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={24} 
                color={isLiked ? colors.like : colors.textLight} 
              />
              <Text style={styles.actionText}>{post?.likes || 1234}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={() => onComment && onComment(post.id)}>
              <Ionicons name="chatbubble-outline" size={24} color={colors.textLight} />
              <Text style={styles.actionText}>{post?.comments || 89}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={() => onShare && onShare(post.id)}>
              <Ionicons name="share-outline" size={24} color={colors.textLight} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bookmark-outline" size={24} color={colors.textLight} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height - 100, // Account for tab bar
    backgroundColor: colors.backgroundDark,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundImageStyle: {
    borderRadius: 0,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  contentContainer: {
    padding: spacing.screen.horizontal,
    paddingBottom: spacing['4xl'],
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.textLight,
  },
  userDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  username: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.textLight,
  },
  location: {
    fontSize: typography.sizes.sm,
    color: colors.textLight,
    opacity: 0.8,
    marginTop: 2,
  },
  followButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  followButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textLight,
  },
  postContent: {
    marginBottom: spacing.xl,
  },
  postTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textLight,
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeights.tight * typography.sizes.xl,
  },
  postDescription: {
    fontSize: typography.sizes.base,
    color: colors.textLight,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.base,
    marginBottom: spacing.base,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  tagText: {
    fontSize: typography.sizes.sm,
    color: colors.textLight,
    fontWeight: typography.weights.medium,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xl,
  },
  actionText: {
    fontSize: typography.sizes.sm,
    color: colors.textLight,
    marginLeft: spacing.xs,
    fontWeight: typography.weights.medium,
  },
});

export default PostCard;
