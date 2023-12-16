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

export interface AppointmentData {
  id: string;
  userId: string;
  name: string;
  email: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
  timestamp: Date;  
}

export function useFirebaseAuth() {
  const [user, setUser] = useState<UserType>({
    id: null,
    name: null,
    gender: null,
    address: null,
    number: null,
    email: null,
    myAppointment: [],
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
          myAppointment: userData!.myAppointment,
        });
      } else {
        setUser({
          id: null,
          name: null,
          gender: null,
          email: null,
          number: null,
          address: null,
          myAppointment: [],
        });
      }
    });

    fetchServicesFromFirebase();

    return () => unsubscribe();
  }, []);

  const getUserData = async (uid: string) => {
    const docRef = doc(db, "user", uid).withConverter(userConverter);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUserData = {
        id: userCredential.user.uid,
        name,
        email,
        myAppointment: [] as string[],
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
      return credential;
    } catch (error) {
      console.log("Error logging in: ", error);
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
      myAppointment: [],
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

  const addAppointment = async (appointmentData: AppointmentData) => {
    try {
      const appointmentsCollection = collection(db, "appointments");
      const appointmentDocRef = await addDoc(appointmentsCollection, {
        userId: user.id!,
        name: appointmentData.name,
        email: appointmentData.email,
        doctor: appointmentData.doctor,
        specialty: appointmentData.specialty,
        date: appointmentData.date,
        time: appointmentData.time,
        status: appointmentData.status,
        timestamp: new Date(),
      });

      await updateDoc(appointmentDocRef, { id: appointmentDocRef.id });

      const userDocRef = doc(db, "user", user.id!).withConverter(userConverter);

      await updateDoc(userDocRef, {
        myAppointment: [...user.myAppointment, appointmentDocRef.id],
      });

      const updatedUserData = await getUserData(user.id!);
      setUser(updatedUserData!);
    } catch (error) {
      console.error("Error adding appointment: ", error);
    }
  };

  const getDoctorData = async (): Promise<any[]> => {
    try {
      const doctorsCollection = collection(db, "doctors");
      const doctorsSnapshot = await getDocs(doctorsCollection);
  
      const doctorData = doctorsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          address: data.address,
          briefProfile: data.briefProfile,
          contact: data.contact,
          image: data.image,
          name: data.name,
          specialty: data.specialty,
        };
      });
  
      return doctorData || [];
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      return [];
    }
  };

  const fetchDoctorsFromFirebase = async () => {
    try {
      const doctorsCollection = collection(db, "doctors");
      const querySnapshot = await getDocs(doctorsCollection);

      if (!querySnapshot.empty) {
        const doctorData = querySnapshot.docs.map((doc) => doc.data());
        setDoctors(doctorData);
      } else {
        setDoctors([]);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const [doctors, setDoctors] = useState<any[]>([]);

  const createDoctor = async (formData: any) => {
    try {
      const doctorsCollection = collection(db, "doctors");
  
      const docRef = await addDoc(doctorsCollection, {
        ...formData,
        id: "",
      });
  
      const autoGeneratedId = docRef.id;
      await updateDoc(docRef, { id: autoGeneratedId });
  
      console.log("New doctor created with ID:", autoGeneratedId);
  
      fetchDoctorsFromFirebase();
    } catch (error) {
      console.error("Error creating doctor:", error);
    }
  };

  const updateDoctor = async (id: string, formData: any) => {
    try {
      const doctorRef = doc(db, "doctors", id);
      await setDoc(doctorRef, formData, { merge: true });
      console.log(`Doctor with ID ${id} updated successfully.`);
      await fetchDoctorsFromFirebase();
    } catch (error) {
      console.error(`Error updating doctor with ID ${id}:`, error);
    }
  };

  const deleteDoctor = async (id: string) => {
    try {
      const doctorRef = doc(db, "doctors", id);
      await deleteDoc(doctorRef);
      await fetchDoctorsFromFirebase();
      console.log(`Doctor with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting doctor with ID ${id}:`, error);
    }
  };

  const updateData = async (
    docId: string,
    data: any,
    collectionName: string
  ) => {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data);
  };

  const createDataWithRandomId = async (data: any, collectionName: string) => {
    const collectionRef = doc(db, collectionName);
    await setDoc(collectionRef, data);
  };

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServicesFromFirebase = async () => {
    try {
      const servicesCollection = collection(db, "services");
      const querySnapshot = await getDocs(servicesCollection);

      if (!querySnapshot.empty) {
        const serviceData = querySnapshot.docs.map((doc) => doc.data());
        setServices(serviceData);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const createService = async (formData: any) => {
    try {
      const servicesCollection = collection(db, "services");

      const docRef = await addDoc(servicesCollection, {
        ...formData,
        id: "",
      });

      const autoGeneratedId = docRef.id;
      await updateDoc(docRef, { id: autoGeneratedId });

      console.log("New service created with ID:", autoGeneratedId);

      fetchServicesFromFirebase();
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const updateService = async (id: string, formData: any) => {
    try {
      const serviceRef = doc(db, "services", id);
      await setDoc(serviceRef, formData, { merge: true });
      console.log(`Service with ID ${id} updated successfully.`);
      await fetchServicesFromFirebase();
    } catch (error) {
      console.error(`Error updating service with ID ${id}:`, error);
    }
  };

  const deleteService = async (id: string) => {
    try {
      const serviceRef = doc(db, "services", id);
      await deleteDoc(serviceRef);
      await fetchServicesFromFirebase();
      console.log(`Service with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting service with ID ${id}:`, error);
    }
  };

  const getAppointmentData = async (): Promise<AppointmentData[]> => {
    try {
      const appointmentsCollection = collection(db, "appointments");
      const appointmentsSnapshot = await getDocs(appointmentsCollection);
  
      const appointmentData = appointmentsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          name: data.name,
          email: data.email,
          doctor: data.doctor,
          specialty: data.specialty,
          date: data.date,
          time: data.time,
          status: data.status,
          timestamp: data.timestamp,
        }
      });
  
      return appointmentData || [];
    } catch (error) {
      console.error("Error fetching appointment data:", error);
      return []; 
    }
  };

  return {
    user,
    services,
    doctors,
    loading,
    signUp,
    logIn,
    logOut,
    updateName,
    updateNumber,
    updateGender,
    updateAddress,
    addAppointment,
    getDoctorData,
    createDataWithRandomId,
    updateData,
    fetchServicesFromFirebase,
    createService,
    updateService,
    deleteService,
    fetchDoctorsFromFirebase,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getAppointmentData,
  };
}
