import { useEffect, useState } from "react";
import { apiService } from "../services/api";

export const useUnits = () => {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchUnits = async () => {
      const data = await apiService.getUnits();
      console.log("✅ Normalized units:", data);
      setUnits(data); // <-- now data is the array
    };
    fetchUnits();
  }, []);

  return { units };
};
