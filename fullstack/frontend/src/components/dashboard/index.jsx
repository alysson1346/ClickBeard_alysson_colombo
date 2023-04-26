import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { Header } from "../../components/header";
import { SeeAppointments } from "../seeAppointments";
import { Schedule } from "../schedule";
import { Manage } from "../manage";
import { TodayAppontments } from "../todayAppontments";
import { ConsultAppointments } from "../consultAppontments";

export default function Dashboard() {
  const [value, setValue] = React.useState("1");

  const token = JSON.parse(localStorage.getItem("@UserAuthorization:token"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Header />
      {token.user.is_admin === true ? (
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
              <Tab label="Hoje" value="1" />
              <Tab label="Consultar agendamentos" value="2" />
              <Tab label="Informações Geral" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <TodayAppontments />
          </TabPanel>

          <TabPanel value="2">
            <ConsultAppointments />
          </TabPanel>

          <TabPanel value="3">
            <Manage />
          </TabPanel>
        </TabContext>
      ) : (
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
                label="Agendar um serviço"
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
      )}
    </Box>
  );
}
