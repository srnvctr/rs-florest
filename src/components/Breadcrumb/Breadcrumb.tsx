import React from "react";
import { IonBreadcrumb, IonBreadcrumbs } from "@ionic/react";
import { useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../../firebase/auth/AuthUserProvider";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");
  const history = useHistory();

  const auth = useAuth();

  return (
    <IonBreadcrumbs mode="ios" style={{ padding: "50px 100px 20px" }}>
      <IonBreadcrumb key="home">
        <p
          onClick={() => history.push(auth.user ? "/home" : "/")}
          style={{ cursor: "pointer" }}
        >
          Home
        </p>
      </IonBreadcrumb>
      {paths.map((path, index) => (
        <IonBreadcrumb key={index + 1}>
          <p
            onClick={() => history.push(`/${path}`)}
            style={{ cursor: "pointer" }}
          >
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </p>
        </IonBreadcrumb>
      ))}
    </IonBreadcrumbs>
  );
};

export default Breadcrumbs;
