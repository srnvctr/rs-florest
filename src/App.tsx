import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Import pages */
import Login from "./pages/Login";
import Home from "./pages/Home";
import LandingPage from "./components/views/LandingPageViews";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import ServiceDetails from "./components/views/ServiceDetailsViews";
import DoctorDetails from "./components/views/DoctorDetailsViews";
import Appointment from "./pages/Appointment";
import _404 from "./pages/_404";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import MyAppointment from "./pages/MyAppointment";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminService from "./pages/AdminService";
import AdminDoctor from "./pages/AdminDoctor";
import AdminAppointment from "./pages/AdminAppointment";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          {/* <ProtectedRoute> */}
            <Home />
          {/* </ProtectedRoute> */}
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/aboutus">
          <AboutUs />
        </Route>
        <Route exact path="/services">
          <Services />
        </Route>
        <Route exact path="/services/:title">
          <ServiceDetails />
        </Route>
        <Route exact path="/doctors">
          <Doctors />
        </Route>
        <Route exact path="/doctors/:name">
          <DoctorDetails />
        </Route>
        <Route exact path="/appointment">
          {/* <ProtectedRoute> */}
            <Appointment />
          {/* </ProtectedRoute> */}
        </Route>
        <Route>
          <_404 />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/myAppointment">
          <MyAppointment />
        </Route>
        <Route exact path="/admin/service">
          {/* <ProtectedRoute> */}
            <AdminService />
          {/* </ProtectedRoute> */}
        </Route>
        <Route exact path="/admin/doctor">
          {/* <ProtectedRoute> */}
            <AdminDoctor />
          {/* </ProtectedRoute> */}
        </Route>
        <Route exact path="/admin/appointment">
          {/* <ProtectedRoute> */}
            <AdminAppointment />
          {/* </ProtectedRoute> */}
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
