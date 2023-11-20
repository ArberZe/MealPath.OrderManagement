// // UpdateForm.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import {
//     MdFastfood,
//     MdCloudUpload,
//     MdDelete,
//     MdFoodBank,
//     MdAttachMoney,
//     MdClose
//   } from "react-icons/md";

// const UpdateForm = ({ product, onUpdate, onCancel }) => {
//   const [updatedProduct, setUpdatedProduct] = useState({ ...product });
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(product.imageUrl);

//   const handleUpdate = async () => {
//     try {
//       const requestBody = {
//         productID: updatedProduct.productID,
//         title: updatedProduct.title,
//         description: updatedProduct.description,
//         categoryId: updatedProduct.categoryId,
//         price: updatedProduct.price,
//         imageUrl: updatedProduct.imageUrl,
//       };
  
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
  
//       await axios.put('https://localhost:7155/api/Products', JSON.stringify(requestBody), config);
  
//       // Refresh the product list or perform any other necessary actions
//       onUpdate();
  
//       // Close the update form or perform any other necessary actions
//       onCancel();
//     } catch (error) {
//       console.error('Error updating product:', error);
//       // Handle error, show message, etc.
//     }
//   };
  
  

//   const handleImageChange = (e) => {
//     // Handle the image file change
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="fixed top-20 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
//       <div className="w-[90%] md:w-[50%] bg-white border border-gray-300 rounded-lg p-7 flex flex-col items-center justify-center gap-4 relative">
//         <div className="absolute top-2 right-2 cursor-pointer" onClick={onCancel}>
//           <MdClose className="text-gray-600 text-2xl" />
//         </div>
//         <h1 className="text-2xl font-semibold mb-4">Update Product</h1>
//         <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
//           <MdFastfood className="text-xl text-gray-700" />
//           <input
//             type="text"
//             required
//             value={updatedProduct.title}
//             onChange={(e) => setUpdatedProduct({ ...updatedProduct, title: e.target.value })}
//             placeholder="Give me a title..."
//             className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
//           />
//         </div>
//         <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
//           <textarea
//             required
//             value={updatedProduct.description}
//             onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
//             placeholder="Description"
//             className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
//           />
//         </div>
        
//         <div className="w-full group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 h-48 cursor-pointer rounded-lg">
//           {imagePreview ? (
//             <>
//               <div className="relative h-full">
//                 <img src={imagePreview} alt="uploaded image" className="w-full h-full object-cover" />
//                 <button
//                   type="button"
//                   className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
//                   onClick={() => setImagePreview(null)}
//                 >
//                   <MdDelete className="text-white" />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
//                 <div className="w-full h-full flex flex-col items-center justify-center gap-2">
//                   <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
//                   <p className="text-gray-500 hover:text-gray-700">Click here to upload</p>
//                 </div>
//                 <input
//                   type="file"
//                   name="uploadimage"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="w-0 h-0"
//                 />
//               </label>
//             </>
//           )}
//         </div>
//         <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
//           <MdAttachMoney className="text-gray-700 text-2xl" />
//           <input
//             type="text"
//             required
//             value={updatedProduct.price}
//             onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
//             placeholder="Price"
//             className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
//           />
//         </div>
//         <div className="flex items-center w-full">
//           <button
//             type="button"
//             onClick={handleUpdate}
//             className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-green-600 px-12 py-2 rounded-lg text-lg text-white font-semibold"
//           >
//             Update
//           </button>
//           <button
//             type="button"
//             onClick={onCancel}
//             className="ml-0 md:ml-4 w-full md:w-auto border-none outline-none bg-red-600 px-8 py-2 rounded-lg text-lg text-white font-semibold"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateForm;

import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader from '../Admin/UpdateForm';

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdAttachMoney,
  MdClose
} from 'react-icons/md';

const UpdateForm = ({ product, onUpdate, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [alertStatus, setAlertStatus] = useState(null);
  const [msg, setMsg] = useState("");

  const handleUpdate = async () => {
    
    if (!updatedProduct.title || !updatedProduct.description || !imageUrl || !updatedProduct.price) {
      setAlertStatus("danger");
      setMsg("Please fill in all fields before updating.");
      return;
    }

    try {
      const requestBody = {
        productID: updatedProduct.productID,
        title: updatedProduct.title,
        description: updatedProduct.description,
        categoryId: updatedProduct.categoryId,
        price: updatedProduct.price,
        imageUrl: imageUrl, 
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.put('https://localhost:7155/api/Products', JSON.stringify(requestBody), config);

      onUpdate();

      onCancel();
    } catch (error) {
      console.error('Error updating product:', error);
      setAlertStatus("danger");
      setMsg("Error updating product. Please try again.");
    }
  };

  return (
    <div className="fixed top-20 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-auto">
      <div className="w-[80%] md:w-[40%] bg-white border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 relative">
        <div className="absolute top-2 right-2 cursor-pointer" onClick={onCancel}>
          <MdClose className="text-gray-600 text-2xl" />
        </div>
        <h1 className="text-2xl font-semibold">Update Product</h1>
        {msg && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold mb-4 ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-green-400 text-green-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={updatedProduct.title}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, title: e.target.value })}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <textarea
            required
            value={updatedProduct.description}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
            placeholder="Description"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdCloudUpload className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL (e.g., https://example.com/image.png)"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-64 md:h-80 cursor-pointer rounded-lg overflow-hidden">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageUrl ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageUrl}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={() => setImageUrl("")}
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
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
            placeholder="Price"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            onClick={handleUpdate}
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-green-600 px-12 py-2 rounded-lg text-lg text-white font-semibold"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="ml-0 md:ml-4 w-full md:w-auto border-none outline-none bg-red-600 px-8 py-2 rounded-lg text-lg text-white font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
