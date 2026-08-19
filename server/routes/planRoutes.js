const express = require("express");
const {
  createPlan,
  getTodayPlan,
  completeTask,
} = require("../controllers/planController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createPlan);
router.get("/today", protect, getTodayPlan);
router.patch("/tasks/:taskId/complete", protect, completeTask);
module.exports = router;
