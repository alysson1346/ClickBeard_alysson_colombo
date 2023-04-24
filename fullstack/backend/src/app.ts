import express from "express";
import cors from "cors";

import routesUsers from "./routes/user.routes";
import routesBarber from "./routes/barber.routes";
import routesSpecialty from "./routes/specialty.routes";
import routesSchedule from "./routes/schedule.routes";
import routesAvaliableTime from "./routes/avaliableTime.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", routesUsers);
app.use("/barber", routesBarber);
app.use("/specialty", routesSpecialty);
app.use("/schedule", routesSchedule);
app.use("/avaliable-times", routesAvaliableTime);

export default app;
