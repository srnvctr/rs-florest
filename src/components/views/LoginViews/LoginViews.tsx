import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

// import LoginForm from "../../LoginForm";
import LoginForm from "../../LoginForm/LoginForm";

const LoginViews: React.FC = () => {
  return (
    <IonPage>
      <LoginForm />
    </IonPage>
  );
};

export default LoginViews;
