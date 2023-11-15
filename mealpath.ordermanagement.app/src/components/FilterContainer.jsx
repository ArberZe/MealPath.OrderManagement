import React, {useState} from 'react'
import {GiFullPizza} from 'react-icons/gi'
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import FoodContainer from './FoodContainer';
import { useStateValue } from '../context/StateProviderr';




const FilterContainer = () => {


  const [filter, setFilter] = useState("experimental");

  

  // const [{ foodItems }, dispatch] = useStateValue();
  return (
    <section className="w-full my-6" id="menu">
    <div className="w-full flex flex-col items-center justify-center">
      <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-100 mr-auto">
        Our Menu
      </p>

      </div>
      <section className="w-full my-6" id="menu">
    <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ?  "shadow-lg": ""
                } w-24 min-w-[94px]
                 h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center text-center `}
                onClick={() => setFilter(category.urlParamName)}
                >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                  } group-hover:bg-white flex items-center justify-center text-red-700`} >
                  <GiFullPizza className={` ${
                      filter === category.urlParamName
                        ? "text-green-600"
                        : "text-red-600"
                    } group-hover:text-textColor text-4xl `} />
                </div>
                <p
                  className={`text-sm ${  filter === category.urlParamName
                  ? "text-green-600"
                  : "text-red-600"
              }
                   group-hover:text-red-600`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          {/* <FoodContainer
            flag={false}
            data={foodItems?.filter((n) => n.category == filter)}
          /> */}
        </div>
  </section>
      </section>
  )
}

export default FilterContainer
