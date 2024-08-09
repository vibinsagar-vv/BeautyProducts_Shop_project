import AXIOS from 'axios'
const fetchCategoryWiseProduct = async(Category) =>{
    const resData = await AXIOS.post("http://localhost:7800/products/category-product",{Category:Category})

    return resData.data
}

export default fetchCategoryWiseProduct