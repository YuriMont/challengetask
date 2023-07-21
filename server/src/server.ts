import express from "express";
import routers from "./routers";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(routers);



app.listen(3333, () => {
  console.log("HTTP server Running!");
});
