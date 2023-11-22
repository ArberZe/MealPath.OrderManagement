// import React from "react";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { motion } from "framer-motion";
// //import {useStateValue} from '../context/StateProvider.js'
// import NotFound from "../img/NotFound.svg";
// import {food} from "../utils/data.js"
// import Pizzapng from '../img/pizza.png'


// const FoodContainer = () => {

//   return (
//     <div className={`w-full flex items-center gap-3  my-12 scroll-smooth overflow-x-hidden flex-wrap justify-center`} >
//       {food && food.length > 0 ? (
//         food.map((item) => (
//           <div
//             key={item?.id}
//             className="w-275 h-[220px] min-w-[350px] md:w-300 md:min-w-[400px]  bg-cardOverlay rounded-lg py-2 px-4  my-5 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
//           >
//             <div className="w-full flex items-center justify-between py-2 ">
//               <motion.div
//                 className=" w-40 h-40 -mt-8 drop-shadow-2xl "
//                 whileHover={{ scale: 1.2 }}
//               >
//                 <img
//                   // src={item?.imageSrc}
//                   src={Pizzapng}
//                   alt=""
//                   className="w-full h-full object-contain"
//                 />
//               </motion.div>
//               <motion.div
//                 whileTap={{ scale: 0.75 }}
//                 className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
//                 // onClick={() => setItems([...cartItems, item])}
//               >
//                 <MdOutlineShoppingCart className="text-white" />
//               </motion.div>
//             </div>

//             <div className="w-full flex flex-col items-end justify-end -mt-8 relative">
//               <p className="text-textColor font-semibold text-base md:text-lg">
//                 {item?.name}
//               </p>
//               <p className="mt-1 text-sm text-gray-500">
//                 {item?.decp} 
//               </p>
//               <div className="flex items-center gap-8">
//                 <p className="text-lg text-headingColor font-semibold">
//                   <span className="text-sm text-green-500">$</span> {item?.price}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="w-full flex flex-col items-center justify-center">
//           <img src={NotFound} className="h-340" alt="food"/>
//           <p className="text-xl text-headingColor font-semibold my-2">
//             Items Not Available
//           </p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default FoodContainer






import { MdOutlineShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
//import {useStateValue} from '../context/StateProvider.js'
import NotFound from "../img/NotFound.svg";
//import {food} from "../utils/data.js"
import Pizzapng from '../img/pizza.png'
import axios from "axios";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

const FoodContainer = () => {

  const[food, setfood] = useState([]);
  useEffect(() =>{
    axios.get('https://localhost:7155/api/Products/all').then(response =>{
      console.log(response)
      setfood(response.data);
    })
  }, [])

  return (
    <div className={`w-full flex items-center gap-3  my-12 scroll-smooth overflow-x-hidden flex-wrap justify-center`} >
      {food && food.length > 0 ? (
        food.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[220px] min-w-[350px] md:w-300 md:min-w-[400px]  bg-cardOverlay rounded-lg py-2 px-4  my-5 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between py-2 ">
              <motion.div
                className=" w-40 h-40 -mt-8 drop-shadow-2xl "
                whileHover={{ scale: 1.2 }}
              >
                <img
                  // src={item?.imageSrc}
                  src={Pizzapng}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                // onClick={() => setItems([...cartItems, item])}
              >
                <MdOutlineShoppingCart className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8 relative">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.description} 
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-green-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" alt="food"/>
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  )
}

export default observer(FoodContainer)


