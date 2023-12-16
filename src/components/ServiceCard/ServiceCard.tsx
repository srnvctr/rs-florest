import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonImg,
} from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";

import "./ServiceCard.css";

interface ServiceCardProps {
  image: string;
  title: string;
  desc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = (props) => {
  const { image, title, desc } = props;

  return (
    <Link
      to={`/services/${encodeURIComponent(title)}`}
      className="ServiceCard-OnClick">
      <IonCard className="ServiceCard-Container">
        <IonCardHeader className="ServiceCard-Header">
          <IonImg src={image} alt={image} />
        </IonCardHeader>

        <IonCardContent className="ServiceCard-Content">
          <div>
            <IonCardTitle>{title}</IonCardTitle>
            <div className="ServiceCard-Desc">
              <IonCardSubtitle>{desc}</IonCardSubtitle>
            </div>
          </div>
          <Link to="#" className="ServiceCard-Link">
            Learn More
            <IonIcon className="" icon={arrowForward} />
          </Link>
        </IonCardContent>
      </IonCard>
    </Link>
  );
};

export default ServiceCard;
