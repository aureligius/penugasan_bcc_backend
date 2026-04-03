const { createTask, getTasks, deleteTask, updateTask } = require("../services/task.service");
const { createTaskSchema, updateTaskSchema } = require("../validations/task.validation");
import type { Request, Response, NextFunction } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const result = createTaskSchema.safeParse(req.body);

  if (!result.success) {
    const err = new Error("Invalid input");
    (err as any).status = 400;
    return next(err);
  }

  const { title } = result.data;
  const email = (req as any).user.email;

  const task = await createTask(title, email);

  const io = req.app.get("io");
  io.emit("taskCreated", task);

  return res.status(201).json(task);
};

const getAll = async (req: Request, res: Response) => {
  const email = (req as any).user.email;

  const tasks = await getTasks(email);

  return res.json(tasks);
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const email = (req as any).user.email;

  const deleted = await deleteTask(id, email);

  if (!deleted) {
    const err = new Error("Task not found");
    (err as any).status = 404;
    return next(err);
  }

  const io = req.app.get("io");
  io.emit("taskDeleted", deleted);

  return res.json({ message: "Task deleted", deleted });
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const result = updateTaskSchema.safeParse(req.body);

  if (!result.success) {
    const err = new Error("Invalid input");
    (err as any).status = 400;
    return next(err);
  }

  const { status } = result.data;
  const id = Number(req.params.id);
  const email = (req as any).user.email;

  const updated = await updateTask(id, email, status);

  if (!updated) {
    const err = new Error("Task not found");
    (err as any).status = 404;
    return next(err);
  }

  const io = req.app.get("io");
  io.emit("taskUpdated", updated);

  return res.json({ message: "Task updated", updated });
};

module.exports = { create, getAll, remove, update };