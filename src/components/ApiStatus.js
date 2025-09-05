import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { apiService } from '../services/api';

const ApiStatus = () => {
  const [status, setStatus] = useState('checking');
  const [lastChecked, setLastChecked] = useState(null);

  const checkApiStatus = async () => {
    try {
      setStatus('checking');
      const health = await apiService.healthCheck();
      setStatus('online');
      setLastChecked(new Date());
    } catch (error) {
      setStatus('offline');
      console.error('API status check failed:', error);
    }
  };

  useEffect(() => {
    checkApiStatus();
    // Check every 30 seconds
    const interval = setInterval(checkApiStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'online': return '#4CAF50';
      case 'offline': return '#F44336';
      case 'checking': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
      <Text style={styles.statusText}>
        API: {status.toUpperCase()}
      </Text>
      {lastChecked && (
        <Text style={styles.timeText}>
          Last checked: {lastChecked.toLocaleTimeString()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    margin: 5,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#333',
  },
  timeText: {
    fontSize: 10,
    color: '#666',
  },
});

export default ApiStatus;