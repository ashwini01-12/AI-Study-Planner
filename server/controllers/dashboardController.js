const User = require("../models/User");
const StudyGoal = require("../models/StudyGoal");
const StudyPlan = require("../models/StudyPlan");

const getDashboard = async (req, res) => {
  try {
    const userId = req.userId;

    // 1. Get user
    const user = await User.findById(userId).select("name email profilePicture");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Get latest study goal
    const goal = await StudyGoal.findOne({
      userId,
    }).sort({ createdAt: -1 });

    // 3. Find today's plan
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const plan = await StudyPlan.findOne({
      userId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // 4. Calculate today's task progress
    const tasks = plan ? plan.tasks : [];

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.completed
    ).length;

    const todayProgress =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    // 5. Calculate today's planned study time
    const totalStudyMinutes = tasks.reduce(
      (total, task) => total + task.duration,
      0
    );

    const completedStudyMinutes = tasks
      .filter((task) => task.completed)
      .reduce((total, task) => total + task.duration, 0);

    res.status(200).json({
      success: true,

      user,

      goal: goal
        ? {
            id: goal._id,
            title: goal.title,
            deadline: goal.deadline,
            dailyStudyHours: goal.dailyStudyHours,
            level: goal.level,
            weakAreas: goal.weakAreas,
          }
        : null,

      today: {
        totalTasks,
        completedTasks,
        pendingTasks: totalTasks - completedTasks,
        progress: todayProgress,
        totalStudyMinutes,
        completedStudyMinutes,
        tasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};