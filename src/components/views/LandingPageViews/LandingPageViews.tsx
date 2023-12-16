import { IonPage } from "@ionic/react";
import React from "react";

import Home from "../../Homepage";
import Layoutpage from "../../Layoutpage";

const LandingPage: React.FC = () => {
  return (
    <Layoutpage>
      <Home />
    </Layoutpage>
  );
};

export default LandingPage;
