// src/components/HealthCheck.js
import React, { useState, useEffect } from 'react';
import { checkHealth } from '../services/api';

const HealthCheck = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkServerHealth = async () => {
    setLoading(true);
    try {
      const healthData = await checkHealth();
      setHealth(healthData);
    } catch (error) {
      setHealth({ status: 'ERROR', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h3>Server Health Check</h3>
      <button onClick={checkServerHealth} disabled={loading}>
        {loading ? 'Checking...' : 'Check Server Health'}
      </button>
      
      {health && (
        <div style={{ marginTop: '15px', padding: '10px', background: health.status === 'OK' ? '#d4edda' : '#f8d7da' }}>
          <strong>Status:</strong> {health.status}<br/>
          <strong>Message:</strong> {health.message}<br/>
          {health.units && <><strong>Units:</strong> {health.units}<br/></>}
          {health.timestamp && <><strong>Time:</strong> {new Date(health.timestamp).toLocaleString()}</>}
        </div>
      )}
    </div>
  );
};

export default HealthCheck;