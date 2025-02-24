const cheakAuth = require("../config/cheakAuth");
require("dotenv").config();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const router = require("express").Router();

// Configure rate limiter (e.g., 4 requests per 5 minutes per IP)
const rateLimiter = new RateLimiterMemory({
    points: 4,        // Number of allowed requests
    duration: 300,    // Time window in seconds (15 minutes)
});

const rateLimiterMiddleware = async (req, res, next) => {
    try {
        await rateLimiter.consume(req.ip); // Deduct a point for each request
        next(); // Proceed if within limits
    } catch {
       return res.status(429).json({
            success: false,
            message: "Too many requests. Please try again later.",
        });
    }
};


// router.post('/user/add',addUser);
router.post("/user/logIn", rateLimiterMiddleware, async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (mail && password) {
        
        const allMail = [
            process.env.MAIL_1,
            process.env.MAIL_2,
            process.env.MAIL_3,
            process.env.MAIL_4
        ]

      if (allMail.includes(mail)) {
        if (password === process.env.password) {
          const payload = {
            userId: '67bc469442a608e30b6c3460',
          };
          const token = JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "30d",
          });

          return res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            token: token,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Authentication failed: incorect password",
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: "Authentication failed: not found",
        });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: `Please fill the form` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Something broke :${error.message}` });
  }
});

// router.get('/user',(req,res)=>{
//     res.status(200).json({
//         message:process.env.MAIL_1
//     });
// });

module.exports = router;
