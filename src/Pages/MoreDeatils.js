// import React, { useState, useEffect } from "react";

// import { useCart } from '../Context/cart'
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// const ProductDetails = () => {
//   const [cart, setCart] = useCart();

//   const params = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   //initalp details
//   useEffect(() => {
//     if (params?.slug) getProduct();
//   }, [params?.slug]);

//   //getProduct
//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:5000/api/v1/product/get-product/${params.slug}`
//       );
//       setProduct(data?.products);
//       getSimilarProduct(data?.products._id, data?.products.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //get similar product
//   const getSimilarProduct = async (pid, cid) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:5000/api/v1/product/related-product/${pid}/${cid}`
//       );
//       setRelatedProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   console.log("product",product);
  
//   return (
//     <>
//       <div className="row container mt-2">
//         <div className="col-md-6">
//           <img
//             src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
//             className="card-img-top"
//             alt={product.name}
//             height="300"
//             width={"350px"}
//           />
//         </div>
//         <div className="col-md-6">
//           <h1 className="text-center text-black-50">Product Details</h1>
//           <h6 className="text-bold">Name : {product.name}</h6>
//           <h6>Description : {product.description}</h6>
//           <h6>Price : {product.price}</h6>
//           <h6>Category : {product?.category?.name}</h6>
//           <button
//                     className="btn btn-secondary add-to-cart-btn"
//                     style={{ height: "45px" }}
//                     onClick={() => {
//                       setCart([...cart, product]);
//                       localStorage.setItem(
//                         "cart",
//                         JSON.stringify([...cart, product])
//                       );
//                       toast.success("Added To Cart");
//                     }}
//                   >
//                     Add To Cart
//                   </button>
//         </div>
//       </div>
//       <hr />
//       <div className="row container">
//         <h6>Similar Products</h6>
//         {relatedProducts.length < 1 && (
//           <p className="text-center">No Similar Products found</p>
//         )}
//         <div className="d-flex flex-wrap">
//           {relatedProducts?.map((p) => (
//             <div className="card m-2" style={{ width: "18rem" }}>
//               <img
//                 src={`http://localhost:5000/api/v1/product/product-photo/${p?._id}`}
//                 className="card-img-top"
//                 alt={p.name}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{p.name}</h5>
//                 <p className="card-text">{p.description.substring(0, 30)}...</p>
//                 <p className="card-text"> $ {p.price}</p>
//                 <button
//                   className="btn btn-primary ms-1"
//                   onClick={() => navigate(`/product/${p._id}`)}
//                 >
//                   More Details
//                 </button>
//                 <button
//                     className="btn btn-secondary add-to-cart-btn"
//                     style={{ height: "45px" }}
//                     onClick={() => {
//                       setCart([...cart, p]);
//                       localStorage.setItem(
//                         "cart",
//                         JSON.stringify([...cart, p])
//                       );
//                       toast.success("Added To Cart");
//                     }}
//                   >
//                     Add To Cart
//                   </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       </>
   
//   );
// };

// export default ProductDetails;

import React, { useState, useEffect } from "react";
import { useCart } from '../Context/cart';
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.products);
      getSimilarProduct(data?.products._id, data?.products.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Similar Products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Main Container */}
      <div className="container mt-5">
        {/* Product Details Section */}
        <div className="card shadow-lg mb-5">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
                  className="img-fluid rounded"
                  alt={product.name}
                  height="300"
                  width="100%"
                />
              </div>
              <div className="col-md-6">
                <h1 className="text-center text-black-50">Product Details</h1>
                <h6 className="fw-bold">Name: {product.name}</h6>
                <h6 className="fw-bold">Description: {product.description}</h6>
                <h6 className="fw-bold">Price: ${product.price}</h6>
                <h6 className="fw-bold">Category: {product?.category?.name}</h6>
                <div className="d-flex mt-3">
                  <button
                    className="btn btn-warning me-2"
                    style={{ width: "120px" }} // Reduced width
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem("cart", JSON.stringify([...cart, product]));
                      toast.success("Added To Cart");
                    }}
                  >
                    Add To Cart
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="card shadow-lg">
          <div className="card-body">
            <h3 className="text-center text-danger mb-4">Similar Products</h3>
            {relatedProducts.length < 1 && (
              <p className="text-center">No Similar Products found</p>
            )}
            <div className="d-flex flex-wrap justify-content-center">
              {relatedProducts?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                  <img
                    src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                    <p className="card-text">$ {p.price}</p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => navigate(`/product/${p._id}`)}
                        style={{ width: "120px" }} // Reduced width
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem("cart", JSON.stringify([...cart, p]));
                          toast.success("Added To Cart");
                        }}
                        style={{ width: "120px" }} // Reduced width
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;