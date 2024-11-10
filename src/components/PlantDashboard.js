import React from 'react'; 
import { motion } from 'framer-motion';
import './styles/PlantDashboard.css';

function PlantDashboard({ plantData }) {
  const handleClose = () => {
    // Reload the app or manage the state as per your needs
    window.location.reload();
  };

  return (
    <motion.div
      className="plant-dashboard"
      initial={{ y: '-100%' }}   // Starts from above the screen
      animate={{ y: '0%' }}      // Animates to the normal position
      exit={{ y: '-100%' }}      // Animates out of view (if you decide to animate it away)
      transition={{
        type: 'tween',           // Use 'tween' for a more controlled animation
        duration: 0.3,           // Set a specific duration for the animation (0.5s)
        ease: 'easeOut',         // Smooth out the easing for a nice effect
      }}
    >
      <button className="close-button" onClick={handleClose}>Close</button>

      <h2>{plantData.name}</h2>
      <p><strong>Origin:</strong> {plantData.origin || 'N/A'}</p>
      <p><strong>Lifespan:</strong> {plantData.lifespan || 'N/A'}</p>
      <p><strong>Ideal Conditions:</strong> {plantData.ideal_conditions || 'N/A'}</p>
      <p><strong>Home Remedies:</strong> {plantData.home_remedies || 'Provide water regularly, keep in sunlight.'}</p>

      {/* New fields */}
      {plantData.binomial_name && <p><strong>Binomial Name:</strong> {plantData.binomial_name || 'N/A'}</p>}
      {plantData.taxon && <p><strong>Taxon:</strong> {plantData.taxon || 'N/A'}</p>}
      {plantData.companions && <p><strong>Companions:</strong> {plantData.companions || 'N/A'}</p>}
      {plantData.sun_requirements && <p><strong>Sun Requirements:</strong> {plantData.sun_requirements || 'N/A'}</p>}
      {plantData.growing_degree_days && <p><strong>Growing Degree Days:</strong> {plantData.growing_degree_days || 'N/A'}</p>}
      {plantData.sowing_method && <p><strong>Sowing Method:</strong> {plantData.sowing_method || 'N/A'}</p>}
      {plantData.spread && <p><strong>Spread:</strong> {plantData.spread || 'N/A'}</p>}
      {plantData.row_spacing && <p><strong>Row Spacing:</strong> {plantData.row_spacing || 'N/A'}</p>}
      {plantData.height && <p><strong>Height:</strong> {plantData.height || 'N/A'}</p>}

      {plantData.image_url && <img src={plantData.image_url} alt={plantData.name} />}
    </motion.div>
  );
}

export default PlantDashboard;
