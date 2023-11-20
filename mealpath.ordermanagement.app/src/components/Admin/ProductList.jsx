// // ProductList.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import UpdateForm from './UpdateForm';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     axios.get('https://localhost:7155/api/Products/all')
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching product list:', error);
//       });
//   }, []);

//   const handleDelete = (productId) => {
//     // Implement delete logic here
//     console.log(`Deleting product with ID: ${productId}`);
//   };

//   const handleUpdate = (productId) => {
//     // Set the selected product and show the update form
//     const selected = products.find(product => product.productID === productId);
//     setSelectedProduct(selected);
//     setShowUpdateForm(true);
//   };

//   const handleUpdateFormCancel = () => {
//     // Hide the update form when canceled
//     setShowUpdateForm(false);
//     setSelectedProduct(null);
//   };

//   const handleUpdateSuccess = () => {
//     // Refresh the product list and hide the update form after a successful update
//     setShowUpdateForm(false);
//     setSelectedProduct(null);
//     axios.get('https://localhost:7155/api/Products/all')
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching product list:', error);
//       });
//   };

//   return (
//     <div className="container mx-auto my-8">
//       <Link to="/createitem" className="bg-green-600 text-white py-2 px-4 rounded-lg text-lg mb-4 inline-block">
//         Create New Product
//       </Link>
//       <h1 className="text-3xl font-semibold mb-4">Product List</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//         {products.map(product => (
//           <div key={product.productID} className="bg-white p-4 rounded-md shadow-md mb-4">
//             <p className="text-xl font-semibold mb-2">{product.title}</p>
//             <p className="text-gray-600 mb-2">{product.description}</p>
//             <p className="text-green-600 font-semibold">${product.price}</p>
//             <div className="flex mt-2">
//               <button
//                 className="bg-red-500 text-white px-3 py-1 mr-2 rounded-md hover:bg-red-600"
//                 onClick={() => handleDelete(product.productID)}
//               >
//                 Delete
//               </button>
//               <button
//                 className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
//                 onClick={() => handleUpdate(product.productID)}
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {showUpdateForm && selectedProduct && (
//         <UpdateForm
//           product={selectedProduct}
//           onUpdate={handleUpdateSuccess}
//           onCancel={handleUpdateFormCancel}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductList;



import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateForm from './UpdateForm';
import { motion } from "framer-motion";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:7155/api/Products/all')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching product list:', error);
      });
  }, []);

  const handleDelete = async (productId) => {
    // Display a confirmation dialog
    const shouldDelete = window.confirm('Are you sure you want to delete this product?');

    // If the user clicks "Cancel" in the confirmation dialog, do nothing
    if (!shouldDelete) {
      return;
    }

    try {
      // Make DELETE request to your API endpoint
      await axios.delete(`https://localhost:7155/api/Products/${productId}`);

      // Refresh the product list
      const updatedProducts = products.filter(product => product.productID !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = (productId) => {
    // Set the selected product and show the update form
    const selected = products.find(product => product.productID === productId);
    setSelectedProduct(selected);
    setShowUpdateForm(true);
  };

  const handleUpdateFormCancel = () => {
    // Hide the update form when canceled
    setShowUpdateForm(false);
    setSelectedProduct(null);
  };

  const handleUpdateSuccess = () => {
    // Refresh the product list and hide the update form after a successful update
    setShowUpdateForm(false);
    setSelectedProduct(null);
    axios.get('https://localhost:7155/api/Products/all')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching product list:', error);
      });
  };

  return (
    <div className="container mx-auto my-8">
      <Link to="/createitem" className="bg-green-600 text-white py-2 px-4 rounded-lg text-lg mb-4 inline-block">
        Create New Product
      </Link>
      <h1 className="text-3xl font-semibold mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {products.map(product => (
          <div key={product.productID} className="w-275 h-[200px] min-w-[350px] md:w-300 md:min-w-[400px] bg-cardOverlay rounded-lg py-2 px-5 my-5 backdrop-blur-lg hover:drop-shadow-lg flex items-center justify-evenly relative">
          <div className="w-full flex items-center justify-between py-2">
            <motion.div className="w-40 h-40 -mt-8 drop-shadow-2xl " whileHover={{ scale: 1.2 }}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
          <div className="flex flex-col flex-grow">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xl font-semibold mb-2">{product.title}</p>
                <p className="text-gray-600 mb-2">{product.description}</p>
              </div>
              <div className="text-green-600 font-semibold">${product.price}</div>
            </div>
            <div className="mt-auto flex justify-end">
              <button
                className="bg-red-500 text-white px-3 py-1 mr-2 rounded-md hover:bg-red-600"
                onClick={() => handleDelete(product.productID)}
              >
                Delete
              </button>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                onClick={() => handleUpdate(product.productID)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
        
        ))}
      </div>
      {showUpdateForm && selectedProduct && (
        <UpdateForm
          product={selectedProduct}
          onUpdate={handleUpdateSuccess}
          onCancel={handleUpdateFormCancel}
        />
      )}
    </div>
  );
};

export default ProductList;
