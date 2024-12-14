import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import Title from './Title';

const RecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const viewedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setRecentlyViewed(viewedProducts);
  }, []);

  return (
    <div className='my-24'>
      {/* <div className='text-center text-3xl py-2'>
        <h2>Recently Viewed Products</h2>
      </div> */}

<div className='text-center text-3xl py-2'>
            <Title text1={'RECENTLY'} text2={'VIEWED'}/>
        </div>


      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {recentlyViewed.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
