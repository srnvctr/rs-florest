import React, { useEffect, useState } from "react";
import { useAuth } from "../../firebase/auth/AuthUserProvider";
import {
  useAppointments,
  AppointmentData,
} from "../../firebase/appointment/appointment";
import "./MyAppointmentTable.css";

const MyAppointmentTable: React.FC = () => {
  const auth = useAuth();
  const { fetchAppointmentData } = useAppointments();

  const [appointmentDataList, setAppointmentDataList] = useState<
    AppointmentData[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.user.id !== null) {
          // Subscribe to real-time updates
          const unsubscribe = fetchAppointmentData(auth.user.id, setAppointmentDataList);
  
          // Unsubscribe from real-time updates when the component unmounts
          return () => unsubscribe();
        }
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };
  
    fetchData();
  }, [auth.user.id]);

  return (
    <div className="my-appointment-table-container">
      <table className="my-appointment-table">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Specialty</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Appointment Status</th>
          </tr>
        </thead>
        <tbody>
          {appointmentDataList.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.doctor}</td>
              <td>{appointment.specialty}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td className={`status-${appointment.status}`}>
                {appointment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointmentTable;
