import React, { useState } from "react";

interface Question {
  question: string;
  options: string[];
}

const SurveySettings: React.FC = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [videoLink, setVideoLink] = useState("");

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: [] }]);
  };

  const handleSaveSurvey = async () => {
    // Implement survey saving logic
  };

  return (
    <div>
      <h2>Survey Settings</h2>
      <input
        type="text"
        placeholder="Survey Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddQuestion}>Add Question</button>
      {questions.map((q, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].question = e.target.value;
              setQuestions(newQuestions);
            }}
          />
          {/* Add logic for options */}
        </div>
      ))}
      <input
        type="text"
        placeholder="Video Link"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
      />
      <button onClick={handleSaveSurvey}>Save Survey</button>
    </div>
  );
};

export default SurveySettings;
