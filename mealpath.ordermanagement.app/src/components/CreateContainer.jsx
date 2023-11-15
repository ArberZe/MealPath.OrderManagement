// import React, { useState } from 'react'
// import { motion } from "framer-motion";
// import Loader from './Loader';
// import axios from 'axios';
// import { categories } from "../utils/data";

// import {
//   MdFastfood,
//   MdCloudUpload,
//   MdDelete,
//   MdFoodBank,
//   MdAttachMoney,
// } from "react-icons/md";

// const CreateContainer = () => {

//   const[name,setName] = useState("");
//   const [decp, setDecp] = useState('');
//   const[price,setPrice] = useState("");
//   const[category,setCategory] = useState("");
//   const[image,setImage] = useState("");
 
//   const[alertStatus,setAlertStatus] = useState("danger");
//   const[msg,setMsg] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const[fields,setFields] = useState(false);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (!name || !decp || !price || !category || !image) {
//       setIsLoading(false);
//       setFields(true);
//       setMsg('Please fill in all fields');
//       setAlertStatus('danger');
//       setTimeout(() => {
//         setFields(false);
//       }, 4000);
//       return;
//     }

  
//     const newFood = {
//       name,
//       decp,
//       price,
//       image,
//       category,
//     };

  

//     try {
//       const response = await axios.post('https://localhost:7155/api/Products', newFood);
//       console.log('Produti u shtua me sukses!', response.data);
//       setMsg('Produti u shtua me sukses!');
//       setAlertStatus('success');
//       setFields(true);
//     } catch (error) {
//       console.error('Produti nuk u shtua me sukses!', error);
//       setMsg('Produti nuk u shtua me sukses!');
//       setAlertStatus('danger');
//       setFields(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   return ( 
//     <div className='w-full min-h-screen flex items-center justify-center'>
//          <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
//         {fields && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
//               alertStatus === "danger"
//                 ? "bg-red-400 text-red-800"
//                 : "bg-green-400 text-green-800"
//             }`}
//           >
//             {msg}
//           </motion.p>
//         )}

// <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2" onSubmit={handleSubmit}>
//           <MdFastfood className="text-xl text-gray-700" />
//           <input
//             type="text"
//             required
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Give me a title..."
//             className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
//           />
//         </div>

//         <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
//             <input
//               type="text"
//               required
//               value={decp}
//               onChange={(e) => setDecp(e.target.value)}
//               placeholder="Description"
//               className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
//             />
//           </div>

//         <div className="w-full">
//           <select
//             onChange={(e) => setCategory(e.target.value)}
//             className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
//           >
//             <option value="other" className="bg-white">
//               Select Category
//             </option>
//            {categories &&
//               categories.map((item) => (
//                 <option
//                   key={item.id}
//                   className="text-base border-0 outline-none capitalize bg-white text-headingColor"
//                   value={item.urlParamName}
//                 >
//                   {item.name}
//                 </option>
//               ))} 
//           </select>
//         </div>



//         <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
//           {isLoading ? (
//             <Loader />
//           ) : (
//             <>
//               {!image ? (
//                 <>
//                   <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
//                     <div className="w-full h-full flex flex-col items-center justify-center gap-2">
//                       <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
//                       <p className="text-gray-500 hover:text-gray-700">
//                         Click here to upload
//                       </p>
//                     </div>
//                     <input
//                       type="file"
//                       name="uploadimage"
//                       accept="image/*"
//                       // onChange={uploadImage}
//                       className="w-0 h-0"
//                     />
//                   </label>
//                 </>
//               ) : (
//                 <>
//                   <div className="relative h-full">
//                     <img
//                       src={image}
//                       alt="uploaded image"
//                       className="w-full h-full object-cover"
//                     />
//                     <button
//                       type="button"
//                       className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
//                       // onClick={deleteImage}
//                     >
//                       <MdDelete className="text-white" />
//                     </button>
//                   </div>
//                 </>
//               )}
//             </>
//           )}
//         </div>

//         <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
//             <MdAttachMoney className="text-gray-700 text-2xl" />
//             <input
//               type="text"
//               required
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="Price"
//               className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
//             />
//           </div>
//           <div className="flex items-center w-full">
//           <button
//             type="button"
//             className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none
//              bg-green-600 px-12 py-2 rounded-lg text-lg text-white font-semibold"
//             onClick={handleSubmit}
//           >
//             Save
//           </button>
//         </div>
//         </div>

        
//   </div>
   
//   );
// };

// export default CreateContainer;











import React, { useState } from 'react';
import { motion } from "framer-motion";
import Loader from './Loader';
import axios from 'axios';
import { categories } from "../utils/data";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";

const CreateContainer = () => {
  const [name, setName] = useState("");
  const [decp, setDecp] = useState('');
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !decp || !price || !category || !image) {
      setIsLoading(false);
      setFields(true);
      setMsg('Please fill in all fields');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
      }, 4000);
      return;
    }

    const newFood = {
      productID: 3,
      title: name,
      description: decp,
      categoryId: category,
      price: price,
      imageUrl: image,
    };
    

    try {
      const response = await axios.post('https://localhost:7155/api/Products', newFood);
      console.log('Product added successfully!', response.data);
      setMsg('Product added successfully!');
      setAlertStatus('success');
      setFields(true);
    } catch (error) {
      console.error('Error creating product:', error.response || error);
      setMsg('Product could not be added. Please check the console for more details.');
      setAlertStatus('danger');
      setFields(true);
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-green-400 text-green-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFastfood className="text-xl text-gray-700" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Give me a title..."
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <input
              type="text"
              required
              value={decp}
              onChange={(e) => setDecp(e.target.value)}
              placeholder="Description"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          
          {/* <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFastfood className="text-xl text-gray-700" />
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Give me a category..."
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div> */}



          <div className="w-full">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            >
              <option value="" className="bg-white">
                Select Category
              </option>
              {categories &&
                categories.map((item) => (
                  <option
                    key={item.id}
                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>



          {/* <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div> */}

          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {!image ? (
                  <>
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                        <p className="text-gray-500 hover:text-gray-700">
                          Click here to upload
                        </p>
                      </div>
                      <input
                        type="file"
                        name="uploadimage"
                        accept="image/*"
                        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                        className="w-0 h-0"
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="relative h-full">
                      <img
                        src={image}
                        alt="uploaded image"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                        onClick={() => setImage("")}
                      >
                        <MdDelete className="text-white" />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          
          <div className="flex items-center w-full">
            <button
              type="submit"
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none
             bg-green-600 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContainer;
