require('dotenv').config();
const jwt = require("jsonwebtoken");
const ApiError = require('../services/ApiError.service');

const verifyToken = (req, res, next) => {
  console.log('\n🔐 ===== ACCESS TOKEN VERIFICATION =====');
  console.log('   Timestamp:', new Date().toISOString());
  console.log('   Route:', req.method, req.originalUrl);
  console.log('   IP Address:', req.ip);
  
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      console.log('   ❌ Authorization header missing');
      throw new ApiError(401, "Authorization header missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log('   ❌ Missing access token in Authorization header');
      throw new ApiError(401, "Missing access token");
    }

    console.log('   ✅ Access token received from frontend');
    console.log('   Token (first 50 chars):', token.substring(0, 50) + '...');

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
      audience: 'your-frontend',
      issuer: 'your-app'
    });
    
    console.log('   ✅ Access token verified successfully');
    console.log('   User ID:', payload.id);
    console.log('   Role:', payload.role);
    console.log('   Issued at:', new Date(payload.iat * 1000).toISOString());
    console.log('   Expires at:', new Date(payload.exp * 1000).toISOString());
    console.log('   ===========================================\n');
    
    req.user = payload; // Attach the user to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.log('   ❌ Access token verification failed');
    console.log('   Error:', error.message);
    console.log('   ===========================================\n');
    
    if (error.statusCode) {
      next(error); // Pass ApiError to error handler
    } else {
      next(new ApiError(401, 'Invalid or expired access token'));
    }
  }
};

const authorizeAdmin = (req, res, next) => {
  console.log('\n🔐 ===== ADMIN ACCESS TOKEN VERIFICATION =====');
  console.log('   Timestamp:', new Date().toISOString());
  console.log('   Route:', req.method, req.originalUrl);
  console.log('   IP Address:', req.ip);
  
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      console.log('   ❌ Authorization header missing');
      throw new ApiError(401, "Authorization header missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log('   ❌ Missing access token in Authorization header');
      throw new ApiError(401, "Missing access token");
    }

    console.log('   ✅ Access token received from frontend');
    console.log('   Token (first 50 chars):', token.substring(0, 50) + '...');

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
      audience: 'your-frontend',
      issuer: 'your-app'
    });

    console.log('   ✅ Access token verified successfully');
    console.log('   User ID:', decoded.id);
    console.log('   Role:', decoded.role);
    console.log('   Issued at:', new Date(decoded.iat * 1000).toISOString());
    console.log('   Expires at:', new Date(decoded.exp * 1000).toISOString());

    if (decoded.role !== "admin") {
      console.log('   ❌ Access denied - User role is not admin');
      console.log('   Current role:', decoded.role);
      console.log('   Required role: admin');
      throw new ApiError(403, "Access denied. Admins only.");
    }

    console.log('   ✅ Admin access granted');
    console.log('   ===========================================\n');
    
    req.adminId = decoded.id;
    next();
  } catch (error) {
    console.log('   ❌ Admin access token verification failed');
    console.log('   Error:', error.message);
    console.log('   Error Type:', error.name);
    console.log('   ===========================================\n');
    
    if (error.statusCode) {
      next(error); // Pass ApiError to error handler
    } else {
      next(new ApiError(401, "Invalid or expired token"));
    }
  }
};


module.exports = { verifyToken, authorizeAdmin };
