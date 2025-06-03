import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
// Middleware to authenticate user using JWT
function authenticateUser(req, res, next) {
 // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  // Split and get the token part 
  const token = authHeader && authHeader.split(" ")[1];
 // If no token found, return unauthorized response
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
 // Verify the token using the JWT secret
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
       // Token is invalid or expired
      return res.status(403).json({ message: "Invalid or expired token" });
    }
      // Token is valid, attach decoded user info to request object
    req.user = decodedUser; 
     // Proceed to the next middleware or controller
    next();
  });
}

export default authenticateUser;
