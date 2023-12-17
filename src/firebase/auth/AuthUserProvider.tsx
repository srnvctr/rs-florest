import React, { createContext, useContext } from "react";
import { UserCredential } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { UserType } from "./user";

interface AuthType {
  user: UserType;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
  logIn: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
  logOut: () => Promise<void>;
  updateName: (text: string) => Promise<void>;
  updateNumber: (text: string) => Promise<void>;
  updateGender: (text: string) => Promise<void>;
  updateAddress: (text: string) => Promise<void>;
  getRole: (uid: string) => Promise<string>;
}

export const authUserContext = createContext<AuthType>({
  user: {
    id: null,
    name: null,
    gender: null,
    email: null,
    number: null,
    address: null,
    myAppointment: [],
    role: null,
  },
  signUp: async (name, email, password) => {
    throw new Error("Function not implemented.");
  },
  logIn: async (email, password) => {
    throw new Error("Function not implemented.");
  },
  logOut: async () => {
    throw new Error("Function not implemented.");
  },
  updateName: async (name) => {
    throw new Error("Function not implemented.");
  },
  updateNumber: async (number) => {
    throw new Error("Function not implemented.");
  },
  updateGender: async (gender) => {
    throw new Error("Function not implemented.");
  },
  updateAddress: async (address) => {
    throw new Error("Function not implemented.");
  },
  getRole: async (uid) => {
    throw new Error("Function not implemented.");
  },
});

interface AuthUserProviderProps {
  children: React.ReactNode;
}

export function AuthUserProvider({ children }: AuthUserProviderProps) {
  const auth = useFirebaseAuth();

  const value = {
    user: auth.user,
    signUp: auth.signUp,
    logIn: auth.logIn,
    logOut: auth.logOut,
    updateName: auth.updateName,
    updateNumber: auth.updateNumber,
    updateGender: auth.updateGender,
    updateAddress: auth.updateAddress,
    getRole: auth.getRole,
  };

  return (
    <authUserContext.Provider value={value}>
      {children}
    </authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext);
