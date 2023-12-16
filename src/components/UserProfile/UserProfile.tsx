import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import "./UserProfile.css";

import { useAuth } from "../../firebase/auth/AuthUserProvider";
import { UserType } from "../../firebase/auth/user";

type PartialUserType = Partial<UserType>;

const UserProfile: React.FC = () => {
  const auth = useAuth();
  const [personalData, setPersonalData] = useState<PartialUserType | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setPersonalData((prevData) => {
      if (prevData !== auth.user) {
        return auth.user;
      }
      return prevData;
    });
  }, [auth.user]);

  const handleEditProfile = async () => {
    if (isEditing) {
      await auth.updateName(personalData?.name || "");
      await auth.updateGender(personalData?.gender || "");
      await auth.updateAddress(personalData?.address || "");
      await auth.updateNumber(personalData?.number || "");

      setPersonalData(auth.user);

      alert("Profile Updated");
    }

    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  return (
    <IonCard>
      <IonCardContent className="UserProfile-Content">
        <IonInput
          type="text"
          label="Name"
          labelPlacement="stacked"
          fill="outline"
          placeholder="Enter Your Name"
          value={personalData?.name || ""}
          disabled={!isEditing}
          className="UserProfile-Disabled"
          onIonChange={(e) =>
            setPersonalData((prevData) => ({
              ...prevData,
              name: e.detail.value!,
            }))
          }
        />

        <IonSelect
          placeholder="Select Your Gender"
          label="Gender"
          labelPlacement="stacked"
          fill="outline"
          value={personalData?.gender || ""}
          disabled={!isEditing}
          className="UserProfile-Gender"
          onIonChange={(e) =>
            setPersonalData((prevData) => ({
              ...prevData,
              gender: e.detail.value!,
            }))
          }
        >
          <IonSelectOption value="male">Male</IonSelectOption>
          <IonSelectOption value="female">Female</IonSelectOption>
        </IonSelect>

        <IonInput
          type="text"
          label="Address"
          labelPlacement="stacked"
          fill="outline"
          placeholder="Enter Your Address"
          value={personalData?.address || ""}
          disabled={!isEditing}
          className="UserProfile-Disabled"
          onIonChange={(e) =>
            setPersonalData((prevData) => ({
              ...prevData,
              address: e.detail.value!,
            }))
          }
        />

        <IonInput
          type="number"
          label="Phone"
          labelPlacement="stacked"
          fill="outline"
          placeholder="Enter Your Phone Number"
          value={personalData?.number || ""}
          disabled={!isEditing}
          className="UserProfile-Disabled"
          onIonChange={(e) =>
            setPersonalData((prevData) => ({
              ...prevData,
              number: e.detail.value!,
            }))
          }
        />

        <IonInput
          type="email"
          label="Email"
          labelPlacement="stacked"
          fill="outline"
          value={personalData?.email || ""}
          disabled={true}
          className="UserProfile-Disabled"
        />

        <div>
          <IonButton onClick={handleEditProfile}>
            {isEditing ? "Save" : "Edit Profile"}
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default UserProfile;
