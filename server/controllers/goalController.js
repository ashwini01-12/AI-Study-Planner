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


const updateGoal = async (req, res) => {
  try {
    const { goalId } = req.params;

    // Find only if this goal belongs to logged-in user
    const goal = await StudyGoal.findOne({
      _id: goalId,
      userId: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    const {
      title,
      deadline,
      dailyStudyHours,
      level,
      subjects,
      weakAreas,
    } = req.body;

    // Update only fields that were actually provided
    if (title !== undefined) {
      goal.title = title;
    }

    if (deadline !== undefined) {
      goal.deadline = deadline;
    }

    if (dailyStudyHours !== undefined) {
      goal.dailyStudyHours = dailyStudyHours;
    }

    if (level !== undefined) {
      goal.level = level;
    }

    if (subjects !== undefined) {
      goal.subjects = subjects;
    }

    if (weakAreas !== undefined) {
      goal.weakAreas = weakAreas;
    }

    await goal.save();

    res.status(200).json({
      success: true,
      message: "Study goal updated successfully",
      goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteGoal = async (req, res) => {
  try {
    const { goalId } = req.params;

    const goal = await StudyGoal.findOneAndDelete({
      _id: goalId,
      userId: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Study goal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const addSubject = async (req, res) => {
  try {
    const { goalId } = req.params;
    const { name } = req.body;

    const goal = await StudyGoal.findOne({
      _id: goalId,
      userId: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Subject name is required",
      });
    }

    goal.subjects.push({
      name,
      topics: [],
    });

    await goal.save();

    const subject = goal.subjects[goal.subjects.length - 1];

    res.status(201).json({
      success: true,
      message: "Subject added successfully",
      subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getSubjects = async (req, res) => {
  try {
    const { goalId } = req.params;

    const goal = await StudyGoal.findOne({
      _id: goalId,
      userId: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    res.status(200).json({
      success: true,
      subjects: goal.subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateSubject = async (req, res) => {
  try {
    const { goalId, subjectId } = req.params;
    const { name } = req.body;

    const goal = await StudyGoal.findOne({
      _id: goalId,
      userId: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    const subject = goal.subjects.id(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    if (name !== undefined) {
      subject.name = name;
    }

    await goal.save();

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteSubject = async (req, res) => {
  try {
    const { goalId, subjectId } = req.params;

    const goal = await StudyGoal.findOne({
      _id: goalId,
      userId: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    const subject = goal.subjects.id(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    subject.deleteOne();

    await goal.save();

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const addTopic = async (req, res) => {
  try {
    const { goalId, subjectId } = req.params;
    const { name } = req.body;

    // 1. Check goal belongs to logged-in user
    const goal = await StudyGoal.findOne({
      _id: goalId,
      userId: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    // 2. Find subject inside this goal
    const subject = goal.subjects.id(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    // 3. Validate topic name
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Topic name is required",
      });
    }

    // 4. Add topic
    subject.topics.push({
      name,
      completed: false,
    });

    // 5. Save goal
    await goal.save();

    // Get the newly added topic
    const topic = subject.topics[subject.topics.length - 1];

    res.status(201).json({
      success: true,
      message: "Topic added successfully",
      topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const updateTopic = async (req, res) => {
  try {
    const { goalId, subjectId, topicId } = req.params;

    const { name, completed } = req.body;

    // 1. Check goal belongs to logged-in user
    const goal = await StudyGoal.findOne({
      _id: goalId,
      userId: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    // 2. Find subject
    const subject = goal.subjects.id(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    // 3. Find topic
    const topic = subject.topics.id(topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    // 4. Update only provided fields
    if (name !== undefined) {
      topic.name = name;
    }

    if (completed !== undefined) {
      topic.completed = completed;
    }

    // 5. Save goal
    await goal.save();

    res.status(200).json({
      success: true,
      message: "Topic updated successfully",
      topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteTopic = async (req, res) => {
  try {
    const { goalId, subjectId, topicId } = req.params;

    const goal = await StudyGoal.findOne({
      _id: goalId,
      userId: req.userId,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    const subject = goal.subjects.id(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const topic = subject.topics.id(topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    topic.deleteOne();

    await goal.save();

    res.status(200).json({
      success: true,
      message: "Topic deleted successfully",
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
  updateGoal,
  deleteGoal,
  addSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  addTopic,
  updateTopic,
  deleteTopic,
};