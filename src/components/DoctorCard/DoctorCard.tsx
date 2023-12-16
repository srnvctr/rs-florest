import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
} from "@ionic/react";
import { Link } from "react-router-dom";

import "./DoctorCard.css";

interface DoctorCardProps {
  id: string;
  image: string;
  name: string;
  specialty: string;
}

const DoctorCard: React.FC<DoctorCardProps> = (props) => {
  const { image, name, specialty } = props;

  return (
    <Link
      to={`/doctors/${encodeURIComponent(name)}`}
      className="DoctorCard-OnClick"
    >
      <IonCard className="DoctorCard-Container">
        <IonCardHeader className="DoctorCard-Header">
          <IonImg src={image} alt={image} />
          <section>
            <IonCardSubtitle>{name}</IonCardSubtitle>
            <IonCardTitle>{specialty}</IonCardTitle>
          </section>
        </IonCardHeader>

        <IonCardContent className="DoctorCard-Content">
          <IonCardSubtitle>View Profile</IonCardSubtitle>
        </IonCardContent>
      </IonCard>
    </Link>
  );
};

export default DoctorCard;
