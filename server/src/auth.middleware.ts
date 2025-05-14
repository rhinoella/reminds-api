import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Device from "./schemas/device.schema";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  console.log(`Incoming request: ${req.method} ${req.url}`);

  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (authHeader) {
    const headerType = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (headerType === "Bearer") {
      jwt.verify(
        token,
        process.env.JWT_SECRET!,
        (err: Error | null, user: any) => {
          if (err) {
            res.status(401).json({ message: "Unauthorized" });
            return;
          }

          next();
        }
      );
    } else if (headerType === "Id") {
      const deviceId = authHeader.split(" ")[1];
      const device = await Device.findOne({ deviceId });

      console.log(`Device: ${deviceId}`);

      if (!device) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      req.query["deviceId"] = deviceId;

      next();
    }
  }
}
