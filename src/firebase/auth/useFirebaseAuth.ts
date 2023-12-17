import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../config";
import { UserType, userConverter } from "./user";
import { useState, useEffect } from "react";

export function useFirebaseAuth() {
  const [user, setUser] = useState<UserType>({
    id: null,
    name: null,
    gender: null,
    address: null,
    number: null,
    email: null,
    // myAppointment: [],
    role: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userData = await getUserData(authUser.uid);
        setUser({
          id: userData!.id,
          name: userData!.name,
          gender: userData!.gender,
          email: userData!.email,
          number: userData!.number,
          address: userData!.address,
          // myAppointment: userData!.myAppointment,
          role: userData!.role,
        });
      } else {
        setUser({
          id: null,
          name: null,
          gender: null,
          email: null,
          number: null,
          address: null,
          // myAppointment: [],
          role: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const getUserData = async (uid: string) => {
    const docRef = doc(db, "user", uid).withConverter(userConverter);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUserData = {
        id: userCredential.user.uid,
        name,
        email,
        // myAppointment: [] as string[],
        role: "2",
      } as UserType;

      await setDoc(doc(db, "user", newUserData.id!), newUserData);

      return userCredential;
    } catch (error) {
      console.log("Error signing up: ", error);
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = await getUserData(credential.user.uid);

      setUser({
        id: userData!.id,
        name: userData!.name,
        gender: userData!.gender,
        email: userData!.email,
        number: userData!.number,
        address: userData!.address,
        // myAppointment: userData!.myAppointment,
        role: userData!.role,
      });

      return credential;
    } catch (error) {
      console.log("Error logging in: ", error);
      alert("Login failed. Please check your email and password.");
    }
  };

  const logOut = async () => {
    setUser({
      id: null,
      name: null,
      email: null,
      number: null,
      gender: null,
      address: null,
      // myAppointment: [],
      role: null,
    });
    return await signOut(auth);
  };

  const updateUserField = async (field: string, value: string) => {
    await updateDoc(doc(db, "user", user.id!), { [field]: value });
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const updateName = async (name: string) => updateUserField("name", name);
  const updateNumber = async (number: string) =>
    updateUserField("number", number);
  const updateGender = async (gender: string) =>
    updateUserField("gender", gender);
  const updateAddress = async (address: string) =>
    updateUserField("address", address);

  const updateData = async (
    docId: string,
    data: any,
    collectionName: string
  ) => {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data);
  };

  const getRole = async (uid: string): Promise<string> => {
    try {
      const docRef = doc(db, "user", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        return userData.role;
      } else {
        console.error("User data not found");
        return "defaultRole";
      }
    } catch (error) {
      console.error("Error getting user role:", error);
      return "defaultRole";
    }
  };

  return {
    user,
    signUp,
    logIn,
    logOut,
    updateName,
    updateNumber,
    updateGender,
    updateAddress,
    updateData,
    getRole,
  };
}
