import express from "express";
import cors from "cors";
import "dotenv/config";

import { router } from "./routes";

const app = express();

app.use(cors({
  origin: process.env.ENABLED_CORS?.split(";") || [],
}));

// CORS future implementation

// app.use(cors({
//   origin: process.env.NODE_ENV === "production" 
//     ? "https://myappfrontend.com" 
//     : "http://localhost:3000",
// }));


app.use(express.json());

app.use(router);

export { app };
