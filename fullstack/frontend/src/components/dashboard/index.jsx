import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { Header } from "../../components/header";
import { SeeAppointments } from "../seeAppointments";
import { Schedule } from "../schedule";
import { HorizontalNonLinearStepper } from "../stepper";

export default function Dashboard() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Header />
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              sx={{ color: "black" }}
              label="Agendarr um serviço"
              value="1"
            />
            <Tab label="Ver/Cancelar horários" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Schedule />
        </TabPanel>
        <TabPanel value="2">
          <SeeAppointments />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
