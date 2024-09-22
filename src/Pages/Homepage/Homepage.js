import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./Homepage.css";

const Homepage = () => {
  const images = [
    'https://image.etashee.com/images/category/men/men-banner.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/8c7ab567916941.5b4b0d3d3a7b7.jpg',
    'https://i.pinimg.com/originals/b8/ce/12/b8ce12af4e594bcb26b8f55b0377dad4.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="first-container">
        <div className="slider-container">
          <img
            src={images[currentIndex]}
            alt="Slider"
            className="slider-image"
          />
        </div>
        <div className="homepage-btn">
          <Link to="/shop">
            <button className="shop-now">Shop Now</button>
          </Link>
        </div>
      </div>

      <div className="second-container">
        <h1 className="second-heading">Explore by Categories</h1>
        <hr />
        <div className="slider-buttons">
        <Link to="/shop">
            <button className="slider-button">Men Fashion</button>
          </Link><Link to="/shop">
            <button className="slider-button">Women Fashion</button>
          </Link><Link to="/shop">
            <button className="slider-button">Kid Fashion</button>
          </Link><Link to="/shop">
            <button className="slider-button">Watches</button>
          </Link>
        </div>
        <div className="category-container">
          <img
            src="https://images.pexels.com/photos/5935738/pexels-photo-5935738.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="men-summer"
          />
          <img
            src="https://images.pexels.com/photos/1877736/pexels-photo-1877736.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="women-winter"
          />
          <img
            src="https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="kid-summer"
          />
          <img
            src="https://images.pexels.com/photos/1697219/pexels-photo-1697219.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="women-winter"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
