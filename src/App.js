import React, { useState } from 'react';
import axios from 'axios';
import PlantDashboard from './components/PlantDashboard'; // Importing PlantDashboard component
import './App.css';

function App() {
  const [plantName, setPlantName] = useState('');
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://garden-assistant-backend.onrender.com/api/plants/${plantName}/`);
      setPlantData(response.data);
    } catch (error) {
      console.error('Error fetching plant data:', error);
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
