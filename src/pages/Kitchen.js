import React from 'react';
import KitchenImg from '../public/img/Kitchen.png'; 

function Kitchen() {
  return (
    <div className="AboutUs">
      <h1>Черговий кухні</h1>
      <div>
        <img  width={"90%"} src={KitchenImg} alt="no_image" /> 
      </div>
    </div>
  );
}

export default Kitchen;
