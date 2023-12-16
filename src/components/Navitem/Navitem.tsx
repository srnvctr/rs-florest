import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navitem.css";

interface NavItemProps {
  title: string;
  url: string;
}

const Navitem: React.FC<NavItemProps> = (props) => {
  const { title, url } = props;
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(location.pathname === url);
  }, [location, url]);

  return (
    <Link
      to={url}
      className={`NavItem-Default ${isActive ? "NavItem-IsActive" : ""}`}
      onClick={() => setIsActive(true)}
    >
      <IonText>{title}</IonText>
    </Link>
  );
};

export default Navitem;
