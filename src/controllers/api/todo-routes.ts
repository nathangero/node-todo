import { Router } from "express";
const router = Router();
import { Request, Response } from "express";

const DB: { [key: number]: { [key: string]: any } } = {};
const KEY_TODO_TITLE = "title";
const KEY_TODO_COMPLETION = "completed";
let index = 1; // Like SQL primary keys

// Send over all the todos
router.get("/all", (req: Request, res: Response) => {
  // console.log("get all todos");

  res.send(JSON.stringify(DB));
});

router.put("/", (req: Request, res: Response) => {
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

router.patch("/", (req: Request, res: Response) => {
  // console.log("update todo");

  const dbIndex = req.body.index;
  const todoName = req.body.todoName;
  const completed = req.body.completed;

  if (todoName) DB[dbIndex][KEY_TODO_TITLE] = todoName; // Edit the todo name if it exists
  DB[dbIndex][KEY_TODO_COMPLETION] = completed;

  res.status(200).json(DB[dbIndex]);
});

router.delete("/:index", (req: Request, res: Response) => {
  // console.log("delete todo");

  const dbIndex = parseInt(req.params.index);
  // console.log("delete todo at index:", dbIndex);

  delete DB[dbIndex];
  res.status(200).json(DB);
});


export default router;