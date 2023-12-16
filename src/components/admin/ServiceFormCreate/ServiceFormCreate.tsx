import React, { useState } from "react";
import { IonButton, IonInput, IonModal, IonTextarea } from "@ionic/react";

import "./ServiceFormCreate.css";

interface ServiceFormCreateProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  title: string;
  content: string[];
  image: string;
}

const ServiceFormCreate: React.FC<ServiceFormCreateProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: [],
    image: "",
  });

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
  };

  const handleTextareaChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: value.split("\n"),
    }));
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} className="ServiceForm-Wrapper">
      <div className="ServiceForm-Container">
        <h1>Create Service</h1>
        <IonInput
          type="text"
          label="Title"
          labelPlacement="floating"
          fill="outline"
          placeholder="Title"
          onIonChange={(e) => handleInputChange("title", e.detail.value!)}
        />

        <IonTextarea
          label="Content"
          labelPlacement="floating"
          fill="outline"
          placeholder="Content"
          autoGrow={true}
          onIonChange={(e) => handleTextareaChange(e.detail.value!)}
        />

        <IonInput
          type="text"
          label="Image URL"
          labelPlacement="floating"
          fill="outline"
          placeholder="Image URL"
          onIonChange={(e) => handleInputChange("image", e.detail.value!)}
        />

        <div className="ServiceForm-Button">
          <IonButton onClick={onClose} color={"danger"}>
            Cancel
          </IonButton>
          <IonButton onClick={handleFormSubmit}>Submit</IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default ServiceFormCreate;
