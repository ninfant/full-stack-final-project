import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const { authorization, apikey } = req.headers;
  const token = authorization?.split(" ")[1];

  if (!(token || apikey))
    return res.status(401).json({ error: "Missing authentication header" });

  if (apikey) {
    return req, res, next();
  }

  //verify jwt token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
