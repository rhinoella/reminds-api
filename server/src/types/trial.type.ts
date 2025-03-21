import { Document } from "mongoose";

export type Trial = {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface TrialDocument extends Trial, Document {}
