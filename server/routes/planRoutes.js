const express = require("express");
const {
  createPlan,
  getTodayPlan,
  completeTask,
  generatePlan,
  getWeeklyPlans,
  adaptivePlan,
} = require("../controllers/planController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createPlan);
router.get("/today", protect, getTodayPlan);
router.patch("/tasks/:taskId/complete", protect, completeTask);
router.post("/adaptive", protect, adaptivePlan);

router.post("/generate", protect, generatePlan);
module.exports = router;
router.get("/weekly", protect, getWeeklyPlans);
