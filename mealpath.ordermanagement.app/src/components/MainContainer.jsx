import React from 'react';
import HomeContainer from './HomeContainer';
import FilterContainer from './FilterContainer';
import FoodContainer from './FoodContainer';
import FoodContainer1 from './FoodContainer1';
// import CartContainer from './CartContainer';




const MainContainer = () => {

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer/>
     <FilterContainer/>
     <FoodContainer1/>

    {/* <CartContainer/> */}
    
     
    
    </div>
    
    
        
  );
  
}


export default MainContainer;
