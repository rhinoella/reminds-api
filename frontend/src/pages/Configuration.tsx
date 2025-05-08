import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { AppConfig, MqttQos } from "@reminds/server";
import { Check, CircleCheck, Save, Settings } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConfigSettings() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const { token } = useAuth();
  const [submissionState, setSubmissionState] = useState<"idle" | "success">(
    "idle"
  );

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await api.get<AppConfig>(`/config`, {
        token: token || undefined,
      });
      setConfig(config);
    };

    fetchConfig();
  }, []);

  const handleSave = async () => {
    if (!config) {
      return;
    }

    try {
      await api.put<AppConfig, AppConfig>(`/config`, {
        data: config,
        token: token || undefined,
      });
      setSubmissionState("success");

      setTimeout(() => {
        setSubmissionState("idle");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-full w-full flex-1 mx-auto pb-44">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings size={20} /> Configuration
            </div>
            <Button size="sm" variant="outline" onClick={handleSave}>
              {submissionState === "idle" ? (
                <Save size={16} />
              ) : (
                <Check color="blue" size={16} />
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Label>Project</Label>
            <Input type="text" placeholder="Project" value={config?.project} />
            <div className="flex gap-4">
              <Label>Subscribe QoS</Label>
              <Select
                value={config?.subscribeQos?.toString()}
                onValueChange={(value) => {
                  if (value) {
                    const parsedValue = parseInt(value) as MqttQos;
                    setConfig({
                      ...config!,
                      subscribeQos: parsedValue,
                    } as AppConfig);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a publish QoS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={MqttQos.AT_MOST_ONCE.toString()}>
                    At Most Once
                  </SelectItem>
                  <SelectItem value={MqttQos.AT_LEAST_ONCE.toString()}>
                    At Least Once
                  </SelectItem>
                  <SelectItem value={MqttQos.EXACTLY_ONCE.toString()}>
                    Exactly Once
                  </SelectItem>
                </SelectContent>
              </Select>
              <Label>Publish QoS</Label>
              <Select
                value={config?.publishQos?.toString()}
                onValueChange={(value) => {
                  if (value) {
                    const parsedValue = parseInt(value) as MqttQos;
                    setConfig({
                      ...config!,
                      publishQos: parsedValue,
                    } as AppConfig);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a publish QoS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={MqttQos.AT_MOST_ONCE.toString()}>
                    At Most Once
                  </SelectItem>
                  <SelectItem value={MqttQos.AT_LEAST_ONCE.toString()}>
                    At Least Once
                  </SelectItem>
                  <SelectItem value={MqttQos.EXACTLY_ONCE.toString()}>
                    Exactly Once
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Label>Broker Domain</Label>
            <Input
              type="text"
              placeholder="Broker Domain"
              value={config?.brokerDomain}
            />
            <Label>Broker Port</Label>
            <Input
              type="number"
              placeholder="Broker Port"
              value={config?.brokerPort}
            />
            <Label>Post Code</Label>
            <Input
              type="text"
              placeholder="Country Code"
              value={config?.postCode}
            />
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="Username"
              value={config?.username}
            />
            <Label>Password</Label>
            <Input
              type="text"
              placeholder="Password"
              value={config?.password}
            />
            <Label>Location</Label>
            <Input
              type="text"
              placeholder="Location"
              value={config?.location}
            />
            <Label>Client ID</Label>
            <Input
              type="text"
              placeholder="Client ID"
              value={config?.clientId}
            />
            <Label>P12 Password</Label>
            <Input
              type="text"
              placeholder="P12 Password"
              value={config?.p12Password}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
