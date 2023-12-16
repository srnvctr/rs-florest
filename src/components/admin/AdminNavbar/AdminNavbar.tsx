import { IonList, IonItem, IonText, IonIcon } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  personOutline,
  medkitOutline,
  calendarOutline,
  logOutOutline,
} from "ionicons/icons";

import "./AdminNavbar.css";

const AdminNavbar: React.FC = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    if (location.pathname.includes("/admin/service")) {
      setActiveItem("/admin/service");
    } else if (location.pathname.includes("/admin/doctor")) {
      setActiveItem("/admin/doctor");
    } else if (location.pathname.includes("/admin/appointment")) {
      setActiveItem("/admin/appointment");
    } else {
      setActiveItem(null);
    }
  }, [location.pathname]);

  return (
    <header className="AdminNavbar-Container">
      <div>
        <h4>Admin</h4>
      </div>

      <IonList className="AdminNavbar-List">
        <IonItem routerLink="/admin/service" className={activeItem === "/admin/service" ? "AdminNavbar-Active" : ""}>
          <IonIcon icon={medkitOutline} style={{ paddingRight: "10px" }} />
          <IonText>Service</IonText>
        </IonItem>

        <IonItem routerLink="/admin/doctor" className={activeItem === "/admin/doctor" ? "AdminNavbar-Active" : ""}>
          <IonIcon icon={personOutline} style={{ paddingRight: "10px" }} />
          <IonText>Doctor</IonText>
        </IonItem>

        <IonItem routerLink="/admin/appointment" className={activeItem === "/admin/appointment" ? "AdminNavbar-Active" : ""}>
          <IonIcon icon={calendarOutline} style={{ paddingRight: "10px" }} />
          <IonText>Appointment</IonText>
        </IonItem>

        <IonItem>
          <IonIcon icon={logOutOutline} style={{ paddingRight: "10px" }} />
          <IonText>Sign Out</IonText>
        </IonItem>
      </IonList>
    </header>
  );
};

export default AdminNavbar;
