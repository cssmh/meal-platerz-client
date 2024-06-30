import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "./firebase.config";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateProfileInfo = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const emailVerification = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // console.log("user in ", currentUser);
      setUser(currentUser);
      const getEmail = currentUser?.email || user?.email;
      const emailToSend = { email: getEmail };
      setLoading(false);
      if (getEmail) {
        await axios
          .post("http://localhost:5000/jwt", emailToSend, {
            withCredentials: true,
          })
          .then((res) => console.log("login token res", res?.data));
      } else {
        await axios
          .post("http://localhost:5000/logout", emailToSend, {
            withCredentials: true,
          })
          .then((res) => console.log("logout token res", res?.data));
      }
    });
    return () => {
      unSubscribe();
    };
  }, [user?.email]);

  const authInfo = {
    user,
    loading,
    googleLogin,
    createNewUser,
    login,
    updateProfileInfo,
    resetPassword,
    emailVerification,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
