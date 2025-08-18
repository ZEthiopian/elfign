import { createContext, useState } from 'react';

// Import local images
import imgA from 'assets/A.png';
import imgB from 'assets/B.png';
import imgC from 'assets/C.png';
import imgD from 'assets/D.png';
import imgE from 'assets/E.png';
import imgF from 'assets/F.png';

export const UnitContext = createContext();

const unitTypes = {
  A: {
    type: '1 BED, 1 BATH',
    size: '67.8M²',
    description: 'Modern Sanctuary | 1 Bed, 1 Bath',
    features: [
      'Elegant bathroom',
      'Dedicated Dressing Area',
      'Garbage Shooter',
      'City Center'
    ],
    price: 85000,
    image: imgA
  },
  B: {
    type: '3 BED, 2 BATH',
    size: '172.4M²',
    description: 'Expansive Family Haven | 3 Bed, 2 Bath',
    features: [
      '3 Spacious Bedrooms',
      'Laundry Area',
      'Family-friendly layout',
      'Central location in Addis Ababa'
    ],
    price: 175000,
    image: imgB
  },
  C: {
    type: 'Coming Soon',
    size: 'TBD',
    description: 'To be added',
    features: [],
    price: null,
    image: imgC
  },
  D: {
    type: 'Coming Soon',
    size: 'TBD',
    description: 'To be added',
    features: [],
    price: null,
    image: imgD
  },
  E: {
    type: 'Coming Soon',
    size: 'TBD',
    description: 'To be added',
    features: [],
    price: null,
    image: imgE
  },
  F: {
    type: '3 BED, 2 BATH',
    size: '142.3M²',
    description: 'Refined Entertainer’s Retreat | 3 Bed, 2 Bath',
    features: [
      '3 spacious bedrooms',
      'Dedicated laundry room',
      'Elegant bathroom',
      'Close to AU, Bole'
    ],
    price: 160000,
    image: imgF
  }
};

// Generate all units dynamically for each floor
const generateUnits = () => {
  const units = [];
  for (let floor = 1; floor <= 17; floor++) {
    for (let type of ['A', 'B', 'C', 'D', 'E', 'F']) {
      units.push({
        id: `${type}${floor}`,
        floor,
        sold: false,
        ...unitTypes[type]
      });
    }
  }
  return units;
};

export const UnitProvider = ({ children }) => {
  const [units, setUnits] = useState(generateUnits());

  const toggleSoldStatus = (unitId) => {
    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === unitId ? { ...unit, sold: !unit.sold } : unit
      )
    );
  };

  return (
    <UnitContext.Provider value={{ units, toggleSoldStatus }}>
      {children}
    </UnitContext.Provider>
  );
};
