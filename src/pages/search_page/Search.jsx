import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './search.css';
import './responsive.css';
import Rating from '../../components/ratingStar/RatingStar.jsx';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Product from '../../components/product/Prduct.jsx';
import Footer from '../../components/footer/Footer.jsx';
import Pagination from 'react-js-pagination';
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import { BsFilterRight } from "react-icons/bs";
import CloseIcon from '@mui/icons-material/Close';
import SelectBox from '../../components/selectBox/SelectBox.jsx';
import { Helmet } from 'react-helmet';
import {useDispatch,useSelector} from 'react-redux';
import {getAllproducts } from "../../redux/action/Allproduct_action.js";
import {toast} from 'react-toastify';
import toastOptions from '../../utils/toastOption.js';
import axios from 'axios';

const Search = () => {
  const dispatch = useDispatch();
  const {loading,error,all_products,total_products,limit,maxPrice} = useSelector(state=>state.all_products);
  const {searchQuery} = useSelector(state=>state.searchQuery);
  const [categoryAccordian,setcategoryAccordian] = useState(true);
  const [brandAccordian,setbrandAccordian] = useState(true);
  const [rangeSlider,setRangeSlider] = useState(0);
  const [rating,setRating] = useState(0);
  const [page,setPage] = useState(1);
  const [filterSidebar,setFilterSidebar] = useState(false);
  const [selectedOption,setSelectedOption] = useState('None');
  const [sliderMaxValue,setSliderMaxValue] = useState(50000);
  const [category,setCategory] = useState([]);
  const [brand,setBrand] = useState([]);

  const [selectedCategory,setSelectedCategory] = useState([]);
  const [selectedBrand,setSelectedBrand] = useState([]);

  

  useEffect(()=>{
    dispatch(getAllproducts(selectedOption,rangeSlider,rating,page,searchQuery,selectedCategory,selectedBrand));

  },[selectedOption,rangeSlider,rating,page,searchQuery,selectedCategory,selectedBrand]);

  const handleCheckboxChange = (cat) => {
    const isSelected = selectedCategory.includes(cat);

    const updatedCategories = isSelected
      ? selectedCategory.filter((selectedCat) => selectedCat !== cat)
      : [...selectedCategory, cat];

      setSelectedCategory(updatedCategories);
  };

  const handleBrandCheckbox = (cat) => {
    const isSelected = selectedBrand.includes(cat);

    const updatedBrand = isSelected
      ? selectedBrand.filter((selectedCat) => selectedCat !== cat)
      : [...selectedBrand, cat];

      setSelectedBrand(updatedBrand);
  };

  useEffect(()=>{
    const getCat = async ()=>{
      try{
      const {data} = await axios.get(`${import.meta.env.VITE_DOMAIN}/get/category`);
      setCategory(data.category);
      setBrand(data.brand);
      }
      catch(e)
      {
        toast.error(e.message,toastOptions);
      }
    }
    getCat();
  },[])
  
  return (  
    <div className="searchCon">
      <Helmet>
          <title>Search Product Here</title>
      </Helmet>
      <div className='searchPage'>
          <div className={`leftSide ${filterSidebar ? "move" : ""}`} >

              <span className='filterTitle'>Filter </span>

              <CloseIcon className='closeIcon' onClick={()=>setFilterSidebar(false)}/>

              <div className='categoryFilter'>
                <div className='category' onClick={()=>setcategoryAccordian(!categoryAccordian)} ><span>Category</span>{categoryAccordian ? <KeyboardArrowDownIcon className='arrow' /> : <KeyboardArrowUpIcon className='arrow' />}</div>
                <div className='categoryAccordion' style={{"height":categoryAccordian ? "auto" : "0px"}}>
                  {
                    category && category.length > 0 && category.map((cat,key)=>(

                      <div key={key}>
                        <input type="checkbox" onChange={() => handleCheckboxChange(cat)} checked={selectedCategory.includes(cat)} /><span>{cat}</span>
                      </div>
                    ))
                  }
                  
                </div>
              </div>

              <div className='brandFilter'>

                <div className='brand' onClick={()=>setbrandAccordian(!brandAccordian)}><span>Brand</span>{brandAccordian ? <KeyboardArrowDownIcon  className='arrow' /> : <KeyboardArrowUpIcon className='arrow' />}</div>
                  <div className='brandAccordian' style={{"height":brandAccordian ? "auto" : "0px"}}>
                  {
                    brand && brand.length > 0 && brand.map((brand,key)=>(

                      <div key={key}><input type="checkbox" onChange={() => handleBrandCheckbox(brand)} checked={selectedBrand.includes(brand)} /><span>{brand}</span></div>
                    ))
                  }
                  </div>
              </div>

              <div className='ratingFilter'> 
                <div className='ratingS rating '><span>Rating </span><h5>{rating}</h5></div>
                <div><Rating half={false}  onchange={setRating}/></div>
              </div>

              <div className='priceFilter'> 
                <div className='price'><span>Price</span><h5>{rangeSlider}</h5></div>
                <input type="range" min="0" max={sliderMaxValue} step="10000" style={{ "--slider-value":rangeSlider,"--slider-max-value":sliderMaxValue}} value={rangeSlider} onChange={(e)=>setRangeSlider(e.target.value)}/>
              </div>
          </div>
  {/* 
          Right Side */}

          <div className="rightSide">

            <div className='topCon'>
              <span>Search Results</span>
              <div><BsFilterRight className='filterIcon' onClick={()=>setFilterSidebar(!filterSidebar)}/></div>

              <div className='sortBy'>
                <p>Sort By: </p>
                  <SelectBox  value={selectedOption} setSelectedOption={setSelectedOption}/>
              </div>

            </div>

            

            <div className='productCon'>
              {all_products && all_products.map((product, index) => (
                <Product key={index} {...product} />
              ))}
            </div> 

              
                  

            <div className='paginationCon'>
              <Pagination
                activePage={page}
                itemsCountPerPage={limit}
                totalItemsCount={total_products}
                pageRangeDisplayed={1}
                prevPageText={<FaAnglesLeft className='icon'/>}
                nextPageText={<FaAnglesRight className='icon'/>}
                lastPageText={"Last"}
                firstPageText={"1st"}
                onChange={(e)=>setPage(e)}
              />
            </div>
          </div>


          
      </div>
      <Footer />
    </div>
  )
}

export default Search;
