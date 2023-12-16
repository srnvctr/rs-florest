import {
  IonHeader,
  IonTitle,
  IonButton,
  IonItem,
  IonIcon,
  IonCard,
  IonLabel,
  IonText,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useIonRouter } from "@ionic/react";
import {
  chevronDownOutline,
  chevronUpOutline,
  logOutOutline,
  personOutline,
  calendarOutline,
} from "ionicons/icons";

import NavItem from "../Navitem";
import "./Navbar.css";

import { useAuth } from "../../firebase/auth/AuthUserProvider";

const Navbar: React.FC = () => {
  const auth = useAuth();
  const [name, setName] = useState<string | null>(auth.user?.name || "");
  const ionRouter = useIonRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setName(auth.user?.name || "");
  }, [auth.user]);

  const toggleMenuVisibility = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    {
      title: "Home",
      url: `${auth.user.id ? "/home" : "/"}`,
    },
    {
      title: "About us",
      url: "/aboutus",
    },
    {
      title: "Services",
      url: "/services",
    },
    {
      title: "Doctors",
      url: "/doctors",
    },
    // Conditionally include "Appointment" link only for logged-in users
    auth.user.id
      ? {
          title: "Appointment",
          url: "/appointment",
        }
      : null,
  ].filter(Boolean); // Filter out null values

  const handleSignOut = async () => {
    await auth.logOut();
    ionRouter.push("/");
  };

  return (
    <IonHeader className="Navbar-Container">
      <div className="Navbar-Wrapper">
        <section className="Navbar-Title">
          <Link to={`${auth.user.id ? "/home" : "/"}`} className="Navbar-Link">
            <img src="./images/Logo-RS-Florest.png" alt="logo" width={40} />
            <IonTitle>RS Florest</IonTitle>
          </Link>
        </section>

        <section className="Navbar-Navitem">
          {navItems.map((navItem, index) => (
            <NavItem key={index} title={navItem.title} url={navItem.url} />
          ))}
        </section>

        <section className="Navbar-Button">
          {auth.user.id ? (
            <div className="Navbar-Profile">
              <IonButton onClick={toggleMenuVisibility}>
                {name}
                <div className="Navbar-ProfileToggleIcon">
                  {!isMenuOpen ? (
                    <IonIcon
                      icon={chevronDownOutline}
                      color="light"
                      onClick={toggleMenuVisibility}
                    ></IonIcon>
                  ) : (
                    <IonIcon
                      icon={chevronUpOutline}
                      color="light"
                      onClick={toggleMenuVisibility}
                    ></IonIcon>
                  )}
                </div>
              </IonButton>

              {isMenuOpen && (
                <IonCard className="Navbar-Submenu">
                  <IonItem routerLink="/profile" onClick={toggleMenuVisibility}>
                    <IonIcon
                      icon={personOutline}
                      style={{ paddingRight: "10px" }}
                    />
                    <IonLabel>
                      <h2>Profile</h2>
                    </IonLabel>
                  </IonItem>

                  <IonItem
                    routerLink="/myAppointment"
                    onClick={toggleMenuVisibility}
                  >
                    <IonIcon
                      icon={calendarOutline}
                      style={{ paddingRight: "10px" }}
                    />
                    <IonLabel>
                      <h2>My Appointment</h2>
                    </IonLabel>
                  </IonItem>

                  <IonItem
                    onClick={handleSignOut}
                    style={{ cursor: "pointer" }}
                  >
                    <IonIcon
                      icon={logOutOutline}
                      style={{ paddingRight: "10px" }}
                    />
                    <IonLabel>
                      <h2>Sign Out</h2>
                    </IonLabel>
                  </IonItem>
                </IonCard>
              )}
            </div>
          ) : (
            <>
              <IonButton
                size="large"
                href="/login"
                style={{
                  "--border-color": "#bfd2f8",
                  "--background": "transparent",
                  color: "white",
                  "--border-style": "solid",
                  "--border-width": "3px",
                }}
              >
                Login
              </IonButton>
              <IonButton size="large" href="/signUp">
                Sign Up
              </IonButton>
            </>
          )}
        </section>
      </div>
    </IonHeader>
  );
};

export default Navbar;
