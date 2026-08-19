const express = require("express");
const { getProgress ,getWeeklyProgress,getStreak } = require("../controllers/progressController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getProgress);
router.get("/weekly", protect, getProgress);
router.get("/streak", protect, getStreak);

module.exports = router;