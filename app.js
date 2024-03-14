import express from "express"
import mainRoutes from "./server/routes/main.js"
import expressEjsLayouts from "express-ejs-layouts";
import "dotenv/config"

const app = express();

const PORT = 3000 || process.env.PORT



app.use(express.static("public"))
app.use(expressEjsLayouts)
app.set('layout','./layouts/main')
app.set('view engine', "ejs")

app.use('/',mainRoutes)

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})