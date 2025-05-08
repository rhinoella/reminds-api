import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { TrialDocument } from "@reminds/server";
import { useAuth } from "@/components/AuthProvider";

export default function TrialSelect() {
  const navigate = useNavigate();
  const [trials, setTrials] = useState<TrialDocument[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTrials = async () => {
      const trials = await api.get<TrialDocument[]>("/trials", {
        token: token || undefined,
      });
      setTrials(trials);
    };

    fetchTrials();
  }, []);

  return (
    <div className="flex flex-col h-full w-full flex-1 mx-auto gap-10">
      <h1 className="text-xl">Select a Trial</h1>
      <div className="flex gap-4 flex-col">
        {trials.map((trial: TrialDocument) => (
          <Link
            to={`/${trial._id}/devices`}
            className="w-full"
            key={trial._id as string}
          >
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{trial.name}</CardTitle>
                <CardDescription>{trial.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
