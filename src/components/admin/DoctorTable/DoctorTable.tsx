import React, { useEffect, useState } from "react";
import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import DoctorFormCreate from "../DoctorFormCreate";
import DoctorFormEdit from "../DoctorFormEdit";

import {
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  Doctor,
} from "../../../firebase/doctor/doctor";

import "./DoctorTable.css";

const DoctorTable: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<string | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editDoctorData, setEditDoctorData] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorData = await getDoctor();
        setDoctors(doctorData);
        console.log("Fetched doctors:", doctorData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleEdit = (id: string) => {
    const doctorToEdit = doctors.find((doctor) => doctor.id === id);
    if (doctorToEdit) {
      setEditDoctorData(doctorToEdit);
      setEditModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setDoctorToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleCreateDoctor = () => {
    setCreateModalOpen(true);
  };

  const handleCreateFormSubmit = async (formData: any) => {
    try {
      await createDoctor(formData);
      alert("Doctor created successfully!");
      setCreateModalOpen(false);

      // Update doctors data after creating a new doctor
      const updatedDoctorData = await getDoctor();
      setDoctors(updatedDoctorData);
    } catch (error) {
      alert("Error creating doctor!");
      console.error("Error creating doctor:", error);
    }
  };

  const handleEditFormSubmit = async (formData: any) => {
    try {
      if (editDoctorData) {
        await updateDoctor(editDoctorData.id, formData);
        alert("Doctor updated successfully!");
        setEditDoctorData(null);
        setEditModalOpen(false);

        // Update doctors data after editing a doctor
        const updatedDoctorData = await getDoctor();
        setDoctors(updatedDoctorData);
      }
    } catch (error) {
      alert("Error updating doctor!");
      console.error("Error updating doctor:", error);
    }
  };

  const handleDeleteConfirmation = async () => {
    try {
      if (doctorToDelete) {
        await deleteDoctor(doctorToDelete);
        setShowDeleteAlert(false);
        setDoctorToDelete(null);

        // Update doctors data after deleting a doctor
        const updatedDoctorData = await getDoctor();
        setDoctors(updatedDoctorData);
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const renderTable = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (doctors.length === 0) {
      return <div>No doctors available.</div>;
    }

    return (
      <table className="DoctorTable-Table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Address</th>
            <th>Brief Profile</th>
            <th>Contact</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>{doctor.address}</td>
              <td>{doctor.briefProfile}</td>
              <td>{doctor.contact}</td>
              <td>
                <a
                  href={doctor.image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Image
                </a>
              </td>
              <td>
                <button onClick={() => handleEdit(doctor.id)}>
                  <IonIcon
                    icon={createOutline}
                    style={{ fontSize: "25px", color: "green" }}
                  />
                </button>
                <button onClick={() => handleDelete(doctor.id)}>
                  <IonIcon
                    icon={trashOutline}
                    style={{ fontSize: "25px", color: "red" }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <main style={{ width: "100%" }}>
      <div className="ion-padding">
        <h1>Doctor Table</h1>
        <IonButton onClick={handleCreateDoctor}>Create Doctor</IonButton>
        {renderTable()}
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header={"Confirm Delete"}
          message={"Are you sure you want to delete this doctor?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                setShowDeleteAlert(false);
                setDoctorToDelete(null);
              },
            },
            {
              text: "Delete",
              handler: handleDeleteConfirmation,
            },
          ]}
        />
        <DoctorFormCreate
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateFormSubmit}
        />
        <DoctorFormEdit
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          initialFormData={editDoctorData}
          onSubmit={handleEditFormSubmit}
        />
      </div>
    </main>
  );
};

export default DoctorTable;
