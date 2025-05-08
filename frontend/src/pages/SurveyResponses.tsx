import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface SurveyResponse {
  id: string;
  participantId: string;
  answers: {
    questionId: string;
    answer: string;
  }[];
  submittedAt: string;
}

const SurveyResponses: React.FC = () => {
  const [survey, setSurvey] = useState<Survey>({
    title: "",
    questions: [],
    videoLink: "",
  });
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchSurvey();
    fetchResponses();
  }, []);

  const fetchSurvey = async () => {
    try {
      const data = await api.get<Survey>(`/survey`, {
        token: token || undefined,
      });
      setSurvey(data);
    } catch (error) {
      console.error("Failed to fetch survey:", error);
    }
  };

  const fetchResponses = async () => {
    try {
      const data = await api.get<SurveyResponse[]>(`/survey-submissions`, {
        token: token || undefined,
      });
      setResponses(data);
    } catch (error) {
      console.error("Failed to fetch responses:", error);
    }
  };

  return (
    <div className="flex flex-col h-full w-full flex-1 mx-auto gap-4 max-w-4xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Survey Responses</h2>
          <Button variant="outline" onClick={fetchResponses}>
            Refresh
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Question</TableHead>
                    {responses.map((response) => (
                      <TableHead key={response.id} className="min-w-[150px]">
                        {response.id}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Submitted At</TableCell>
                    {responses.map((response) => (
                      <TableCell key={`date-${response.id}`}>
                        {new Date(response.submittedAt).toLocaleString()}
                      </TableCell>
                    ))}
                  </TableRow>
                  {survey.questions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="font-medium">
                        {question.question}
                      </TableCell>
                      {responses.map((response) => {
                        const answer = response.answers.find(
                          (a) => a.questionId === question.id
                        );
                        return (
                          <TableCell key={`${response.id}-${question.id}`}>
                            {answer?.answer || "-"}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                  {survey.questions.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={responses.length + 1}
                        className="text-center"
                      >
                        No questions available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SurveyResponses;
