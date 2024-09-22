import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/get-product"
      );
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
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h1 className="text-center">All Products List</h1>
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <Link
              to={`/dashboard/admin/product/${p._id}`}
              key={p._id}
              className="text-dark"
            >
              <div className="card m-2" style={{ width: "18rem",  }}>
                <img
                  src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                </div>
              </div>
            </Link>






          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
