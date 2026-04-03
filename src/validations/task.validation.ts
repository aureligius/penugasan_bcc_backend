const { z } = require("zod");

const createTaskSchema = z.object({
  title: z.string().min(1),
});

const updateTaskSchema = z.object({
  status: z.string().min(1),
});

module.exports = { createTaskSchema, updateTaskSchema };
