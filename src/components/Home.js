import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import './Home.css';

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="Home">
      <h1>Ласкаво просимо до нашої військової частини</h1>
      <p>Тут ви знайдете інформацію про нашу діяльність, історію та досягнення.</p>

      <div className="carousel">
        <Slider {...settings}>
          <div>
            <img src="http://localhost:3000/res/img/b048d90b-d6d6a6ac3ebcbe00c0618fc28ed241a3.jpg" alt="promo" />
          </div>
          <div>
            <img src="http://localhost:3000/res/img/o_1drcr15ca1vcci2p1b4tq09178d4a.jpg" alt="promo" />
          </div>
          <div>
            <img src="http://localhost:3000/res/img/o_1ej0cg2uo41e5sc15hccvh16te1r.jpg" alt="promo" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Home;
