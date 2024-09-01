import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link, useNavigate } from 'react-router-dom';
import AddToCart from '../helpers/AddToCart';
import Heading from '../helpers/Heading';
import Context from '../context/context';
import { toast } from 'react-toastify';

export default function VerticalCardProduct({ category, heading }) {
  const [data, SetData] = useState([]);
  const [loading, SetLoading] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const nav = useNavigate();

  const handleAddToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    if (localStorage.getItem('token')) {
      await AddToCart(id, nav);
      await fetchUserAddToCart();
    } else {
      toast.error('Please login...');
      nav('/login');
    }
  };

  const fetchData = async () => {
    SetLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    SetLoading(false);
    SetData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto md:px-4 my-6">
      <Heading text={heading} />

      {/* Container for cards */}
      <div className="flex gap-4 md:gap-10 lg:gap-12 overflow-x-auto  md:flex-wrap md:justify-center pb-16">
        {data.map((product, index) => (
          <Link
            to={`/product/${product?._id}`}
            key={index}
            className="ml-3 md:ml-0 flex-shrink-0 w-72 sm:w-[45%] md:w-[30%] lg:w-[22%] bg-white shadow-accent-dark shadow-lg rounded-lg overflow-hidden hover:shadow-accent-dark hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <div className="relative h-48 md:h-60 lg:h-72 bg-primary-light flex items-center justify-center overflow-hidden">
              <img
                src={`http://localhost:7800/ProductImages/${product.productImage[0]}`}
                alt={product?.ProductName}
                className="p-4 w-full h-full transform object-scale-down hover:scale-110 transition-transform duration-500 ease-in-out"
              />
              {product?.isNew && (
                <span className="absolute top-2 right-2 bg-accent-light text-white text-xs px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col justify-between h-40 lg:h-48">
              <h2 className="font-semibold text-lg lg:text-xl text-gray-800 truncate">
                {product?.ProductName}
              </h2>
              <p className="text-sm text-gray-500 capitalize">
                {product?.category}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="text-xl text-accent-light font-bold">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>
                {localStorage.getItem('token') && (
                  <button
                    className="py-1.5 px-4 bg-accent-light text-white font-semibold rounded-full hover:bg-tertiary-dark hover:text-white transition-colors duration-300"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
