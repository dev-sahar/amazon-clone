import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Product from '../product/product.component';

import products from './home.products';
import './home.styles.css';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__container'>
        {/* Hero Carousel */}
        <Carousel className='home__carousel'>
          <Carousel.Item>
            <img
              className='home__image d-block w-100'
              src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2021/NYNY/Fuji_TallHero_NYNY_en_US_1x._CB412256579_.jpg'
              alt='Home Hero'
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='home__image d-block w-100'
              src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
              alt='Home Hero'
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='home__image d-block w-100'
              src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Beauty_v2_en_US_1x._CB429089975_.jpg'
              alt='Home Hero'
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='home__image d-block w-100'
              src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Home_v2_en_US_1x._CB429090084_.jpg'
              alt='Home Hero'
            />
          </Carousel.Item>
        </Carousel>

        {/* Products Preview */}
        <div className='home__rowsContainer'>
          {products.map(({ id, title, price, rating, image }, index) => {
            const classNameModified = 'home__item' + index;
            return (
              <div className={classNameModified}>
                <Product
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  rating={rating}
                  image={image}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
