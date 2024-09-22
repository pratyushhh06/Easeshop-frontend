import React from 'react'
import { useSearch } from '../../Context/search';


const Search = () => {
  const [values, setValues] = useSearch();
 
  return (
    <div>
      <div className="conatiner">
        <div className='text-center'>
            <h1>Search Results</h1>

            <h6>
                {values?.results.length <1
                ? "No Products Found"
              : `Found ${values?.results.length}`}
            </h6>
            <div className="product-list d-flex flex-wrap align-tems-center justify-content-center">
  {values?.results.map((p) => (
    <div className="card product-card m-2" style={{ width: "18rem" }} key={p._id}>
      <img
        src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
        className="card-img-top"
        alt={p.name}
      />
      <div className="card-body">
        <h5 className="card-title">{p.name}</h5>
        <p className="card-text">
          {p.description.substring(0, 30)}...
        </p>
        <p className="card-text d-flex gap-2"> $ {p.price}</p>
        {/* Flex container to align buttons and add gap */}
        <div className="d-flex align-items-center" style={{ gap: "10px" }}>
          <button
            className="btn btn-primary more-details-btn"
            style={{ height: "55px" }}  
          
          >
            More Details
          </button>
          <button
            className="btn btn-secondary add-to-cart-btn"
            style={{ height: "55px" }} 
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
    </div>
  )
}

export default Search
