import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useSearch } from "../../Context/search";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './SearchInput.css';

const SearchInput = () => {
    const [values,setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.get(`http://localhost:5000/api/v1/product/search/${values.keyword}`);
            setValues({...values , results : data});
            navigate('/search')

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="search-container">
        <form className='searchbar-navbar'onSubmit={handleSubmit}>
      <input type="text" className="search-bar-navbar" placeholder="Search..."
      value={values.keyword} 
      onChange={(e)=> {
       setValues({...values, keyword: e.target.value})
      }}/>

      <button className="submit-btn-search">
        <IoSearchSharp className="search-icon" />
      </button>
      </form>
    </div>
  );
};

export default SearchInput;
