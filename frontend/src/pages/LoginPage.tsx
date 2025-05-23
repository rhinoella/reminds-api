import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RemindsIcon } from "@/components/ReMindsLogo";
import { Label } from "@/components/ui/label";
import { redirect, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "../components/AuthProvider";

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async () => {
    try {
      const data = await api.post<
        { username: string; password: string },
        { token: string }
      >("/login", {
        data: {
          username,
          password,
        },
      });

      login(data.token);
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error (show error message to user)
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-[20%] w-full flex-1">
      <Card className="w-md mx-auto">
        <CardHeader className="flex justify-between items-end">
          <CardTitle>Login</CardTitle>
          <RemindsIcon size={100} />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleSubmit()}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
