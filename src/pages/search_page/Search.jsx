import React, { useState } from 'react'
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


const Search = () => {
  const [categoryAccordian,setcategoryAccordian] = useState(true);
  const [brandAccordian,setbrandAccordian] = useState(true);
  const [rangeSlider,setRangeSlider] = useState(0);
  const [rating,setRating] = useState(0);
  const [page,setPage] = useState(1);
  const [filterSidebar,setFilterSidebar] = useState(false);
  const [selectedOption,setSelectedOption] = useState('None');

  return (  
    <div className="searchCon">
      <div className='searchPage'>
          <div className={`leftSide ${filterSidebar ? "move" : ""}`} >

              <span className='filterTitle'>Filter </span>
              <SelectBox  className="mdSelectBox" value={selectedOption} setSelectedOption={setSelectedOption}/>

              <CloseIcon className='closeIcon' onClick={()=>setFilterSidebar(false)}/>

              <div className='categoryFilter'>
                <div className='category' onClick={()=>setcategoryAccordian(!categoryAccordian)} ><span>Category</span>{categoryAccordian ? <KeyboardArrowDownIcon className='arrow' /> : <KeyboardArrowUpIcon className='arrow' />}</div>
                <div className='categoryAccordion' style={{"height":categoryAccordian ? "110px" : "0px"}}>
                  <div><input type="checkbox" /><span>Phone</span></div>
                  <div><input type="checkbox" /><span>Men</span></div>
                  <div><input type="checkbox" /><span>Women</span></div>
                  <div><input type="checkbox" /><span>Kids</span></div>
                </div>
              </div>

              <div className='brandFilter'>

                <div className='brand' onClick={()=>setbrandAccordian(!brandAccordian)}><span>Brand</span>{brandAccordian ? <KeyboardArrowDownIcon  className='arrow' /> : <KeyboardArrowUpIcon className='arrow' />}</div>
                  <div className='brandAccordian' style={{"height":brandAccordian ? "110px" : "0px"}}>
                    <div><input type="checkbox" /><span>Adidas</span></div>
                    <div><input type="checkbox" /><span>Nike</span></div>
                    <div><input type="checkbox" /><span>Apple</span></div>
                    <div><input type="checkbox" /><span>Oppo</span></div>
                  </div>
              </div>

              <div className='ratingFilter'> 
                <div className='rating'><span>Rating </span><h5>{rating}</h5></div>
                <div><Rating half={false}  onchange={setRating}/></div>
              </div>

              <div className='priceFilter'> 
                <div className='price'><span>Price</span><h5>{rangeSlider}</h5></div>
                <input type="range" min="0" max="1000" step="100" style={{ "--slider-value":rangeSlider}} value={rangeSlider} onChange={(e)=>setRangeSlider(e.target.value)}/>
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
                  <Product img="/phone.webp" />
                  <Product img="/camera.jpg" />
                  <Product img="/phone.webp" />
                  <Product img="/camera.jpg" />
                  <Product img="/phone.webp" />
                  <Product img="/camera.jpg" />
                  <Product img="/phone.webp" />
                  <Product img="/camera.jpg" />
            </div>
            <div className='paginationCon'>
              <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={50}
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
