import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import path from "path";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
const SequelizeStore = connectSessionSequelize(session.Store);

import routes from "./controllers";
import sequelize from "../config/connection";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const sessionSecret = process.env.SESSION_SECRET;
const cookieAge = process.env.COOKIE_AGE ? parseInt(process.env.COOKIE_AGE) : undefined;

if (!sessionSecret) throw new Error("Missing or invalid SESSION_SECRET");
if (!cookieAge) throw new Error("Missing or invalid COOKIE_AGE");

const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: cookieAge,
    secure: false,
    sameSite: "strict"
  },
  store: new SequelizeStore({
    db: sequelize
  })
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);


if (process.env.NODE_ENV === "producton") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
});