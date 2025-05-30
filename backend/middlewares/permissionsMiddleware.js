export const permissionsMiddleware = (req, res, next) => {
  const apiKey = req.headers["apikey"];

  if (!apiKey) {
    return res.status(401).json({ error: "API key is missing" });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next();
};
