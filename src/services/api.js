import axios from "axios";

const API_BASE = 'https://meseretplc.derensra.com/api';
const IMAGES_BASE = 'https://meseretplc.derensra.com/uploads';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use(config => {
  console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Response interceptor
api.interceptors.response.use(
  response => {
    console.log(`✅ API Response: ${response.status}`);
    return response;
  },
  error => {
    console.error(`❌ API Error:`, error.message);
    return Promise.reject(error);
  }
);

// -----------------------------
// Fetch all units
// -----------------------------
export const fetchUnits = async () => {
  try {
    const response = await api.get('/units');
    if (response.data?.status === "OK" && Array.isArray(response.data.units)) {
      return response.data.units.map(unit => ({
        ...unit,
        imageUrl: unit.image
          ? `${IMAGES_BASE}/${unit.image.replace('.jpg', '.png')}`
          : null
      }));
    }
    throw new Error('Invalid response format from server');
  } catch (error) {
    console.error('Error fetching units:', error);
    throw error;
  }
};

// -----------------------------
// Fetch single unit by ID
// -----------------------------
export const fetchUnitById = async (unitId) => {
  try {
    const response = await api.get(`/units/${unitId}`);
    if (response.data?.status === "OK" && response.data.unit) {
      const unit = response.data.unit;
      return {
        ...unit,
        imageUrl: unit.image
          ? `${IMAGES_BASE}/${unit.image.replace('.jpg', '.png')}`
          : null
      };
    }
    throw new Error('Unit not found or invalid response format');
  } catch (error) {
    console.error(`Error fetching unit ${unitId}:`, error);
    throw error;
  }
};

// -----------------------------
// Toggle unit sold/available
// -----------------------------
export const toggleUnitStatus = async (unitId) => {
  try {
    const response = await api.put(`/units/${unitId}/toggle-status`);
    if (response.data?.status === "OK" && response.data.unit) {
      return response.data.unit;
    }
    throw new Error('Failed to toggle unit status');
  } catch (error) {
    console.error(`Error toggling status for unit ${unitId}:`, error);
    throw error;
  }
};

export default api;
