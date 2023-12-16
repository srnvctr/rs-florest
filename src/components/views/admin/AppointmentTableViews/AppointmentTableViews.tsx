import { IonContent, IonPage } from "@ionic/react";
import React from "react";

import AdminNavbar from "../../../admin/AdminNavbar";
import AppointmentTable from "../../../admin/AppointmentTable";

const AppointmentTableViews: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div style={{ display: "flex", height: "100%" }}>
          <AdminNavbar />
          <AppointmentTable />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AppointmentTableViews;
