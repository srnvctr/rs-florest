import React, { useMemo, useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";
import { useAuth } from "../../firebase/auth/AuthUserProvider";
import { useAppointments, AppointmentData } from "../../firebase/appointment/appointment";

const MyAppointmentTable: React.FC = () => {
  const auth = useAuth();
  const { fetchAppointmentData } = useAppointments();

  const [appointmentDataList, setAppointmentDataList] = useState<AppointmentData[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.user.id !== null) {
          const fetchedAppointmentDataList = await fetchAppointmentData(auth.user.id);
          console.log("Fetched Appointment Data List:", fetchedAppointmentDataList);
          setAppointmentDataList(
            fetchedAppointmentDataList.filter(
              (data) => data !== null
            ) as AppointmentData[]
          );
        }
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };
  
    fetchData();
  }, [auth.user.id, fetchAppointmentData]);

  return <MaterialReactTable table={table} />;
};

export default MyAppointmentTable;
