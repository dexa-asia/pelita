import 'dotenv/config';
import express from "express"
import cors from "cors";
import authMiddleware from "./common/middlewares/auth-middleware.js";
import setupRoutes from "./api-backend/routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

const auth = new authMiddleware ();
app.use((req, res, next) => {

  try{

    //skip parsing JSON if multipart
   if (req.is('multipart/form-data')) {
    //console.log('⚙️ Multipart form detected');
    return next(); 
   }

    // Ensure body exists and contains data for non multipart form data request
    if (req.body && req.body.data) {
      req.data = JSON.parse(req.body.data);
      return next();
    } else {
      return res.status(400).json({
        status: 400,
        message: "Bad Request! Empty payload",
      });
    }

  }
  catch (err) {
    // Handle invalid JSON
    return res.status(400).json({
      status: 60,
      message: "Invalid request format",
      error: err.message,
    });
  }
});

app.use((req, res, next) => {
    const allowedPaths = /^\/(auth|public)(\/.*)?$/;
    if(allowedPaths.test(req.path)){
      next();
    }
    else{
      auth.validateBackend(req, res, next);
    }
});
  
setupRoutes(app);
const PORT = process.env.PORT_BACKEND;
app.listen(PORT, () => {
    console.log('\x1b[35m%s\x1b[0m',`✅conqueror backend services is running on port ${PORT}`);
});