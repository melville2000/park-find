import express from "express";
import bcrypt from "bcrypt";
import users from "../models/user.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const routes = express.Router();
const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_TOKEN;

/* GET / 
    check LOGIN
 */

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    
    // return res.status(401).json({ message: "Unauthorized" });
    res.redirect("login");
    // res.render("/");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    // res.render('/admin')
    return res.status(401).json({ message: "Unauthorized" });
  }
};

routes.get("/", (req, res) => {
  const locals = {
    title: "ParkFind",
    desc: "A secure method of storing your passwords",
  };

  res.render("index", { locals });
});
/*  GET
    ABOUT  */
routes.get("/about", (req, res) => {
  try {
    const locals = {
      title: "ParkFind About",
      desc: "A secure method of storing your passwords",
    };
    res.render("about", { locals });
  } catch (error) {
    console.log(error);
  }
});

/*  GET 
    login PAGE */
routes.get("/login", (req, res) => {
  try {
    const locals = {
      title: "ParkFind LogIn",
      desc: "",
    };
    res.render("login", { successMessage: "", message: "" });
  } catch (error) {
    console.log(error);
  }
});
/*  GET 
    REGISTER PAGE */
routes.get("/register", (req, res) => {
  try {
    const locals = {
      title: "ParkFind SignUp",
      desc: "",
    };
    res.render("register", { locals, failureMessage: "" });
  } catch (error) {
    console.log(error);
  }
});

/*  POST 
    REGISTER login */
routes.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await users.create({
      username,
      email,
      password: hashedPassword,
    });
    res.render("login", { successMessage: " User created" });
  } catch (error) {
    if (error.code) {
      res.render("register", { failureMessage: " User Exists" });
    }
    res.render("register", { failureMessage: " Something went wrong" });
  }
});

/*  POST 
    login check*/
routes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user) {
      res.render("login", {
        successMessage: "",
        message: "Invalid Credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.render("login", {
        successMessage: "",
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("dashboard" /* ,{layout:adminLayout} */);
  } catch (error) {
    // res.render("login", { failureMessage: " Invalid credentials" });
    console.log(error);
  }
});

/*  GET
    DASHBOARD */
routes.get("/dashboard", authMiddleware, (req, res) => {
  try {
    res.render("admin/dashboard", { layout: adminLayout });
  } catch (errot) {
    console.log(error);
  }
});

export default routes;
