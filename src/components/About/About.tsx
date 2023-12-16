import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonImg,
  IonCard,
  IonInput,
  IonCardContent,
  IonButton,
  IonItem,
  IonTextarea,
  IonIcon,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";
import React from "react";
import {
  callOutline,
  locationOutline,
  mailOutline,
  timeOutline,
} from "ionicons/icons";

import "./About.css";

const About: React.FC = () => {
  return (
    <main className="About-Wrapper">
      <IonGrid className="About-Container">
        {/* Welcome Message */}
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto" className="About-img">
            <img src="./images/About-picture.png" alt="" />
          </IonCol>

          <IonCol size="auto" className="About-ContentWrapper">
            <IonRow>
              <section className="About-TitleWrapper">
                <IonText className="About-FeatureText">
                  WELCOME TO RS FLOREST
                </IonText>
                <h1 className="About-HighlightText">
                  Best Care for Your Good Health
                </h1>
              </section>
            </IonRow>

            <IonRow className="About-ContentList">
              <IonCol size="auto">
                <ul>
                  <li>A Passion for Healing</li>
                  <li>All our best</li>
                  <li>A Legacy of Excellence</li>
                </ul>
              </IonCol>

              <IonCol>
                <ul>
                  <li>5-Star Care</li>
                  <li>Believe in us</li>
                  <li>Always Caring</li>
                </ul>
              </IonCol>
            </IonRow>

            <IonRow>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              placerat scelerisque tortor ornare ornare. Quisque placerat
              scelerisque tortor ornare ornare Convallis felis vitae tortor
              augue. Velit nascetur proin massa in. Consequat faucibus porttitor
              enim et.
            </IonRow>

            <IonRow>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              placerat scelerisque. Convallis felis vitae tortor augue. Velit
              nascetur proin massa in.
            </IonRow>
          </IonCol>
        </IonRow>

        {/* Map Location */}
        <IonRow className="ion-justify-content-center">
          <IonImg src="./images/Map.png" />
        </IonRow>

        {/* Contact Us */}
        <IonRow className="ion-justify-content-center">
          {/* ContactForm */}
          <IonCol
            className="About-ContactForm ion-padding-horizontal"
            size="auto"
          >
            <IonRow>
              <div>
                <IonRow>
                  <IonText className="About-FeatureText">GET IN TOUCH</IonText>
                </IonRow>
                <IonRow>
                  <h2 className="About-ContactTitle">Contact</h2>
                </IonRow>
              </div>
            </IonRow>

            <IonRow>
              <form className="About-FormContainer">
                <div className="About-Form">
                  <IonItem>
                    <IonInput placeholder="Name" />
                  </IonItem>

                  <IonItem>
                    <IonInput placeholder="Email" />
                  </IonItem>

                  <IonItem>
                    <IonInput placeholder="Subject" />
                  </IonItem>

                  <IonItem>
                    <IonTextarea placeholder="Message" />
                  </IonItem>

                  <IonButton className="About-SubmitBtn">SUBMIT</IonButton>
                </div>
              </form>
            </IonRow>
          </IonCol>

          <IonCol size="6">
            {/* Contact Info */}
            <IonRow className="About-ContactCardWrapper">
              <IonCol>
                <IonCard className="About-ContactCard">
                  <IonCardContent className="About-CardContent">
                    <IonIcon icon={callOutline} size="large"></IonIcon>
                    <IonCardTitle>EMERGENCY</IonCardTitle>
                    <IonCardSubtitle>(237) 681-812-255</IonCardSubtitle>
                    <IonCardSubtitle>(237) 666-331-894</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard className="About-ContactCard">
                  <IonCardContent className="About-CardContent">
                    <IonIcon icon={locationOutline} size="large"></IonIcon>
                    <IonCardTitle>LOCATION</IonCardTitle>
                    <IonCardSubtitle>0123 Some place</IonCardSubtitle>
                    <IonCardSubtitle>9876 Some country</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard className="About-ContactCard">
                  <IonCardContent className="About-CardContent">
                    <IonIcon icon={mailOutline} size="large"></IonIcon>
                    <IonCardTitle>EMAIL</IonCardTitle>
                    <IonCardSubtitle>fildineeesoe@gmil.com</IonCardSubtitle>
                    <IonCardSubtitle>jen@gmail.com</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard className="About-ContactCard">
                  <IonCardContent className="About-CardContent">
                    <IonIcon icon={timeOutline} size="large"></IonIcon>
                    <IonCardTitle>WORKING HOURS</IonCardTitle>
                    <IonCardSubtitle>Mon-Sat 09:00-20:00</IonCardSubtitle>
                    <IonCardSubtitle>Sunday Emergency Only</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
    </main>
  );
};

export default About;
