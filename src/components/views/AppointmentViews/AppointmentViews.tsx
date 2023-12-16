import React from "react";

import Layoutpage from "../../Layoutpage";
import AppointmentForm from "../../AppointmentForm/AppointmentForm";

import "./AppointmentViews.css";

const AppointmentViews: React.FC = () => {
  return (
    <Layoutpage>
      <div className="AppointmentViews-Container">
        <AppointmentForm />
        <img src="./images/schedule_hours.svg" />
      </div>
    </Layoutpage>
  );
};

export default AppointmentViews;
