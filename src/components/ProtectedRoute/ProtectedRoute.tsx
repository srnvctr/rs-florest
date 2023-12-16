import { useContext } from "react";
import {
  IonContent,
  IonTitle,
  IonText,
  IonButton,
  IonPage,
} from "@ionic/react";
import { Redirect, useHistory, useLocation } from "react-router";
// import { AuthContext } from "../../firebase/auth/AuthContext";
import { useAuth } from "../../firebase/auth/AuthUserProvider";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();
  const history = useHistory();

  const isAppointmentRoute = location.pathname.includes("/appointment");

  // if (!auth.user.id) {
  //   if (isAppointmentRoute) {
  //     alert("Login terlebih dahulu!");
  //     // history.push("/");

  //     return <Redirect to="/" />;
  //   }
  // }

  return children;
}

export default ProtectedRoute;
