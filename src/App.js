import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import PlantDashboard from './components/PlantDashboard';

function App() {
  const [plantName, setPlantName] = useState('');
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dummy array of plant data with 25+ plants (as before)
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
    // 
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
    {
      name: 'Mint',
      origin: 'Europe, Asia',
      lifespan: 'Perennial',
      ideal_conditions: 'Moist, well-drained soil, part shade',
      home_remedies: 'Used in teas for digestion',
      binomial_name: 'Mentha spp.',
      taxon: 'Lamiaceae',
      companions: 'Carrots, tomatoes',
      sun_requirements: 'Partial sun',
      growing_degree_days: '1500-2000',
      sowing_method: 'By seed',
      spread: 'Up to 1 foot',
      row_spacing: '6 inches',
      height: 'Up to 2 feet',
      image_url: 'https://example.com/mint.jpg',
    },
    {
      name: 'Lavender',
      origin: 'Mediterranean',
      lifespan: 'Perennial',
      ideal_conditions: 'Full sun, well-drained soil',
      home_remedies: 'Used in aromatherapy',
      binomial_name: 'Lavandula angustifolia',
      taxon: 'Lamiaceae',
      companions: 'Roses, thyme',
      sun_requirements: 'Full sun',
      growing_degree_days: '1500-2200',
      sowing_method: 'By seed',
      spread: 'Up to 2 feet',
      row_spacing: '1 foot',
      height: 'Up to 3 feet',
      image_url: 'https://example.com/lavender2.jpg',
    },
    {
      name: 'Orchid',
      origin: 'Tropical Asia and the Americas',
      lifespan: 'Several years',
      ideal_conditions: 'Well-drained, orchid mix, indirect light',
      home_remedies: 'Used in traditional medicine for its calming properties',
      binomial_name: 'Orchidaceae spp.',
      taxon: 'Orchidaceae',
      companions: 'Ferns, moss',
      sun_requirements: 'Indirect light',
      growing_degree_days: '1500-2000',
      sowing_method: 'By cutting or division',
      spread: 'Up to 2 feet',
      row_spacing: '1 foot',
      height: 'Up to 1 foot',
      image_url: 'https://example.com/orchid.jpg',
    },
    {
      name: 'Cactus',
      origin: 'North and South America',
      lifespan: '10+ years',
      ideal_conditions: 'Dry, sandy soil, full sun',
      home_remedies: 'Used in traditional medicine for wound healing',
      binomial_name: 'Cactaceae spp.',
      taxon: 'Cactaceae',
      companions: 'None (solitary)',
      sun_requirements: 'Full sun',
      growing_degree_days: '2000-3000',
      sowing_method: 'By seed',
      spread: 'Up to 1 foot',
      row_spacing: '6 inches',
      height: 'Up to 4 feet',
      image_url: 'https://example.com/cactus.jpg',
    },
    {
      name: 'Daffodil',
      origin: 'Europe, North Africa',
      lifespan: 'Perennial',
      ideal_conditions: 'Well-drained soil, full sun',
      home_remedies: 'Not typically used for remedies',
      binomial_name: 'Narcissus spp.',
      taxon: 'Amaryllidaceae',
      companions: 'Tulips, hyacinths',
      sun_requirements: 'Full sun',
      growing_degree_days: '1500-1800',
      sowing_method: 'By bulb',
      spread: 'Up to 1 foot',
      row_spacing: '8 inches',
      height: 'Up to 1 foot',
      image_url: 'https://example.com/daffodil.jpg',
    },
    {
      name: 'Begonia',
      origin: 'Tropical Asia',
      lifespan: 'Perennial',
      ideal_conditions: 'Moist, well-drained soil, indirect light',
      home_remedies: 'Used for cosmetic purposes',
      binomial_name: 'Begonia spp.',
      taxon: 'Begoniaceae',
      companions: 'Ferns, coleus',
      sun_requirements: 'Partial sun',
      growing_degree_days: '1500-2000',
      sowing_method: 'By cutting',
      spread: 'Up to 1 foot',
      row_spacing: '8 inches',
      height: 'Up to 1.5 feet',
      image_url: 'https://example.com/begonia.jpg',
    },
  ];

  const handleSearch = async () => {
    if (plantName) {
      setLoading(true);

      try {
        // Try fetching data from the backend API
        const response = await axios.get(`https://your-backend-api.com/plants?name=${plantName}`);
        
        // If plant found in backend, set the plant data
        if (response.data) {
          setPlantData(response.data);
        } else {
          throw new Error('Plant not found in backend');
        }
      } catch (error) {
        // If an error occurs (e.g., plant not found or network issue), fallback to the dummy array
        console.log('Error fetching from backend, using dummy data', error);
        const foundPlant = dummyPlants.find(plant => plant.name.toLowerCase() === plantName.toLowerCase());
        if (foundPlant) {
          setPlantData(foundPlant);
        } else {
          alert('Plant not found in dummy data!');
        }
      }

      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          value={plantName}
          onChange={e => setPlantName(e.target.value)}
          placeholder="Search for a plant..."
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {plantData && <PlantDashboard plant={plantData} />}
    </div>
  );
}

export default App;

   
     
     
    
      
  
     

  
         
