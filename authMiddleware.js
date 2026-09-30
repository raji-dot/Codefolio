const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Normalize user token values to safely support both flat and nested payloads
    if (decoded.user) {
      req.user = decoded.user;
    } else {
      req.user = decoded;
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
