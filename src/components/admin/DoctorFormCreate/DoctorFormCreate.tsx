import React, { useState } from "react";
import { IonButton, IonInput, IonModal, IonTextarea } from "@ionic/react";

import "./DoctorFormCreate.css";

interface DoctorFormCreateProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  name: string;
  specialty: string;
  briefProfile: string;
  address: string;
  contact: string;
  image: string;
}

const DoctorFormCreate: React.FC<DoctorFormCreateProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    specialty: "",
    briefProfile: "",
    address: "",
    contact: "",
    image: "",
  });

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
  };

  const handleTextareaChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      briefProfile: value,
    }));
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} className="DoctorForm-Wrapper">
      <div className="DoctorForm-Container">
        <h1>Create Doctor</h1>
        <IonInput
          type="text"
          label="Name"
          labelPlacement="floating"
          fill="outline"
          placeholder="Name"
          onIonChange={(e) => handleInputChange("name", e.detail.value!)}
        />

        <IonInput
          type="text"
          label="Specialty"
          labelPlacement="floating"
          fill="outline"
          placeholder="Specialty"
          onIonChange={(e) => handleInputChange("specialty", e.detail.value!)}
        />

        <IonTextarea
          label="Brief Profile"
          labelPlacement="floating"
          fill="outline"
          placeholder="Brief Profile"
          autoGrow={true}
          onIonChange={(e) => handleTextareaChange(e.detail.value!)}
        />

        <IonInput
          type="text"
          label="Address"
          labelPlacement="floating"
          fill="outline"
          placeholder="Address"
          onIonChange={(e) => handleInputChange("address", e.detail.value!)}
        />

        <IonInput
          type="text"
          label="Contact"
          labelPlacement="floating"
          fill="outline"
          placeholder="Contact"
          onIonChange={(e) => handleInputChange("contact", e.detail.value!)}
        />

        <IonInput
          type="text"
          label="Image URL"
          labelPlacement="floating"
          fill="outline"
          placeholder="Image URL"
          onIonChange={(e) => handleInputChange("image", e.detail.value!)}
        />

        <div className="DoctorForm-Button">
          <IonButton onClick={onClose} color={"danger"}>
            Cancel
          </IonButton>
          <IonButton onClick={handleFormSubmit}>Submit</IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default DoctorFormCreate;
