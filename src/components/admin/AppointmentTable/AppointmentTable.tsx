import React, { useEffect, useState } from "react";
import { IonIcon, IonAlert } from "@ionic/react";
import { useFirebaseAuth } from "../../../firebase/auth/useFirebaseAuth";
import {
  AppointmentData,
  useAppointments,
} from "../../../firebase/appointment/appointment";
import { checkmarkOutline, closeOutline } from "ionicons/icons";

import "./AppointmentTable.css";

const AppointmentTable: React.FC = () => {
  const { getAppointmentData } = useAppointments();
  const { updateData } = useFirebaseAuth();
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [confirmationAction, setConfirmationAction] = useState<
    "Approved" | "Declined" | null
  >(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentData = await getAppointmentData();
        setAppointments(appointmentData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleConfirmation = async () => {
    if (confirmationAction && selectedAppointmentId) {
      try {
        const existingAppointment = appointments.find(
          (appointment) => appointment.id === selectedAppointmentId
        );

        if (existingAppointment) {
          await updateData(
            selectedAppointmentId,
            { ...existingAppointment, status: confirmationAction },
            "appointments"
          );
          console.log(
            `Appointment ${selectedAppointmentId} ${confirmationAction}`
          );

          setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
              appointment.id === selectedAppointmentId
                ? { ...appointment, status: confirmationAction }
                : appointment
            )
          );
        }
      } catch (error) {
        console.error(
          `Error ${confirmationAction.toLowerCase()} appointment:`,
          error
        );
      } finally {
        setShowDeleteAlert(false);
        setSelectedAppointmentId(null);
        setConfirmationAction(null);
      }
    }
  };

  return (
    <main className="ion-padding" style={{ width: "100%" }}>
      <h1>Appointment List</h1>
      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <table className="ServiceTable-Table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Doctor</th>
              <th>Specialty</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.name}</td>
                <td>{appointment.email}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.specialty}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td className={`status-${appointment.status}`}>
                  {appointment.status}
                </td>
                <td>
                  {appointment.status === "Approved" ? (
                    <>
                      <IonIcon
                        icon={closeOutline}
                        style={{
                          fontSize: "30px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedAppointmentId(appointment.id);
                          setConfirmationAction("Declined");
                          setShowDeleteAlert(true);
                        }}
                      />
                    </>
                  ) : appointment.status === "Declined" ? null : (
                    <>
                      <IonIcon
                        icon={checkmarkOutline}
                        style={{
                          fontSize: "30px",
                          color: "green",
                          cursor: "pointer",
                          paddingRight: "10px",
                        }}
                        onClick={() => {
                          setSelectedAppointmentId(appointment.id);
                          setConfirmationAction("Approved");
                          setShowDeleteAlert(true);
                        }}
                      />

                      <IonIcon
                        icon={closeOutline}
                        style={{
                          fontSize: "30px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedAppointmentId(appointment.id);
                          setConfirmationAction("Declined");
                          setShowDeleteAlert(true);
                        }}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={"Confirm Status Change"}
        message={`Are you sure you want to change the status to ${confirmationAction}?`}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              setSelectedAppointmentId(null);
              setConfirmationAction(null);
            },
          },
          {
            text: "Confirm",
            handler: handleConfirmation,
          },
        ]}
      />
    </main>
  );
};

export default AppointmentTable;
