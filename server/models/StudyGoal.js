const mongoose = require("mongoose");

const studyGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    dailyStudyHours: {
      type: Number,
      required: true,
      min: 1,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    subjects: [
      {
        name: {
          type: String,
          required: true,
        },

        topics: [
          {
            type: String,
          },
        ],
      },
    ],

    weakAreas: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);



module.exports = mongoose.model("StudyGoal",studyGoalSchema);