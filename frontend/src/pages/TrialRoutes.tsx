import { Navigate, Outlet, useParams } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { TrialDocument } from "@reminds/server";
import { useAuth } from "@/components/AuthProvider";

export function TrialRoutes() {
  const { trialId } = useParams();
  const [trial, setTrial] = useState<TrialDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  return (
    <main className="min-w-screen flex min-h-screen">
      <Sidebar />
      <div className="max-w-[1400px] mx-auto w-full px-8 py-20">
        <Outlet context={{ trial }} />
      </div>
    </main>
  );
}
