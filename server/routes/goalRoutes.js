const express = require("express");
const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  addSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  addTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/goalController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createGoal);
router.get("/", protect, getGoals);
router.patch("/:goalId", protect, updateGoal);
router.delete("/:goalId", protect, deleteGoal);

router.post("/:goalId/subjects", protect, addSubject);
router.get("/:goalId/subjects", protect, getSubjects);

router.patch("/:goalId/subjects/:subjectId", protect, updateSubject);

router.delete("/:goalId/subjects/:subjectId", protect, deleteSubject);

router.post("/:goalId/subjects/:subjectId/topics", protect, addTopic);

router.patch(
  "/:goalId/subjects/:subjectId/topics/:topicId",
  protect,
  updateTopic,
);

router.delete(
  "/:goalId/subjects/:subjectId/topics/:topicId",
  protect,
  deleteTopic
);
module.exports = router;
