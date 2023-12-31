import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonButton,
} from "@ionic/react";
import React, { useContext } from "react";
import { useIonRouter } from "@ionic/react";
import { useAuth } from "../../firebase/auth/AuthUserProvider";

import "./NotFound.css";

const NotFound: React.FC = () => {
  const auth = useAuth();
  const ionRouter = useIonRouter();

  return (
    <IonPage>
      <IonContent>
        <div className="NotFound_Wrapper">
          <section className="NotFound_Title">
            <IonTitle>404</IonTitle>
            <IonText>Page Not Found</IonText>
          </section>

          <section className="NotFound_Description">
            <IonText>
              Sorry, the page you are looking for may not exist or you don't
              have permission to access it.
            </IonText>
          </section>

          <section className="NotFound_Button">
            <IonButton
              size="large"
              onClick={() => ionRouter.push(auth.user.id ? "/home" : "/")}
            >
              Go Home
            </IonButton>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
