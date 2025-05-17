import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN ATTEMPT:", email, password);
  // TODO: hacerlo con los usuarios reales de la BD y no hardcoded como esta ahora
  if (email === process.env.EMAIL && password === process.env.PASSWORD) {
    const token = jwt.sign({ userId: 1, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Invalid credentials" });
};
