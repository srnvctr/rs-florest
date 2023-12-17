import React, { useEffect } from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import ServiceCard from "../../ServiceCard";
import Layoutpage from "../../Layoutpage";
import { useState } from "react";
import { getService } from "../../../firebase/service/service";

import "./ServiceViews.css";

const ServiceViews: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceData = await getService();
        setServices(serviceData);
        console.log(serviceData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const createRows = () => {
    const rows = [];
    for (let i = 0; i < services.length; i += 3) {
      const row = (
        <IonRow key={i / 3} className="ServiceViews-Row">
          {services.slice(i, i + 3).map((service, index) => (
            <IonCol key={index} size="auto">
              <ServiceCard
                title={service.title}
                desc={service.content.length > 0 ? service.content[0] : ""}
                image={service.image}
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
      <IonGrid className="ServiceViews-Container">{createRows()}</IonGrid>
    </Layoutpage>
  );
};

export default ServiceViews;
