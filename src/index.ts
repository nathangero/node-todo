import express from "express";
import { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

let index = 1; // Like SQL primary keys
const DB: { [key: number]: { [key: string]: any } } = {};
const KEY_TODO_TITLE = "title";
const KEY_TODO_COMPLETION = "completed";

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  // console.log("server ping");
  res.send("Welcome to the server!");
});

// Send over all the todos
app.get("/allTodos", (req: Request, res: Response) => {
  // console.log("get all todos");

  res.send(JSON.stringify(DB));
});

app.put("/todo", (req: Request, res: Response) => {
  // console.log("put todo");

  const todo = req.body.todo;
  DB[index] = {
    [KEY_TODO_TITLE]: todo,
    [KEY_TODO_COMPLETION]: false,
  };

  index++;
  console.log(DB);

  res.status(200).json(DB);
});

app.patch("/todo", (req: Request, res: Response) => {
  // console.log("update todo");

  const timestamp = req.body.timestamp;
  const todoName = req.body.todoName;
  const completed = req.body.completed;

  if (todoName) DB[timestamp][KEY_TODO_TITLE] = todoName; // Edit the todo name if it exists
  DB[timestamp][KEY_TODO_COMPLETION] = completed;

  res.status(200).json(DB[timestamp]);
});

app.delete("/:index", (req: Request, res: Response) => {
  // console.log("delete todo");

  const index = parseInt(req.params.index);
  // console.log("delete todo at timestamp:", timestamp);

  delete DB[index];
  res.status(200).json(DB);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})