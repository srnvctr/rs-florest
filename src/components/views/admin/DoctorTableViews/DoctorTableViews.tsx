import { IonContent, IonPage } from "@ionic/react";
import React from "react";

import AdminNavbar from "../../../admin/AdminNavbar";
import DoctorTable from "../../../admin/DoctorTable";

const DoctorTableViews: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div style={{ display: "flex", width: "100%" }}>
          <AdminNavbar />
          <DoctorTable />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DoctorTableViews;
