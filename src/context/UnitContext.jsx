import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchUnits, updateUnitPrice, toggleUnitStatus } from '../services/api';

export const UnitContext = createContext();

export const UnitProvider = ({ children }) => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadUnits = async () => {
    setLoading(true);
    try {
      const data = await fetchUnits();
      setUnits(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load units');
    } finally {
      setLoading(false);
    }
  };

  const refreshUnits = async () => {
    setRefreshing(true);
    await loadUnits();
    setRefreshing(false);
  };

  useEffect(() => { loadUnits(); }, []);

  const getUnitsGroupedByFloor = () => {
    const grouped = units.reduce((acc, unit) => {
      const key = `Floor ${unit.floor}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(unit);
      return acc;
    }, {});
    return Object.entries(grouped).map(([title, data]) => ({ title, data }));
  };

  const getUniqueFloors = () => [...new Set(units.map(u => u.floor))].sort((a,b)=>a-b);

  // Update unit price
  const handleUpdatePrice = async (unitId, price) => {
    const updatedUnit = await updateUnitPrice(unitId, price);
    setUnits(prev => prev.map(u => u.id === unitId ? updatedUnit : u));
  };

  // Toggle sold/available
  const handleToggleSold = async (unitId) => {
    const updatedUnit = await toggleUnitStatus(unitId);
    setUnits(prev => prev.map(u => u.id === unitId ? updatedUnit : u));
  };

  // Get single unit
  const getUnitById = (id) => units.find(u => u.id === id);

  return (
    <UnitContext.Provider value={{
      units,
      loading,
      error,
      refreshing,
      refreshUnits,
      getUnitsGroupedByFloor,
      getUniqueFloors,
      updateUnitPrice: handleUpdatePrice,
      toggleSoldStatus: handleToggleSold,
      getUnitById
    }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnits = () => useContext(UnitContext);
