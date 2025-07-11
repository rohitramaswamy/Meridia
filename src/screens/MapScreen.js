import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Mock local experiences data
  const localExperiences = [
    {
      id: 1,
      title: 'Golden Gate Bridge',
      latitude: 37.8199,
      longitude: -122.4783,
      type: 'landmark',
    },
    {
      id: 2,
      title: 'Fisherman\'s Wharf',
      latitude: 37.8080,
      longitude: -122.4177,
      type: 'attraction',
    },
    {
      id: 3,
      title: 'Alcatraz Island',
      latitude: 37.8267,
      longitude: -122.4233,
      type: 'historical',
    },
  ];

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to show nearby experiences');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const getMarkerColor = (type) => {
    switch (type) {
      case 'landmark': return '#FF6B6B';
      case 'attraction': return '#4ECDC4';
      case 'historical': return '#45B7D1';
      default: return '#007AFF';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Local Experiences</Text>
        <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
          <Ionicons name="location" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Map */}
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {localExperiences.map((experience) => (
          <Marker
            key={experience.id}
            coordinate={{
              latitude: experience.latitude,
              longitude: experience.longitude,
            }}
            title={experience.title}
            description={`Type: ${experience.type}`}
            pinColor={getMarkerColor(experience.type)}
          />
        ))}
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
          <Text style={styles.legendText}>Landmarks</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#4ECDC4' }]} />
          <Text style={styles.legendText}>Attractions</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#45B7D1' }]} />
          <Text style={styles.legendText}>Historical</Text>
        </View>
      </View>
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
  locationButton: {
    padding: 5,
  },
  map: {
    flex: 1,
  },
  legend: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#333',
  },
});

export default MapScreen;
