import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CurateScreen = () => {
  const [budget, setBudget] = useState('');
  const [distance, setDistance] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Curate</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="options" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Budget ($)</Text>
            <TextInput
              style={styles.filterInput}
              placeholder="Max budget"
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Distance (miles)</Text>
            <TextInput
              style={styles.filterInput}
              placeholder="Max distance"
              value={distance}
              onChangeText={setDistance}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content area */}
      <ScrollView style={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Personalized Curation</Text>
          <Text style={styles.placeholderSubtext}>
            AI-powered recommendations based on your preferences
          </Text>
          <Text style={styles.placeholderSubtext}>
            • Budget-friendly options
          </Text>
          <Text style={styles.placeholderSubtext}>
            • Distance-based filtering
          </Text>
          <Text style={styles.placeholderSubtext}>
            • Personalized algorithm
          </Text>
          <Text style={styles.placeholderSubtext}>
            • Similar to Inspire Me but more targeted
          </Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    padding: 5,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  placeholder: {
    alignItems: 'center',
    padding: 40,
    marginTop: 50,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  placeholderSubtext: {
    color: '#666',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default CurateScreen;
