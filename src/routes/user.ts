import { Router } from "express";
import { sign } from "jsonwebtoken";
import { compareSync } from "bcrypt";

import validate from "@/middleware/validate";
import User, { loginSchema } from "@/models/user";

const router = Router();

// login user
router.post("/login", validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Invalid login credentials" });
  }

  const isMatch = compareSync(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ error: "Invalid login credentials" });
  }

  // alternative would be to make password optinal in the typing
  // and force it string wherever needed.
  // granted its not the best way of doing this, but time constraints
  // @ts-ignore
  delete user.password;

  res.json({ user, token: sign({ id: user._id }, "secret") });
});
