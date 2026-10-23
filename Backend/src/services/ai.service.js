const { GoogleGenAI } = require('@google/genai');
const { z } = require('zod');
const {zodToJsonSchema} = require('zod-to-json-schema');


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEN_AI_API_KEY
})



const interviewReportSchema = z.object({
    matchingScore: z.number().min(0).max(100).describe("The score indicating how well the resume matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("Technical question can be asked in interview"),
        intention: z.string().describe("The intention  of interview behind asking this question"),
        answer: z.string().describe("How to answer this question,what points to cover,what approach to take,what mistakes to avoid")
    })).describe("List of technical questions that can be asked in interview"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("Behavioral question can be asked in interview"),
        intention: z.string().describe("The intention  of interview behind asking this question"),
        answer: z.string().describe("How to answer this question,what points to cover,what approach to take,what mistakes to avoid")
    })).describe("List of behavioral questions that can be asked in interview"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("Skill that is missing in resume"),
        severity: z.enum(["low", "medium", "high"]).describe("Severity of missing skill in resume"),
    })).describe("List of skill gaps identified in resume"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("Day number for preparation plan"),
        focus: z.string().describe("Focus area for that day"),
        task: z.string().describe("Task to be done on that day")

    })).describe("List of preparation steps for the interview")
})

async function generateInterviewReport({ resume, selfdescription, jobdescription }) {

    const prompt = `You are generating a structured interview report.

Return ONLY valid JSON.
Do not add markdown.
Do not add explanations.
Do not add code fences.
Do not add extra fields.
Do not omit any fields.

Use exactly this JSON structure:

{
  "matchingScore": ,
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "skillGaps": [
    {
      "skill": "",
      "severity": ""
    }
  ],
  "preparationPlan": [
    {
      "day": ,
      "focus": "",
      "task": ""
    }
  ]
}


Rules:
- matchingScore must be a number from 0 to 100.
- technicalQuestions must contain at least 5 items.
- behavioralQuestions must contain at least 3 items.
- skillGaps must contain only missing skills from the resume.
- severity can only be "low", "medium", or "high".
- preparationPlan must contain practical steps for improving the missing skills.
- Do not invent fields like summary, recommendation, strengths, weaknesses, project_analysis, or interview_summary.
- Do not wrap the JSON inside another object.
- Do not return any text outside the JSON.

Resume:
Resume: ${resume}
Self description: ${selfdescription}
Job description: ${jobdescription}

`;
   const response = await ai.models.generateContent({
  model: "gemini-3.1-flash-lite",
  contents: prompt,
  config: {
    responseMimeType: "application/json",
    responseSchema: z.toJSONSchema(interviewReportSchema),
  },
});
return JSON.parse(response.text);

}

module.exports = generateInterviewReport