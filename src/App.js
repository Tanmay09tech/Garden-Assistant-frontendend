import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import PlantDashboard from './components/PlantDashboard';

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
    {
      name: 'Rose',
      origin: 'Asia, Europe, North America',
      lifespan: '2-5 years',
      ideal_conditions: 'Well-drained, slightly acidic soil, full sun',
      home_remedies: 'Used for skin care, soothing, and relaxation',
      binomial_name: 'Rosa spp.',
      taxon: 'Rosaceae',
      companions: 'Lavender, oregano',
      sun_requirements: 'Full sun',
      growing_degree_days: '1500-2500',
      sowing_method: 'By cutting or seed',
      spread: 'Up to 6 feet',
      row_spacing: '2 feet',
      height: 'Up to 5 feet',
      image_url: 'https://example.com/rose.jpg',
    },
    {
      name: 'Marigold',
      origin: 'Mexico, Central America',
      lifespan: '1 year',
      ideal_conditions: 'Full sun, well-drained soil',
      home_remedies: 'Used in treating skin infections',
      binomial_name: 'Tagetes erecta',
      taxon: 'Asteraceae',
      companions: 'Tomatoes, peppers',
      sun_requirements: 'Full sun',
      growing_degree_days: '1500-2000',
      sowing_method: 'By seed',
      spread: 'Up to 2 feet',
      row_spacing: '1 foot',
      height: 'Up to 2 feet',
      image_url: 'https://example.com/marigold.jpg',
    },
    {
      name: 'Sunflower',
      origin: 'North America',
      lifespan: '1 year',
      ideal_conditions: 'Full sun, well-drained soil',
      home_remedies: 'Seeds used for oil and snacks',
      binomial_name: 'Helianthus annuus',
      taxon: 'Asteraceae',
      companions: 'Corn, cucumbers',
      sun_requirements: 'Full sun',
      growing_degree_days: '1500-2500',
      sowing_method: 'By seed',
      spread: 'Up to 3 feet',
      row_spacing: '1 foot',
      height: 'Up to 10 feet',
      image_url: 'https://example.com/sunflower.jpg',
    },
    {
      name: 'Jasmine',
      origin: 'Asia, Europe',
      lifespan: '3-5 years',
      ideal_conditions: 'Well-drained soil, full sun to part shade',
      home_remedies: 'Used for aromatherapy, relaxation',
      binomial_name: 'Jasminum spp.',
      taxon: 'Oleaceae',
      companions: 'Roses, lavender',
      sun_requirements: 'Full sun',
      growing_degree_days: '1500-2200',
      sowing_method: 'By cutting or seed',
      spread: 'Up to 3 feet',
      row_spacing: '2 feet',
      height: 'Up to 6 feet',
      image_url: 'https://example.com/jasmine.jpg',
    },
    {
      name: 'Lavender',
      origin: 'Mediterranean',
      lifespan: '2-3 years',
      ideal_conditions: 'Dry, well-drained soil, full sun',
      home_remedies: 'Used for relaxation, stress relief',
      binomial_name: 'Lavandula angustifolia',
      taxon: 'Lamiaceae',
      companions: 'Rosemary, thyme',
      sun_requirements: 'Full sun',
      growing_degree_days: '1500-2200',
      sowing_method: 'By seed',
      spread: 'Up to 2 feet',
      row_spacing: '1 foot',
      height: 'Up to 3 feet',
      image_url: 'https://example.com/lavender.jpg',
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
