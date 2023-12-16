import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React, { ReactNode } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Breadcrumbs from "../Breadcrumb"
import { useLocation } from "react-router-dom";

interface LayoutpageProps {
  children: ReactNode;
}

const Layoutpage: React.FC<LayoutpageProps> = (props) => {
  const { children } = props;
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <IonPage>
        <IonHeader>
          <Navbar />
        </IonHeader>

        <IonContent>
          {currentPath !== "/home" && currentPath !== "/" && (
            <Breadcrumbs />
          )}
          <div style={{ minHeight: "68vh", paddingBottom: "50px" }}>
            {children}
          </div>
          <Footer />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Layoutpage;
