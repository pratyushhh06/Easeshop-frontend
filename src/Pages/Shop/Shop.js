import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import prices from "../../Components/prices";
import "./Shop.css"; // Custom CSS file
import { json, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/cart";
import { toast } from "react-toastify";

const Shop = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    console.log(value, id);

    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shop-container container-fluid row mt-3">
      <div className="filters col-md-2">
        <h4 className="text-center">Filter By Category</h4>
        <div className="category-filter d-flex flex-column">
          {categories?.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c?.name}
            </Checkbox>
          ))}
        </div>
        <h4 className="text-center mt-4">Filter By Price</h4>
        <div className="price-filter d-flex flex-column">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {prices?.map((p) => (
              <div key={p._id}>
                <Radio value={p.array}>{p?.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <div className="d-flex flex-column mt-3">
          <button
            className="btn btn-danger reset-btn"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>
      </div>
      <div className="products col-md-9">
        <h1 className="text-center">All Products</h1>
        <div className="product-list d-flex flex-wrap align-tems-center justify-content-center">
          {products?.map((p) => (
            <div
              className="card product-card m-2"
              style={{ width: "18rem" }}
              key={p._id}
            >
              <img
                src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p?.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p?.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text d-flex gap-2 text-success">
                  {" "}
                  ₹{p.price}
                </p>

                <div
                  className="d-flex align-items-center gap-4"
                  style={{ gap: "10px" }}
                >
                {console.log(p)
                }
                  <button
                    className="btn btn-primary more-details-btn"
                    style={{ height: "45px" }}
                    onClick={() => navigate(`/product/${p._id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-secondary add-to-cart-btn"
                    style={{ height: "45px" }}
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Added To Cart");
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="m-2 p-3 text-center">
          {products && products.length < total && (
            <button
              className="btn btn-warning load-more-btn"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading ..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
