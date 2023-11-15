import React from 'react';
import HomeContainer from './HomeContainer';
import FilterContainer from './FilterContainer';
import FoodContainer from './FoodContainer';
// import CartContainer from './CartContainer';




const MainContainer = () => {

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer/>
     <FilterContainer/>
     <FoodContainer/>

    {/* <CartContainer/> */}
    
     
    
    </div>
    
    
        
  );
  
}


export default MainContainer;
