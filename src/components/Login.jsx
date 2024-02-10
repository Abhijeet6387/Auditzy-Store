import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { firestore } from "../firebaseConfig/firebase";
import { collection, getDoc, setDoc, doc } from "firebase/firestore";
import { fetchProducts } from "../api/Products";

function Login() {
  const navigate = useNavigate();
  const { googleSignIn, user, logOut } = UserAuth();
  const [productsFromAPI, setproductsFromAPI] = useState([]);

  // console.log("user", user);

  useEffect(() => {
    const saveDataToDB = async () => {
      await fetchData();
      await saveUserData();
    };
    saveDataToDB();
  }, [user]);

  const handleSignIn = async () => {
    await googleSignIn();
    console.log("signed in");
  };
  const handleLogout = async () => {
    await logOut();
  };

  // Function to fetch products from API
  const fetchData = async () => {
    try {
      const data = await fetchProducts();
      setproductsFromAPI(data);
      // console.log(productsFromAPI);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const saveUserData = async () => {
    if (user) {
      const userDocRef = doc(collection(firestore, "users"), user?.uid);
      try {
        const docSnapshot = await getDoc(userDocRef);
        // If the user data does not exist in firestore database
        if (!docSnapshot.exists()) {
          // Save the user data
          await setDoc(userDocRef, {
            id: user?.uid,
            username: user?.displayName,
            email: user?.email,
            verified: user?.emailVerified,
            phone: user?.phoneNumber,
            photoURL: user?.photoURL,
            products: productsFromAPI ?? [],
          });
          console.log("Doc Saved");
          navigate("/dashboard");
        } else {
          console.log("User already exists in Firestore");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking user document in Firestore: ", error);
      }
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          padding: 2,
          boxShadow: 4,
          borderLeft: 3,
          borderLeftColor: "cornflowerblue",
        }}
      >
        <Box sx={{ textAlign: "left", mb: 2 }}>
          <Typography variant="h6">Auditzy Store</Typography>
          <Typography variant="caption">Please Login with email</Typography>
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }}></Divider>
        {user ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              variant="text"
              sx={{ textTransform: "unset", borderRadius: 50 }}
              onClick={() => navigate("/dashboard")}
            >
              {" "}
              View Dashboard
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ textTransform: "unset", borderRadius: 50 }}
              onClick={handleLogout}
            >
              {" "}
              Logout
            </Button>
          </Box>
        ) : (
          <GoogleButton onClick={handleSignIn} />
        )}
      </Card>
    </Container>
  );
}

export default Login;
