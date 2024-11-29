import AXIOS from 'axios'
const fetchProduct = async() => {
    // console.log('fetchProduct');
    const resData = await AXIOS.get("https://zenglow-server.onrender.com/products/get-products")
    return resData?.data
}

export default fetchProduct