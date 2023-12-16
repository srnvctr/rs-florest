import { IonContent, IonPage } from "@ionic/react";
import React from "react";

import AdminNavbar from "../../../admin/AdminNavbar";
import ServiceTable from "../../../admin/ServiceTable";

const ServiceTableViews: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div style={{display: "flex", width: "100%", height: "100%"}}>
          <AdminNavbar />
          <ServiceTable />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ServiceTableViews;
