import React, { useEffect, useState } from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import DoctorCard from "../../DoctorCard";
import Layoutpage from "../../Layoutpage";
import { getDoctor } from "../../../firebase/doctor/doctor";
import { Doctor } from "../../../firebase/doctor/doctor";
import "./DoctorViews.css";

const DoctorsViews: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsData = await getDoctor();
      setDoctors(doctorsData);
    };

    fetchDoctors();
  }, []);

  const createRows = () => {
    const rows = [];
    for (let i = 0; i < doctors.length; i += 3) {
      const row = (
        <IonRow key={i / 3} className="DoctorViews-Row">
          {doctors.slice(i, i + 3).map((doctor) => (
            <IonCol key={doctor.id} size="auto">
              <DoctorCard
                id={doctor.id}
                name={doctor.name}
                specialty={doctor.specialty}
                image={doctor.image}
              />
            </IonCol>
          ))}
        </IonRow>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <Layoutpage>
      <IonGrid className="DoctorViews-Container">{createRows()}</IonGrid>
    </Layoutpage>
  );
};

export default DoctorsViews;
