import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import path from "path";
import routes from "./controllers";

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);


if (process.env.NODE_ENV === "producton") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  })
}


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})