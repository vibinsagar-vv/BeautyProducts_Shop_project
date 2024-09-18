import AXIOS from 'axios'
const fetchProduct = async() => {
    // console.log('fetchProduct');
    const resData = await AXIOS.get("http://localhost:7800/products/get-products")
    return resData?.data
}

export default fetchProduct