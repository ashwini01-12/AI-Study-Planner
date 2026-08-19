const StudyPlan = require("../models/StudyPlan");

const getProgress = async (req, res) => {
  try {
    const plans = await StudyPlan.find({
      userId: req.userId,
    });

    let totalTasks = 0;
    let completedTasks = 0;
    let totalStudyMinutes = 0;
    let completedStudyMinutes = 0;

    plans.forEach((plan) => {
      plan.tasks.forEach((task) => {
        totalTasks++;

        totalStudyMinutes += task.duration;

        if (task.completed) {
          completedTasks++;
          completedStudyMinutes += task.duration;
        }
      });
    });

    const completionRate =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    res.status(200).json({
      success: true,
      progress: {
        totalTasks,
        completedTasks,
        pendingTasks: totalTasks - completedTasks,
        completionRate,
        totalStudyMinutes,
        completedStudyMinutes,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getWeeklyProgress = async (req, res) => {
  try {
    const today = new Date();

    // Find Monday of the current week
    const startOfWeek = new Date(today);
    const day = startOfWeek.getDay();

    const diff = day === 0 ? 6 : day - 1;

    startOfWeek.setDate(startOfWeek.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);

    // Find Sunday of the current week
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Get user's plans for this week
    const plans = await StudyPlan.find({
      userId: req.userId,
      date: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      },
    });

    const weeklyProgress = [];

    // Process Monday → Sunday
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);

      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + 1);

      // Since one user has only one plan per day,
      // find that day's single plan
      const plan = plans.find(
        (plan) =>
          plan.date >= currentDate &&
          plan.date < nextDate
      );

      // If no plan exists for that day, use empty array
      const tasks = plan ? plan.tasks : [];

      let totalTasks = 0;
      let completedTasks = 0;
      let studyMinutes = 0;

      // Loop through tasks of that day's plan
      tasks.forEach((task) => {
        totalTasks++;

        if (task.completed) {
          completedTasks++;
          studyMinutes += task.duration;
        }
      });

      weeklyProgress.push({
        date: currentDate.toISOString().split("T")[0],

        day: currentDate.toLocaleDateString("en-US", {
          weekday: "short",
        }),

        totalTasks,
        completedTasks,
        studyMinutes,
      });
    }

    res.status(200).json({
      success: true,
      weeklyProgress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getStreak = async (req, res) => {
  try {
    const plans = await StudyPlan.find({
      userId: req.userId,
    }).sort({ date: -1 });

    let streak = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentDate = new Date(today);

    for (const plan of plans) {
      const planDate = new Date(plan.date);
      planDate.setHours(0, 0, 0, 0);

      // If this plan is not for the date we are expecting,
      // the consecutive streak is broken.
      if (planDate.getTime() !== currentDate.getTime()) {
        break;
      }

      // Check whether at least one task was completed
      const hasCompletedTask = plan.tasks.some(
        (task) => task.completed
      );

      // No completed task means streak is broken
      if (!hasCompletedTask) {
        break;
      }

      // This day is successfully completed
      streak++;

      // Move to the previous day
      currentDate.setDate(
        currentDate.getDate() - 1
      );
    }

    res.status(200).json({
      success: true,
      streak,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProgress,
  getWeeklyProgress,
  getStreak,
};