const mongoose = require("mongoose");

const studyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudyGoal",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    tasks: [
      {
        title: {
          type: String,
          required: true,
        },

        subject: {
          type: String,
          required: true,
        },

        topic: {
          type: String,
        },

        duration: {
          type: Number,
          required: true,
          min: 1,
        },

        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],

    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

// One user can have only ONE plan for a particular date
studyPlanSchema.index(
  { userId: 1, date: 1 },
  { unique: true }
);

module.exports = mongoose.model("StudyPlan", studyPlanSchema);