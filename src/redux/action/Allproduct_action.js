import axios from 'axios';
import { getAllProduct_req, getAllProduct_success, getAllProduct_fail } from '../reducer/product_reducer';

export const getAllproducts = (selectedOption, rangeSlider, rating, page,query,selectedCategory,selectedBrand) => async (dispatch) => {
    try {
        dispatch(getAllProduct_req());
        const defaultRangeSlider = rangeSlider === 0 ? 50000 : rangeSlider;
        const defaultRating = rating === 0 ? 5 : rating;

        if (selectedOption === "Price Low to High") {
            selectedOption = "ascending";
        } else if (selectedOption === "Price High to Low") {
            selectedOption = "descending";
        }
        else{
            selectedOption = "";
        }

        const categoryQueryString = selectedCategory.length > 0 ? `&&category=${selectedCategory.join('&&category=')}` : '';
        const brandQueryString = selectedBrand.length > 0 ? `&&brand=${selectedBrand.join('&&brand=')}` : '';

        const filterUrl = `page=${page}&&sortBy=${selectedOption}&&rating=${defaultRating}&&maxprice=${defaultRangeSlider}${query ? `&&query=${query}`: ""} ${categoryQueryString}${brandQueryString}`;

        const { data } = await axios.get(`${import.meta.env.VITE_DOMAIN}/products?${filterUrl}`);

        // const { data } = await axios.get(`${import.meta.env.VITE_DOMAIN}/products?page=${page}&&sortBy=${selectedOption}&&rating=${defaultRating}&&maxprice=${defaultRangeSlider}${query ? `&&query=${query}`: ""} ${categoryQueryString} ${brandQueryString}`);

            console.log(filterUrl)
        dispatch(getAllProduct_success({ data: data.product, total_products: data.totalProducts, limit: data.limit,maxPrice:data.maxPrice }));
    } catch (e) {
        dispatch(getAllProduct_fail({ error: e.message }));
        console.log(e);
    }
};

