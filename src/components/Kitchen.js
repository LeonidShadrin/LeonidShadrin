import React from 'react';
import KitchenImg from '../public/img/Kitchen.png'; 

function Kitchen() {
  return (
    <div className="AboutUs">
      <h1>Черговий частини</h1>
      <div>
        <img  width={"90%"} src={KitchenImg} alt="promo" /> 
      </div>
    </div>
  );
}

export default Kitchen;
