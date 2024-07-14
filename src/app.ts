import { config } from "dotenv";

config();

import express from "express";
import cors from "cors";

import booking from "@/routes/booking";

import { handleErrors } from "@/middleware/error";
import { getConnection } from "@/db";

const app = express();

// setup middlewares
app.use(handleErrors);
app.use(cors());

// setup routes
app.get("/health-check", (_, res) => res.send("OK"));
app.use(booking);

const port = process.env.PORT;
const server = app.listen(port, async () => {
  console.log(`Listening at on port ${port}`);

  // initialize connection variable to reduce time it would
  // take thje first query to finish. Tradeoff being that
  // will have this in memory object earlier than possibly needed
  // tho in a real world scenario not likely an issue because
  // we'd have calls to the api almost immediately
  await getConnection();
});

server.on("error", console.error);
