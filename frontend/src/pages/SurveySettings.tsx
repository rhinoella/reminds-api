import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";

interface SurveyQuestion {
  id?: string;
  question: string;
  options: string[];
}

interface Survey {
  title: string;
  questions: SurveyQuestion[];
  videoLink: string;
}

const SurveySettings: React.FC = () => {
  const [survey, setSurvey] = useState<Survey>({
    title: "",
    questions: [],
    videoLink: "",
  });
  const { token } = useAuth();
  const { trialId } = useParams();

  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    try {
      const data = await api.get<Survey>(`/survey/${trialId}`, {
        token: token || undefined,
      });
      setSurvey(data);
    } catch (error) {
      console.error("Failed to fetch survey:", error);
    }
  };

  const handleAddQuestion = () => {
    setSurvey({
      ...survey,
      questions: [...survey.questions, { question: "", options: [""] }],
    });
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], question: value };
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const handleAddOption = (questionIndex: number) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[questionIndex].options.push("");
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = survey.questions.filter((_, i) => i !== index);
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[questionIndex].options = updatedQuestions[
      questionIndex
    ].options.filter((_, i) => i !== optionIndex);
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const handleSaveSurvey = async () => {
    try {
      await api.put(`/survey/${trialId}`, {
        data: survey,
        token: token || undefined,
      });
    } catch (error) {
      console.error("Failed to save survey:", error);
    }
  };

  return (
    <div className="flex flex-col h-full w-full flex-1 mx-auto gap-4 max-w-4xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Survey Builder</h2>
        <Button onClick={handleSaveSurvey}>Save Survey</Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Survey Title</Label>
          <Input
            value={survey.title}
            onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
            placeholder="Enter survey title"
          />
        </div>

        <div className="space-y-2">
          <Label>Video Link</Label>
          <Input
            value={survey.videoLink}
            onChange={(e) =>
              setSurvey({ ...survey, videoLink: e.target.value })
            }
            placeholder="Enter video link"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Questions</Label>
            <Button variant="outline" size="sm" onClick={handleAddQuestion}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>

          {survey.questions.map((question, questionIndex) => (
            <Card key={questionIndex}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <Input
                      value={question.question}
                      onChange={(e) =>
                        handleQuestionChange(questionIndex, e.target.value)
                      }
                      placeholder="Enter question"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveQuestion(questionIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <div className="flex-1">
                        <Input
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              questionIndex,
                              optionIndex,
                              e.target.value
                            )
                          }
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                      </div>
                      {question.options.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleRemoveOption(questionIndex, optionIndex)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddOption(questionIndex)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveySettings;
