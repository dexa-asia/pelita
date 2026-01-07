import 'dotenv/config';
import express from "express"
import cors from "cors";
import authMiddleware from "./common/middlewares/auth-middleware.js";
import setupRoutes from "./api/routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

const auth = new authMiddleware ();
app.use((req, res, next) => {
    if (req.body.data) { req.data = JSON.parse(req.body.data); }
    next();
});

app.use((req, res, next) => {
  const allowedPaths = /^\/(auth\/.*|public\/.*|logout|login|register)$/;
  if (allowedPaths.test(req.path)) {
    next();
  } else {
    auth.validateAuth(req, res, next);
  }
});
  

setupRoutes(app);
const PORT = process.env.PORT_MOBILE;
app.listen(PORT, () => {
    console.log(`>>> teracoop api services is running on port ${PORT}`);
});