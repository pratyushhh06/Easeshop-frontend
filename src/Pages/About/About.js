import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className='about-container'>
      <div className='about-card welcome-card'>
        <img src='https://cdn.dribbble.com/users/879059/screenshots/4198596/ksam_office_by_joakim_agervald.gif' alt='welcome-pic' className='about-image' />
        <div className='about-content'>
          <h1 className='about-heading'>Welcome to Shopease</h1>
          <p>
            Your ultimate destination for premium online shopping! At Shopease, we’re committed to transforming your shopping experience by offering a curated selection of high-quality products across a wide range of categories.
          </p>
        </div>
      </div>

      <div className='about-card mission-card'>
        <div className='about-content'>
          <h1 className='about-heading'>Mission</h1>
          <p>
            Our mission at Shopease is to deliver unparalleled value and satisfaction to our customers through a combination of exceptional products and top-notch service. We strive to exceed expectations by offering a diverse array of high-quality items that cater to various tastes and needs.
          </p>
        </div>
        <img src='https://tse2.mm.bing.net/th?id=OIP.KlNlGjWBb0mScNgnX9UxjwHaFj&pid=Api&P=0&h=180' alt='mission-pic' className='about-image' />
      </div>

      <div className='about-card reliability-card'>
        <img src='https://cdn.dribbble.com/users/2065768/screenshots/4438259/whatwedo---dribbble.gif' alt='reliability-pic' className='about-image' />
        <div className='about-content'>
          <h1 className='about-heading'>Reliability</h1>
          <p>
            At Shopease, reliability is at the heart of everything we do. We understand that trust is essential when shopping online, which is why we prioritize the security and accuracy of every transaction. Our rigorous quality control processes ensure that every product meets our high standards before it reaches you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
