import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layoutpage from "../../Layoutpage";
import _404 from "../../../pages/_404";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { db } from "../../../firebase/config";

import "./ServiceDetailsViews.css";

const ServiceDetailsViews: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [service, setService] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const servicesCollection = collection(db, "services");
        const q = query(servicesCollection, where("title", "==", title));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const serviceData = querySnapshot.docs[0].data();
          const contentArray = serviceData.content || [];
          if (contentArray.length > 0) {
            setService({
              ...serviceData,
              firstParagraph: contentArray[0],
              secondParagraph: contentArray.length > 1 ? contentArray[1] : "",
            });
          } else {
            setService(serviceData);
          }
        } else {
          setService(null);
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return !service ? (
    <Layoutpage>
      <_404 />
    </Layoutpage>
  ) : (
    <Layoutpage>
      <section className="ServiceDetails-Container">
        <section>
          <img src={service.image} width={450} alt="Service Image" />
        </section>

        <section className="ServiceDetails-Content">
          <h1>{service.title}</h1>
          <p>{service.firstParagraph}</p>
          <p>{service.secondParagraph}</p>
        </section>
      </section>
    </Layoutpage>
  );
};

export default ServiceDetailsViews;
