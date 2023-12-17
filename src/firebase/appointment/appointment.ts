import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc, onSnapshot
} from "firebase/firestore";
import { db } from "../config";
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

export interface DoctorData {
  id: string;
  name: string;
  specialty: string;
}

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [doctors, setDoctors] = useState<DoctorData[]>([]);

  useEffect(() => {
    fetchAppointmentsFromFirebase("");
    fetchDoctorsFromFirebase();
  }, []);

  const fetchAppointmentsFromFirebase = async (userId: string) => {
    try {
      const appointmentsCollection = collection(db, "appointments");
      const q = query(appointmentsCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const appointmentData: AppointmentData[] = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as AppointmentData)
        );
        setAppointments(appointmentData);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchDoctorsFromFirebase = async () => {
    try {
      const doctorsCollection = collection(db, "doctors");
      const querySnapshot = await getDocs(doctorsCollection);

      if (!querySnapshot.empty) {
        const doctorsData: DoctorData[] = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as DoctorData)
        );
        setDoctors(doctorsData);
      } else {
        setDoctors([]);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchAppointmentData = (userId: string, setAppointmentDataList: React.Dispatch<React.SetStateAction<AppointmentData[]>>): (() => void) => {
    try {
      const appointmentsCollection = collection(db, "appointments");
      const q = query(appointmentsCollection, where("userId", "==", userId));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const appointmentData: AppointmentData[] = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as AppointmentData)
        );

        // Update the state directly within the component
        setAppointmentDataList(appointmentData);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching appointment data:", error);
      return () => {};
    }
  };

  const addAppointment = async (appointmentData: AppointmentData) => {
    try {
      const appointmentsCollection = collection(db, "appointments");
      const appointmentDocRef = await addDoc(appointmentsCollection, {
        userId: appointmentData.userId,
        name: appointmentData.name,
        email: appointmentData.email,
        doctor: appointmentData.doctor,
        specialty: appointmentData.specialty,
        date: appointmentData.date,
        time: appointmentData.time,
        status: appointmentData.status,
        timestamp: new Date(),
      });
  
      const newAppointmentId = appointmentDocRef.id;
  
      // Update the appointment document with its own ID
      await updateDoc(appointmentDocRef, { id: newAppointmentId });
  
      // Update the user document in the "user" collection (not "users")
      const userDocRef = doc(db, "user", appointmentData.userId);  // Corrected path
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
  
      if (userData) {
        // Update the user document to include the new appointment ID
        const updatedUserAppointment = [
          ...userData.myAppointment,
          newAppointmentId,
        ];
        await updateDoc(userDocRef, { myAppointment: updatedUserAppointment });
  
        // Update the local state with the new appointments
        await fetchAppointmentsFromFirebase(appointmentData.userId);
      }
    } catch (error) {
      console.error("Error adding appointment: ", error);
    }
  };
  

  const deleteAppointment = async (id: string) => {
    try {
      const appointmentRef = doc(db, "appointments", id);
      await deleteDoc(appointmentRef);
      await fetchAppointmentsFromFirebase("");
      console.log(`Appointment with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting appointment with ID ${id}:`, error);
    }
  };

  const getAppointmentData = async (): Promise<AppointmentData[]> => {
    try {
      const appointmentsCollection = collection(db, "appointments");
      const appointmentsSnapshot = await getDocs(appointmentsCollection);

      const appointmentData: AppointmentData[] = appointmentsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as AppointmentData)
      );

      setAppointments(appointmentData);
      return appointmentData || [];
    } catch (error) {
      console.error("Error fetching appointment data:", error);
      return [];
    }
  };

  return {
    appointments,
    doctors,
    fetchAppointmentsFromFirebase,
    fetchDoctorsFromFirebase,
    addAppointment,
    deleteAppointment,
    getAppointmentData,
    fetchAppointmentData,
  };
};
