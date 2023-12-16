import React from "react";
import { IonContent } from "@ionic/react";

import Homepage from "../../Homepage";
import Layoutpage from "../../Layoutpage";
import Navbar from "../../Navbar";
import Footer from "../../Footer";

const HomeViews: React.FC = () => {
  return (
    <Layoutpage>
      {/* <Navbar /> */}
      <Homepage />
      {/* <Footer /> */}
    </Layoutpage>
  );
};

export default HomeViews;
