import React, { useState, useEffect } from "react";
import { IonButton, IonInput, IonModal, IonTextarea } from "@ionic/react";

interface DoctorFormEditProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormData: any | null;
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

const DoctorFormEdit: React.FC<DoctorFormEditProps> = ({
  isOpen,
  onClose,
  initialFormData,
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

  useEffect(() => {
    if (initialFormData) {
      setFormData({
        name: initialFormData.name,
        specialty: initialFormData.specialty,
        briefProfile: initialFormData.briefProfile,
        address: initialFormData.address,
        contact: initialFormData.contact,
        image: initialFormData.image,
      });
    }
  }, [initialFormData]);

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
        <h1>Edit Doctor</h1>
        <IonInput
          type="text"
          label="Name"
          labelPlacement="floating"
          fill="outline"
          placeholder="Name"
          value={formData.name}
          onIonChange={(e) => handleInputChange("name", e.detail.value!)}
        />

        <IonInput
          type="text"
          label="Specialty"
          labelPlacement="floating"
          fill="outline"
          placeholder="Specialty"
          value={formData.specialty}
          onIonChange={(e) => handleInputChange("specialty", e.detail.value!)}
        />

        <IonTextarea
          label="Brief Profile"
          labelPlacement="floating"
          fill="outline"
          placeholder="Brief Profile"
          autoGrow={true}
          value={formData.briefProfile}
          onIonChange={(e) => handleTextareaChange(e.detail.value!)}
        />

        <IonInput
          type="text"
          label="Address"
          labelPlacement="floating"
          fill="outline"
          placeholder="Address"
          value={formData.address}
          onIonChange={(e) => handleInputChange("address", e.detail.value!)}
        />

        <IonInput
          type="text"
          label="Contact"
          labelPlacement="floating"
          fill="outline"
          placeholder="Contact"
          value={formData.contact}
          onIonChange={(e) => handleInputChange("contact", e.detail.value!)}
        />

        <IonInput
          type="text"
          label="Image URL"
          labelPlacement="floating"
          fill="outline"
          placeholder="Image URL"
          value={formData.image}
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

export default DoctorFormEdit;
