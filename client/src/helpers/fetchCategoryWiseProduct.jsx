import AXIOS from "axios";
const fetchCategoryWiseProduct = async (Category) => {
  const resData = await AXIOS.post(
    "https://zenglow-server.onrender.com/products/category-product",
    { Category: Category }
  );

  return resData.data;
};

export default fetchCategoryWiseProduct;
