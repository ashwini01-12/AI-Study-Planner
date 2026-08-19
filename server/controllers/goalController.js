const StudyGoal = require("../models/StudyGoal");

const createGoal = async (req, res) => {
  try {
    const {
      title,
      deadline,
      dailyStudyHours,
      level,
      subjects,
      weakAreas,
    } = req.body;

    if (!title || !deadline || !dailyStudyHours) {
      return res.status(400).json({
        success: false,
        message: "Title, deadline and daily study hours are required",
      });
    }

    const goal = await StudyGoal.create({
      userId: req.userId,
      title,
      deadline,
      dailyStudyHours,
      level,
      subjects,
      weakAreas,
    });

    res.status(201).json({
      success: true,
      message: "Study goal created successfully",
      goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getGoals = async (req, res) => {
  try {
    const goals = await StudyGoal.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      goals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createGoal,
  getGoals,
};