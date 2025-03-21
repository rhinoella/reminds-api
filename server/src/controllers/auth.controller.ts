import User from "../schemas/user.schema";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }

  user.comparePassword(password, (err: Error | null, isMatch: boolean) => {
    if (err) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    if (!isMatch) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    res.json({ token });
  });
}

export default { login };
