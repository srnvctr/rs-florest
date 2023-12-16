import { IonText } from "@ionic/react";
import React from "react";

import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <section className="Footer-Wrapper">
      <IonText>
        © 2023 Kelompok 12 Sistem Informasi Teknik Informatika 21
      </IonText>
    </section>
  );
};

export default Footer;
