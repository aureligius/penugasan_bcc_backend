const express = require("express");
const { create, getAll, remove, update } = require("../controllers/task.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);
router.delete("/:id", authenticate, remove);
router.put("/:id", authenticate, update);

module.exports = router;