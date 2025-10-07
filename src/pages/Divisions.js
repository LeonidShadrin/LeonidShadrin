import React from 'react';
import DivisionsImg from '../public/img/Divisions.png'; 

function Kitchen() {
  return (
    <div className="AboutUs">
      <h1>Чергування по підрозділах</h1>
      <div>
        <img  width={"90%"} src={DivisionsImg} alt="no_image" /> 
      </div>
    </div>
  );
}

export default Kitchen;
