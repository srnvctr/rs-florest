import React, { useMemo, useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
  MRT_Cell,
} from "material-react-table";
import { useAuth } from "../../firebase/auth/AuthUserProvider";
import { AppointmentData } from "../../firebase/auth/useFirebaseAuth";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "@firebase/firestore";

const MyAppointmentTable: React.FC = () => {
  const auth = useAuth();
  const [appointmentDataList, setAppointmentDataList] = useState<
    AppointmentData[]
  >([]);

  const columns = useMemo<MRT_ColumnDef<AppointmentData>[]>(
    () => [
      {
        accessorKey: "doctor",
        header: "Doctor Name",
      },
      {
        accessorKey: "specialty",
        header: "Specialty",
      },
      {
        accessorKey: "date",
        header: "Appointment Date",
      },
      {
        accessorKey: "time",
        header: "Appointment Time",
      },
      {
        accessorKey: "status",
        header: "Appointment Status",
      },
      
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: appointmentDataList,
    columnFilterDisplayMode: "popover",
  });

  const getAppointmentDataFromFirebase = async (appointmentId: string) => {
    try {
      const appointmentsCollection = collection(db, "appointments");
      const q = query(
        appointmentsCollection,
        where("userId", "==", auth.user.id),
        where("id", "==", appointmentId)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const appointmentData = querySnapshot.docs[0].data() as AppointmentData;
        // console.log("Appointment Data:", appointmentData);
        return appointmentData;
      }

      return null;
    } catch (error) {
      console.error("Error fetching appointment data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAppointmentData = async () => {
      const appointmentDataPromises = auth.user.myAppointment.map(
        (appointmentId) => getAppointmentDataFromFirebase(appointmentId)
      );
      const fetchedAppointmentDataList = await Promise.all(
        appointmentDataPromises
      );
      // console.log("Fetched Appointment Data List:", fetchedAppointmentDataList);
      setAppointmentDataList(
        fetchedAppointmentDataList.filter(
          (data) => data !== null
        ) as AppointmentData[]
      );
    };

    fetchAppointmentData();
  }, [auth.user.myAppointment]);

  return <MaterialReactTable table={table} />;
};

export default MyAppointmentTable;
