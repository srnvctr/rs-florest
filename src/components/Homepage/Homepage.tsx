import {
  IonTitle,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
} from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";
import {
  callOutline,
  locationOutline,
  mailOutline,
  timeOutline,
  arrowForwardOutline,
} from "ionicons/icons";

import { useAuth } from "../../firebase/auth/AuthUserProvider";

import "./Homepage.css";

const Home: React.FC = () => {
  const auth = useAuth();
  console.log(auth.user);

  return (
    <main className="Homepage-Wrapper">
      {/* Hero Section */}
      <section className="Homepage-HeroSection">
        <img src="./images/Hero-Homepage.png" alt="" />
        <section className="Homepage-HeroContent">
          <IonText className="Homepage-FeatureText">CARING FOR LIFE</IonText>
          <h1>Leading the Way in Medical Excellence</h1>
          <IonButton size="large" href="/services">
            Our Services
          </IonButton>
        </section>
      </section>

      {/* About Us Section */}
      <section className="Homepage-AboutUsSection">
        <div>
          <IonText className="Homepage-FeatureText">
            WELCOME TO RS FLOREST
          </IonText>
          <IonTitle className="Homepage-HighlightText">
            A Great Place to Receive Care
          </IonTitle>
        </div>
        <IonText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          placerat scelerisque tortor ornare ornare. Convallis felis vitae
          tortor augue. Velit nascetur proin massa in. Consequat faucibus
          porttitor enim et.
        </IonText>
        <Link to={"/aboutus"} className="Homepage-AboutUsLink">
          <IonText>Learn More</IonText>
          <IonIcon
            icon={arrowForwardOutline}
            color="dark"
            size="small"></IonIcon>
        </Link>
        <img src="./images/Homepage-Image1.png" alt="Homepage-image1" />
      </section>

      {/* Our Services Section */}
      <section className="Homepage-OurServicesSection">
        <section className="Homepage-TitleWrapper">
          <IonText className="Homepage-FeatureText">
            CARE YOU CAN BELIEVE IN
          </IonText>
          <IonTitle className="Homepage-HighlightText">Our Services</IonTitle>
        </section>

        <section>
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              <IonCol size="auto">
                <div className="Homepage-OurServicesContentLeft">
                  <IonCol>
                    <IonRow>
                      <img src="./icons/medical 1.svg" alt="icon 1" />
                    </IonRow>
                    <IonRow>
                      <IonText>Free Checkup</IonText>
                    </IonRow>
                  </IonCol>

                  <IonCol>
                    <IonRow>
                      <img src="./icons/medical 2.svg" alt="icon 2" />
                    </IonRow>
                    <IonRow>
                      <IonText>Cardiogram</IonText>
                    </IonRow>
                  </IonCol>

                  <IonCol>
                    <IonRow>
                      <img src="./icons/medical 3.svg" alt="icon 3" />
                    </IonRow>
                    <IonRow>
                      <IonText>Dna Testing</IonText>
                    </IonRow>
                  </IonCol>

                  <IonCol>
                    <IonRow>
                      <img src="./icons/medical 4.svg" alt="icon 4" />
                    </IonRow>
                    <IonRow>
                      <IonText>Blood Bank</IonText>
                    </IonRow>
                  </IonCol>

                  <Link to={"/services"} className="Homepage-OurServicesLink">
                    <IonCol>
                      <IonText>View All</IonText>
                    </IonCol>
                  </Link>
                </div>
              </IonCol>

              <IonCol size="auto" className="Homepage-OurServicesContentMiddle">
                <IonRow>
                  <IonTitle className="Homepage-OurServicesContentMiddleTitle">
                    A passion for putting patients first
                  </IonTitle>
                </IonRow>

                <IonRow className="Homepage-OurServicesContentMiddleList">
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

                <IonRow className="Homepage-OurServicesContentMiddleText1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque placerat scelerisque tortor ornare ornare. Quisque
                  placerat scelerisque tortor ornare ornare Convallis felis
                  vitae tortor augue. Velit nascetur proin massa in. Consequat
                  faucibus porttitor enim et.
                </IonRow>

                <IonRow className="Homepage-OurServicesContentMiddleText2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque placerat scelerisque. Convallis felis vitae tortor
                  augue. Velit nascetur proin massa in.
                </IonRow>
              </IonCol>

              <IonCol size="auto" className="Homepage-OurServicesContentRight">
                <IonRow>
                  <img
                    src="./images/Homepage-Image2.png"
                    alt="Homepage image 2"
                  />
                </IonRow>

                <IonRow>
                  <img
                    src="./images/Homepage-Image3.png"
                    alt="Homepage image 3"
                  />
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </section>
      </section>

      {/* Our Specialties */}
      <section className="Homepage-SpecialtiesSection">
        <section className="Homepage-TitleWrapper">
          <IonText className="Homepage-FeatureText">ALWAYS CARING</IonText>
          <IonTitle className="Homepage-HighlightText">
            Our Specialties
          </IonTitle>
        </section>

        <section className="Homepage-SpecialtiesInfo">
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              <IonCol size="2">
                <IonRow>
                  <img src="./icons/medical 5.svg" alt="" />
                </IonRow>
                <IonRow>
                  <IonText>Neurology</IonText>
                </IonRow>
              </IonCol>

              <IonCol size="2">
                <IonRow>
                  <img src="./icons/medical 5.svg" alt="" />
                </IonRow>
                <IonRow>
                  <IonText>Bones</IonText>
                </IonRow>
              </IonCol>

              <IonCol size="2">
                <IonRow>
                  <img src="./icons/medical 5.svg" alt="" />
                </IonRow>
                <IonRow>
                  <IonText>Oncology</IonText>
                </IonRow>
              </IonCol>

              <IonCol size="2">
                <IonRow>
                  <img src="./icons/medical 5.svg" alt="" />
                </IonRow>
                <IonRow>
                  <IonText>Otorhinolaryngology</IonText>
                </IonRow>
              </IonCol>
            </IonRow>

            <IonRow className="ion-justify-content-center">
              <IonCol size="2">
                <IonRow>
                  <img src="./icons/medical 5.svg" alt="" />
                </IonRow>
                <IonRow>
                  <IonText>Neurology</IonText>
                </IonRow>
              </IonCol>

              <IonCol size="2">
                <IonRow>
                  <img src="./icons/medical 5.svg" alt="" />
                </IonRow>
                <IonRow>
                  <IonText>Bones</IonText>
                </IonRow>
              </IonCol>

              <IonCol size="2">
                <IonRow>
                  <img src="./icons/medical 5.svg" alt="" />
                </IonRow>
                <IonRow>
                  <IonText>Oncology</IonText>
                </IonRow>
              </IonCol>

              <IonCol size="2">
                <IonRow>
                  <img src="./icons/medical 5.svg" alt="" />
                </IonRow>
                <IonRow>
                  <IonText>Otorhinolaryngology</IonText>
                </IonRow>
              </IonCol>
            </IonRow>

            <IonRow className="ion-justify-content-center">
              <IonCol size="2">
                <IonRow>
                  <img src="./icons/medical 5.svg" alt="" />
                </IonRow>
                <IonRow>
                  <IonText>Neurology</IonText>
                </IonRow>
              </IonCol>

              <IonCol size="2">
                <IonRow>
                  <img src="./icons/medical 5.svg" alt="" />
                </IonRow>
                <IonRow>
                  <IonText>Bones</IonText>
                </IonRow>
              </IonCol>

              <IonCol size="2">
                <IonRow>
                  <img src="./icons/medical 5.svg" alt="" />
                </IonRow>
                <IonRow>
                  <IonText>Oncology</IonText>
                </IonRow>
              </IonCol>

              <IonCol size="2">
                <IonRow>
                  <img src="./icons/medical 5.svg" alt="" />
                </IonRow>
                <IonRow>
                  <IonText>Otorhinolaryngology</IonText>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </section>
      </section>

      {/* Contact Section */}
      <section className="Homepage-ContactSection">
        <section className="Homepage-TitleWrapper">
          <IonText className="Homepage-FeatureText">GET IN TOUCH</IonText>
          <IonTitle className="Homepage-HighlightText">Contact</IonTitle>
        </section>

        <section className="Homepage-ContactCardSection">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonCard className="Homepage-ContactCard">
                  <IonCardContent className="Homepage-CardContent">
                    <IonIcon icon={callOutline} size="large"></IonIcon>
                    <IonCardTitle>EMERGENCY</IonCardTitle>
                    <IonCardSubtitle>(237) 681-812-255</IonCardSubtitle>
                    <IonCardSubtitle>(237) 666-331-894</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard className="Homepage-ContactCard">
                  <IonCardContent className="Homepage-CardContent">
                    <IonIcon icon={locationOutline} size="large"></IonIcon>
                    <IonCardTitle>LOCATION</IonCardTitle>
                    <IonCardSubtitle>0123 Some place</IonCardSubtitle>
                    <IonCardSubtitle>9876 Some country</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard className="Homepage-ContactCard">
                  <IonCardContent className="Homepage-CardContent">
                    <IonIcon icon={mailOutline} size="large"></IonIcon>
                    <IonCardTitle>EMAIL</IonCardTitle>
                    <IonCardSubtitle>fildineeesoe@gmil.com</IonCardSubtitle>
                    <IonCardSubtitle>jen@gmail.com</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard className="Homepage-ContactCard">
                  <IonCardContent className="Homepage-CardContent">
                    <IonIcon icon={timeOutline} size="large"></IonIcon>
                    <IonCardTitle>WORKING HOURS</IonCardTitle>
                    <IonCardSubtitle>Mon-Sat 09:00-20:00</IonCardSubtitle>
                    <IonCardSubtitle>Sunday Emergency Only</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </section>
      </section>
    </main>
  );
};

export default Home;
