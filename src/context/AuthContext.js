import { useContext, createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // google signin
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      console.log("SIGNIN SUCCESS ::\n", response);
    } catch (err) {
      console.log("ERROR SIGNIN ::\n", err);
    }
  };

  // logout
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log("ERROR LOGOUT ::\n", err);
    }
  };

  // check the state if logged in or logged out
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Hello", user);
        setUser(user);
      } else {
        // console.log("you are logged out");
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
