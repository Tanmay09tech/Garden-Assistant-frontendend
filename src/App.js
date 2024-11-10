import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import PlantDashboard from './PlantDashboard';

function App() {
  const [plantName, setPlantName] = useState('');
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dummy array of plant data
  const dummyPlants = [
    {
      name: 'Aloe Vera',
      origin: 'Arabian Peninsula',
      lifespan: '5-25 years',
      ideal_conditions: 'Sunny, dry conditions',
      home_remedies: 'Used for skin care and burns',
      binomial_name: 'Aloe barbadensis miller',
      taxon: 'Liliaceae',
      companions: 'Cabbage, carrots',
      sun_requirements: 'Full sun',
      growing_degree_days: '1500-2000',
      sowing_method: 'By seed',
      spread: 'Up to 3 feet',
      row_spacing: '2 feet',
      height: 'Up to 1.5 feet',
      image_url: 'https://example.com/aloe-vera.jpg',
    },
    {
      name: 'Tulip',
      origin: 'Central Asia',
      lifespan: '1-2 years (bulb)',
      ideal_conditions: 'Cold winters, well-drained soil',
      home_remedies: 'Used for decorative purposes',
      binomial_name: 'Tulipa gesneriana',
      taxon: 'Liliaceae',
      companions: 'Pansies, primroses',
      sun_requirements: 'Full sun',
      growing_degree_days: '1200-1600',
      sowing_method: 'By bulb',
      spread: 'Up to 1 foot',
      row_spacing: '6 inches',
      height: 'Up to 2 feet',
      image_url: 'https://example.com/tulip.jpg',
    },
  ];

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://garden-assistant-backend.onrender.com/api/plants/${plantName}/`);
      setPlantData(response.data);
    } catch (error) {
      console.error('Error fetching plant data:', error);
      // In case of an error, fall back to the dummy data
      const plant = dummyPlants.find((plant) => plant.name.toLowerCase() === plantName.toLowerCase());
      setPlantData(plant);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Gardening Assistant</h1>
      <div className="search-bar">
        <input
          type="text"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
          placeholder="Enter plant name here"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* If plant data is fetched, show PlantDashboard */}
      {plantData && !loading && (
        <PlantDashboard plantData={plantData} />
      )}
    </div>
  );
}

export default App;

         
