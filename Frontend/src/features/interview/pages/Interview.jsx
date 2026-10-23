import React, { useMemo, useState } from "react";
import "../style/interview.scss";

const fallbackData = {
  matchingScore: 88,
  technicalQuestions: [
    {
      question:
        "Explain the difference between SQL and NoSQL databases, and when would you choose one over the other?",
      intention:
        "Evaluate understanding of database management and architectural decision-making.",
      answer:
        "Focus on schema rigidity, scalability, and ACID vs BASE properties. Mention that SQL is better for complex transactions and relationships, while NoSQL offers flexibility and horizontal scaling.",
    },
    {
      question: "How do you handle state management in a React application?",
      intention: "Check proficiency in modern frontend frameworks.",
      answer:
        "Discuss local state (useState), lifting state up, Context API for global state, and potentially third-party libraries like Redux or Zustand. Mention why you choose a specific approach.",
    },
    {
      question:
        "What is the event loop in Node.js, and how does it handle asynchronous operations?",
      intention:
        "Assess depth of knowledge in backend runtime environments.",
      answer:
        "Explain the single-threaded nature of Node.js, the call stack, and how the event loop offloads I/O tasks to the system kernel or thread pool to remain non-blocking.",
    },
  ],
  behavioralQuestions: [
    {
      question:
        "Describe a time when you had to optimize a piece of code that was causing production delays. How did you identify the bottleneck?",
      intention: "Test problem-solving and performance thinking.",
      answer:
        "Use a clear example. Mention profiling, logs, measuring before and after, identifying slow functions, and then explain the fix with results.",
    },
    {
      question:
        "How do you approach learning a new technology, such as your recent work with the Gemini API?",
      intention: "Evaluate learning mindset and adaptability.",
      answer:
        "Talk about reading official docs, testing small examples, building a mini project, and gradually applying the technology in a real use case.",
    },
  ],
  skillGaps: [
    { skill: "Message Queues (Kafka/RabbitMQ)", severity: "high" },
    { skill: "Advanced Docker & CI/CD Pipelines", severity: "medium" },
    { skill: "Distributed Systems Design", severity: "medium" },
    { skill: "Production-level Redis management", severity: "low" },
  ],
  preparationPlan: [
    {
      day: 1,
      focus: "Cloud Basics",
      task: "Study AWS basics and deploy a small Node.js app.",
    },
    {
      day: 2,
      focus: "Containerization",
      task: "Learn Docker basics and write a Dockerfile.",
    },
    {
      day: 3,
      focus: "Testing",
      task: "Add unit tests for backend APIs using Jest.",
    },
    {
      day: 4,
      focus: "Refinement",
      task: "Convert a small React section from JavaScript to TypeScript.",
    },
    {
      day: 5,
      focus: "System Design",
      task: "Revise system design basics and solve one LeetCode problem.",
    },
  ],
};

function getSeverityClass(severity) {
  if (severity === "high") return "gap-high";
  if (severity === "medium") return "gap-medium";
  return "gap-low";
}

function Interview({ data = fallbackData }) {
  const interviewData = data || fallbackData;

  const technicalQuestions = interviewData.technicalQuestions || [];
  const behavioralQuestions = interviewData.behavioralQuestions || [];
  const skillGaps = interviewData.skillGaps || [];
  const preparationPlan = interviewData.preparationPlan || [];
  const matchingScore = interviewData.matchingScore || 0;

  const [activeTab, setActiveTab] = useState("behavioral");
  const [openIndexes, setOpenIndexes] = useState(() => new Set([0]));

  const activeQuestions = useMemo(() => {
    if (activeTab === "technical") return technicalQuestions;
    if (activeTab === "behavioral") return behavioralQuestions;
    return [];
  }, [activeTab, technicalQuestions, behavioralQuestions]);

  const toggleQuestion = (index) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <main className="interview-page">
      <section className="interview-shell">
        <aside className="left-sidebar">
          <div className="sidebar-section-title">SECTIONS</div>

          <button
            type="button"
            className={`sidebar-item ${activeTab === "technical" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("technical");
              setOpenIndexes(new Set([0]));
            }}
          >
            <span className="sidebar-icon">&lt;&gt;</span>
            <span>Technical Questions</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${activeTab === "behavioral" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("behavioral");
              setOpenIndexes(new Set([0]));
            }}
          >
            <span className="sidebar-icon">◻</span>
            <span>Behavioral Questions</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${activeTab === "roadmap" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("roadmap");
              setOpenIndexes(new Set([0]));
            }}
          >
            <span className="sidebar-icon">➜</span>
            <span>Road Map</span>
          </button>
        </aside>

        <section className="center-panel">
          <div className="center-header">
            <h1>
              {activeTab === "technical"
                ? "Technical Questions"
                : activeTab === "behavioral"
                ? "Behavioral Questions"
                : "Road Map"}
            </h1>
            <span className="question-count">
              {activeTab === "roadmap"
                ? `${preparationPlan.length} days`
                : `${activeQuestions.length} questions`}
            </span>
          </div>

          <div className="header-divider" />

          {activeTab !== "roadmap" && (
            <div className="accordion-list">
              {activeQuestions.map((item, index) => {
                const isOpen = openIndexes.has(index);

                return (
                  <article
                    className={`question-card ${isOpen ? "open" : ""}`}
                    key={`${item.question}-${index}`}
                  >
                    <button
                      type="button"
                      className="question-trigger"
                      onClick={() => toggleQuestion(index)}
                    >
                      <span className="question-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="question-content">
                        <h3>{item.question}</h3>
                        <p>{item.intention}</p>
                      </div>

                      <span className="question-arrow">{isOpen ? "▴" : "▾"}</span>
                    </button>

                    <div className={`question-answer ${isOpen ? "show" : ""}`}>
                      <div className="answer-label">Suggested answer style</div>
                      <p>{item.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {activeTab === "roadmap" && (
            <div className="roadmap-list">
              {preparationPlan.map((item) => (
                <article className="roadmap-card" key={item.day}>
                  <div className="roadmap-top">
                    <span className="roadmap-day">Day {item.day}</span>
                    <h3>{item.focus}</h3>
                  </div>
                  <p>{item.task}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="right-sidebar">
          <div className="match-section">
            <div className="sidebar-section-title">MATCH SCORE</div>

            <div className="score-ring" style={{ "--score": `${matchingScore}%` }}>
              <div className="score-inner">
                <strong>{matchingScore}</strong>
                <span>%</span>
              </div>
            </div>

            <p className="score-caption">Strong match for this role</p>
          </div>

          <div className="gap-section">
            <div className="sidebar-section-title">SKILL GAPS</div>

            <div className="gap-list">
              {skillGaps.map((gap, index) => (
                <div
                  className={`gap-item ${getSeverityClass(gap.severity)}`}
                  key={`${gap.skill}-${index}`}
                >
                  {gap.skill}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Interview;