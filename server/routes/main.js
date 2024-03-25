import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import users from "../models/user.js"

const routes = express.Router();

routes.get("/", (req, res) => {
  const locals = {
    title: "ParkFind",
    desc: "A secure method of storing your passwords",
  };
  
  res.render("index", { locals});
});

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
    const successMessage = ""
    res.render("login",{successMessage});
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
    res.render("register", { locals,failureMessage:""});
  } catch (error) {
    console.log(error);
  }
});


/*  POST 
    REGISTER login */
routes.post("/register", async (req, res) => {
  const { username ,email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await users.create({ username, email, password: hashedPassword });
    res.render("login",{successMessage:' User created'})

  } catch (error) {
    if(error.code){
        res.render("register",{failureMessage:' User Exists'})
    }
    res.render("register",{failureMessage:' Something went wrong'})
  }
});

export default routes;
