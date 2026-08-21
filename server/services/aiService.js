const ai = require("../config/gemini");

const generateStudyPlan = async (goal) => {
  const prompt = `
You are an AI study planner.

Create a personalized study plan for this student.

Goal:
${goal.title}

Deadline:
${goal.deadline}

Daily study hours:
${goal.dailyStudyHours}

Level:
${goal.level}

Subjects and topics:
${JSON.stringify(goal.subjects)}

Weak areas:
${JSON.stringify(goal.weakAreas)}

Rules:
- Return ONLY a JSON object containing a "schedule" array.
- Generate exactly 7 days of study plans.
- The schedule array must contain exactly 7 items.
- The day values must be exactly 1, 2, 3, 4, 5, 6, 7.
- Each schedule item must contain "day" and "tasks".
- Each task must contain exactly:
  title, subject, topic, duration.
- duration must be an integer representing minutes.
- The total duration of tasks for each day must equal dailyStudyHours * 60.
- Use ONLY exact subject names and exact topic names provided in the syllabus.
- Never combine multiple topics into one topic string.
- Never invent a new topic.
- Give more study time to weak areas.
- Do not include strategy, phases, explanations, or other fields.
- Return ONLY valid JSON.
- Do not include markdown.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text.trim();

  const cleanText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let plan;

  try {
    plan = JSON.parse(cleanText);
    console.log(JSON.stringify(cleanText, null, 2));
  } catch (error) {
    throw new Error("AI returned invalid JSON");
  }

  // Validate schedule
  if (!plan.schedule || !Array.isArray(plan.schedule)) {
    throw new Error("AI response does not contain a valid schedule");
  }

  // Validate every day
  for (const dayPlan of plan.schedule) {
    if (
      typeof dayPlan.day !== "number" ||
      !Array.isArray(dayPlan.tasks)
    ) {
      throw new Error("Invalid day format in AI response");
    }

    // Validate every task
    for (const task of dayPlan.tasks) {
      if (
        !task.title ||
        !task.subject ||
        !task.topic ||
        typeof task.duration !== "number"
      ) {
        throw new Error("Invalid task format in AI response");
      }
    }
  }

  return plan;
};


const adaptStudyPlan = async (goal, weakTopic, futurePlans) => {
  const prompt = `
You are an AI adaptive study planner.

The student performed poorly in this topic:

Weak topic:
${weakTopic}

Student score:
The topic has been identified as weak by the backend.

Goal:
${goal.title}

Daily study hours:
${goal.dailyStudyHours}

Level:
${goal.level}

Syllabus:
${JSON.stringify(goal.subjects)}

Current weak areas:
${JSON.stringify(goal.weakAreas)}

Future study plans:
${JSON.stringify(futurePlans)}

Rules:
- Adapt ONLY the future study plans provided.
- Give more study time to the weak topic.
- Reduce time from other topics if necessary.
- Keep the total duration for EACH day exactly equal to dailyStudyHours * 60.
- Use ONLY exact subject names from the syllabus.
- Use ONLY exact topic names from the syllabus.
- Do not invent subjects or topics.
- Keep the existing study plan dates unchanged.
- Create practical task titles.
- Duration must be an integer representing minutes.
- Return ONLY valid JSON.
- Do not include markdown.

Return exactly this structure:

{
  "plans": [
    {
      "date": "YYYY-MM-DD",
      "tasks": [
        {
          "title": "string",
          "subject": "string",
          "topic": "string",
          "duration": 120
        }
      ]
    }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text.trim();

  const cleanText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    console.log("Calling Gemini for adaptive plan...");
    console.log("AI adaptive result:", JSON.parse(cleanText));
    return JSON.parse(cleanText);
  } catch (error) {
    throw new Error("AI returned invalid adaptive plan JSON");
  }
};

module.exports = {
  generateStudyPlan,
  adaptStudyPlan,
};