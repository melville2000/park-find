import express from "express"
import mainRoutes from "./server/routes/main.js"
import expressEjsLayouts from "express-ejs-layouts";
import connectDB from "./server/config/db.js";
import session from "express-session";
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import "dotenv/config"

const app = express();

const PORT = process.env.PORT

connectDB()


app.use(express.urlencoded({ extended: true })); //bodyparser
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
}));

app.use(express.static("public"))
app.use(expressEjsLayouts)
app.set('layout', './layouts/main')
app.set('view engine', "ejs")

app.use('/', mainRoutes)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})