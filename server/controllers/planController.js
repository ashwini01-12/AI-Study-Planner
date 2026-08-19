const StudyPlan = require("../models/StudyPlan");
const StudyGoal = require("../models/StudyGoal");

const createPlan = async (req, res) => {
  try {
    const { goalId, date, tasks } = req.body;

    if (!goalId || !date || !tasks || tasks.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Goal ID, date and tasks are required",
      });
    }

    // Make sure the goal belongs to the logged-in user
    const goal = await StudyGoal.findOne({
      _id: goalId,
      userId: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Study goal not found",
      });
    }

    const plan = await StudyPlan.create({
      userId: req.userId,
      goalId,
      date,
      tasks,
    });

    res.status(201).json({
      success: true,
      message: "Study plan created successfully",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getTodayPlan = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const plan = await StudyPlan.findOne({
      userId: req.userId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).populate("goalId");

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "No study plan found for today",
      });
    }

    res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const plan = await StudyPlan.findOne({
      userId: req.userId,
      "tasks._id": taskId,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const task = plan.tasks.id(taskId);

    task.completed = true;

    await plan.save();

    res.status(200).json({
      success: true,
      message: "Task completed successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPlan,
  getTodayPlan,
  completeTask,
};
