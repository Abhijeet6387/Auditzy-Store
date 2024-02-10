// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   updateDoc,
//   doc,
// } from "firebase/firestore";
// import { firestore } from "../../firebaseConfig/firebase";
// import { Box, Divider, Button } from "@mui/material";
// import AddCircleIcon from "@mui/icons-material/Add";
// import ProductTable from "../ProductTable";
// import { UserAuth } from "../../context/AuthContext";
// import UserInfo from "./UserInfo";
// import AddProductDialog from "./AddProductDialog";
// import { addProduct, deleteProduct, updateProduct } from "../../api/Products";

// const Profile = () => {
//   const { user } = UserAuth();
//   const [userData, setUserData] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
//   const [newProduct, setNewProduct] = useState({
//     title: "",
//     price: "",
//     description: "",
//     image: "",
//     category: "",
//   });

//   useEffect(() => {
//     const getDataFromDB = async () => {
//       try {
//         const userRef = collection(firestore, "users");
//         const q = query(userRef, where("id", "==", user?.uid));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//           setUserData(doc.data());
//           setProducts(doc.data().products || []);
//           setLoading(false);
//         });
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setLoading(false);
//       }
//     };

//     getDataFromDB();
//   }, [user]);

//   const handleOpenAddProductDialog = () => {
//     setOpenAddProductDialog(true);
//   };

//   const handleCloseAddProductDialog = () => {
//     setOpenAddProductDialog(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct({ ...newProduct, [name]: value });
//   };

//   const handleAddProduct = async () => {
//     try {
//       const addedProduct = await addProduct(newProduct);
//       const updatedProducts = [...products, addedProduct];
//       setProducts(updatedProducts);
//       const userDocRef = doc(firestore, "users", user?.uid);
//       await updateDoc(userDocRef, {
//         products: updatedProducts,
//       });
//       setNewProduct({
//         title: "",
//         price: "",
//         description: "",
//         image: "",
//         category: "",
//       });
//       handleCloseAddProductDialog();
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     try {
//       const productToBeDeleted = await deleteProduct(productId);
//       const updatedProducts = products.filter(
//         (product) => product.id !== productToBeDeleted.id
//       );
//       setProducts(updatedProducts);
//       const userDocRef = doc(firestore, "users", user?.uid);
//       await updateDoc(userDocRef, {
//         products: updatedProducts,
//       });
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const handleUpdateProduct = async (updatedProduct) => {
//     try {
//       const productToBeUpdated = await updateProduct(
//         updatedProduct.id,
//         updatedProduct
//       );
//       const updatedProducts = products.map((product) =>
//         product.id === productToBeUpdated.id ? productToBeUpdated : product
//       );
//       setProducts(updatedProducts);
//       const userDocRef = doc(firestore, "users", user?.uid);
//       await updateDoc(userDocRef, {
//         products: updatedProducts,
//       });
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   return (
//     <>
//       <UserInfo userData={userData} loading={loading} />

//       <Divider sx={{ mt: 3 }}></Divider>

//       <Box sx={{ mt: 3, mx: 5 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{
//             float: "right",
//             textTransform: "unset",
//             borderRadius: 50,
//             mb: 3,
//           }}
//           onClick={handleOpenAddProductDialog}
//         >
//           <AddCircleIcon /> Add Product
//         </Button>
//       </Box>

//       <ProductTable
//         products={products}
//         loading={loading}
//         onDeleteProduct={handleDeleteProduct}
//         onUpdateProduct={handleUpdateProduct}
//       />

//       <AddProductDialog
//         openAddProductDialog={openAddProductDialog}
//         handleCloseAddProductDialog={handleCloseAddProductDialog}
//         handleAddProduct={handleAddProduct}
//         handleInputChange={handleInputChange}
//         newProduct={newProduct}
//       />
//     </>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig/firebase";
import { Box, Divider, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/Add";
import ProductTable from "./ProductTable";
import { UserAuth } from "../../context/AuthContext";
import UserInfo from "./UserInfo";
import AddProductDialog from "./AddProductDialog";
import { addProduct, deleteProduct, updateProduct } from "../../api/Products";
import DeleteConfirmationDialog from "./ConfirmDeleteDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user } = UserAuth();
  const [userData, setUserData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] =
    useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);

  useEffect(() => {
    const getDataFromDB = async () => {
      try {
        const userRef = collection(firestore, "users");
        const q = query(userRef, where("id", "==", user?.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
          setProducts(doc.data().products || []);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    getDataFromDB();
  }, [user, userData, products]);

  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      if (
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.category ||
        !newProduct.price ||
        !newProduct.imageURL
      ) {
        return toast.info("Please fill all the details!");
      }
      const addedProduct = await addProduct(newProduct);
      const updatedProducts = [...products, addedProduct];
      setProducts(updatedProducts);
      const userDocRef = doc(firestore, "users", user?.uid);
      await updateDoc(userDocRef, {
        products: updatedProducts,
      });
      setNewProduct({
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });
      handleCloseAddProductDialog();
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setProductToDeleteId(productId);
      setOpenDeleteConfirmationDialog(true);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    }
  };

  const handleConfirmDeleteProduct = async () => {
    try {
      await deleteProduct(productToDeleteId);
      const updatedProducts = products.filter(
        (product) => product.id !== productToDeleteId
      );
      setProducts(updatedProducts);
      const userDocRef = doc(firestore, "users", user?.uid);
      await updateDoc(userDocRef, {
        products: updatedProducts,
      });
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    } finally {
      handleCloseDeleteConfirmationDialog();
    }
  };

  const handleCloseDeleteConfirmationDialog = () => {
    setOpenDeleteConfirmationDialog(false);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const productToBeUpdated = await updateProduct(
        updatedProduct.id,
        updatedProduct
      );
      const updatedProducts = products.map((product) =>
        product.id === productToBeUpdated.id ? productToBeUpdated : product
      );
      setProducts(updatedProducts);
      const userDocRef = doc(firestore, "users", user?.uid);
      await updateDoc(userDocRef, {
        products: updatedProducts,
      });
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product");
    }
  };

  return (
    <>
      <UserInfo userData={userData} loading={loading} />

      <Divider sx={{ mt: 3 }}></Divider>

      <Box sx={{ mt: 3, mx: 5 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            float: "right",
            textTransform: "unset",
            borderRadius: 50,
            mb: 3,
          }}
          onClick={handleOpenAddProductDialog}
        >
          <AddCircleIcon /> Add Product
        </Button>
      </Box>

      <ProductTable
        products={products}
        loading={loading}
        onDeleteProduct={handleDeleteProduct}
        onUpdateProduct={handleUpdateProduct}
      />

      <AddProductDialog
        openAddProductDialog={openAddProductDialog}
        handleCloseAddProductDialog={handleCloseAddProductDialog}
        handleAddProduct={handleAddProduct}
        handleInputChange={handleInputChange}
        newProduct={newProduct}
      />

      <DeleteConfirmationDialog
        open={openDeleteConfirmationDialog}
        handleClose={handleCloseDeleteConfirmationDialog}
        handleConfirm={handleConfirmDeleteProduct}
      />

      <ToastContainer />
    </>
  );
};

export default Profile;
