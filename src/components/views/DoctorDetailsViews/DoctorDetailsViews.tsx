import React, { useEffect, useState } from "react";
import { IonList, IonItem } from "@ionic/react";
import { useParams } from "react-router-dom";
import Layoutpage from "../../Layoutpage";
import _404 from "../../../pages/_404";
import { getDoctor } from "../../../firebase/doctor/doctor";
import { Doctor } from "../../../firebase/doctor/doctor";

import "./DoctorDetailsViews.css";

const DoctorDetailsViews: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctorData = await getDoctor();

        const foundDoctor = doctorData.find((doc) => doc.name === name);

        if (foundDoctor) {
          setDoctor(foundDoctor);
        } else {
          setDoctor(null);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return !doctor ? (
    <_404 />
  ) : (
    <Layoutpage>
      <main className="DoctorDetailsViews-Container">
        <section>
          <img src={doctor.image} alt={doctor.image} width={350} />
        </section>

        <section className="DoctorDetailsViews-Content">
          <IonList>
            <IonItem>
              <h1>{doctor.name}</h1>
            </IonItem>

            <IonItem>
              <p>Specialist: {doctor.specialty}</p>
            </IonItem>

            <IonItem>
              <p>Address: {doctor.address}</p>
            </IonItem>

            <IonItem>
              <p>Contact: {doctor.contact}</p>
            </IonItem>

            <IonItem>
              <p>{doctor.briefProfile}</p>
            </IonItem>
          </IonList>
        </section>
      </main>
    </Layoutpage>
  );
};

export default DoctorDetailsViews;
