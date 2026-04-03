const jwt = require("jsonwebtoken");

const authenticate = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;

    // Step 1: Check header
    if (!authHeader) {
      console.log("No Authorization header");
      return res.status(401).json({ message: "No token provided" });
    }

    // Step 2: Extract token
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      console.log("Invalid header format:", authHeader);
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = parts[1];

    console.log("TOKEN RECEIVED:", token);

    // Step 3: Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    // Step 4: Attach to request
    req.user = decoded;

    // Step 5: Continue
    next();
  } catch (err: any) {
    console.log("JWT ERROR:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authenticate };