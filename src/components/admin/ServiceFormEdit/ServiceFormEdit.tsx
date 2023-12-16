import React, { useState, useEffect } from "react";
import { IonButton, IonInput, IonModal, IonTextarea } from "@ionic/react";

interface ServiceFormEditProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormData: any | null;
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  title: string;
  content: string[];
  image: string;
}

const ServiceFormEdit: React.FC<ServiceFormEditProps> = ({
  isOpen,
  onClose,
  initialFormData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: [],
    image: "",
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData({
        title: initialFormData.title,
        content: initialFormData.content,
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
        <h1>Edit Service</h1>
        <IonInput
          type="text"
          label="Title"
          labelPlacement="floating"
          fill="outline"
          placeholder="Title"
          value={formData.title}
          onIonChange={(e) => handleInputChange("title", e.detail.value!)}
        />

        <IonTextarea
          label="Content"
          labelPlacement="floating"
          fill="outline"
          placeholder="Content"
          autoGrow={true}
          value={formData.content.join("\n")}
          onIonChange={(e) => handleTextareaChange(e.detail.value!)}
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

export default ServiceFormEdit;
