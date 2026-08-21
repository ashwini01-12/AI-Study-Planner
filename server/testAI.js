require("dotenv").config();

const { generateStudyPlan } = require("./services/aiService");

const test = async () => {
  const goal = {
    title: "Placement Preparation",
    deadline: "2026-10-30",
    dailyStudyHours: 4,
    level: "intermediate",

    subjects: [
      {
        name: "DSA",
        topics: [
          { name: "Arrays", completed: false },
          { name: "Linked List", completed: false },
          { name: "Graphs", completed: false },
        ],
      },
      {
        name: "DBMS",
        topics: [
          { name: "SQL", completed: false },
          { name: "Normalization", completed: false },
        ],
      },
    ],

    weakAreas: [
      "Dynamic Programming",
      "Graphs",
    ],
  };

  try {
    const result = await generateStudyPlan(goal);

    console.log("AI RESPONSE:");
    console.log(result);
  } catch (error) {
    console.error("AI ERROR:");
    console.error(error.message);
  }
};

test();