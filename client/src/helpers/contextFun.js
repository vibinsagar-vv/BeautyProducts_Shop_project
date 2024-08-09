const fetchProduct = async() => {
    // console.log('fetchProduct');
    const resData = await AXIOS.get("http://localhost:7800/products/get-products")
    SetAllProducts(resData?.data.data||[])
}

export default fetchProduct