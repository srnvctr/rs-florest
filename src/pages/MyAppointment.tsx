import React from "react";

import Layoutpage from "../components/Layoutpage";
import MyAppointmentTable from "../components/MyAppointmentTable";
import { Height } from "@mui/icons-material";

const MyAppointment: React.FC = () => {
  return (
    <Layoutpage>
        <div style={{ padding: "0 50px 100px" }}>
          <MyAppointmentTable />
        </div>
    </Layoutpage>
  );
};

export default MyAppointment;
