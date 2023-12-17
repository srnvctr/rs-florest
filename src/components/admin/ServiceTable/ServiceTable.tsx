import React, { useEffect, useState } from "react";
import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import {
  getService,
  createService,
  updateService,
  deleteService,
} from "../../../firebase/service/service";
import ServiceFormCreate from "../ServiceFormCreate";
import ServiceFormEdit from "../ServiceFormEdit";

import "./ServiceTabel.css"

const ServiceTable: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editServiceData, setEditServiceData] = useState<any | null>(null);

  const fetchData = async () => {
    try {
      const serviceData = await getService();
      setServices(serviceData);
      console.log(serviceData);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    const serviceToEdit = services.find((service) => service.id === id);
    if (serviceToEdit) {
      setEditServiceData(serviceToEdit);
      setEditModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setServiceToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleCreateService = () => {
    setCreateModalOpen(true);
  };

  const handleCreateFormSubmit = async (formData: any) => {
    try {
      await createService(formData);
      alert("Service created successfully!");
      setCreateModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Error creating service!");
      console.error("Error creating service:", error);
    }
  };

  const handleEditFormSubmit = async (formData: any) => {
    try {
      if (editServiceData) {
        await updateService(editServiceData.id, formData);
        alert("Service updated successfully!");
        setEditServiceData(null);
        setEditModalOpen(false);
        fetchData();
      }
    } catch (error) {
      alert("Error updating service!");
      console.error("Error updating service:", error);
    }
  };

  const renderTable = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (services.length === 0) {
      return <div>No services available.</div>;
    }

    return (
      <table className="ServiceTable-Table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image Link</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.title}</td>
              <td>
                {service.content.map((item: string, index: number) => (
                  <React.Fragment key={index}>
                    {item}
                    <br />
                    <br />
                  </React.Fragment>
                ))}
              </td>
              <td>
                {service.image && (
                  <a
                    href={service.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "15px" }}
                  >
                    View Image
                  </a>
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(service.id)}>
                  <IonIcon
                    icon={createOutline}
                    style={{ fontSize: "25px", color: "green" }}
                  />
                </button>
                <button onClick={() => handleDelete(service.id)}>
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
        <h1>Service Table</h1>
        <IonButton onClick={handleCreateService}>Create Service</IonButton>
        {renderTable()}
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header={"Confirm Delete"}
          message={"Are you sure you want to delete this service?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                setShowDeleteAlert(false);
                setServiceToDelete(null);
              },
            },
            {
              text: "Delete",
              handler: () => {
                if (serviceToDelete) {
                  deleteService(serviceToDelete);
                  setServiceToDelete(null);
                  setShowDeleteAlert(false);
                  fetchData();
                }
              },
            },
          ]}
        />
        <ServiceFormCreate
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateFormSubmit}
        />
        <ServiceFormEdit
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          initialFormData={editServiceData}
          onSubmit={handleEditFormSubmit}
        />
      </div>
    </main>
  );
};

export default ServiceTable;
