import express from"express";

const routes = express.Router()

routes.get('/',(req,res)=>{
    const locals = {
        'title':'ParkFind',
        "desc":"A secure method of storing your passwords"
    }
    res.render("index",{locals})
})


routes.get('/about',(req,res)=>{
    try {
        const locals = {
            'title':'ParkFind About',
            "desc":"A secure method of storing your passwords"
        }
        res.render("about",{locals})
    } catch (error) {
        console.log(error)
    }
})

routes.get("/login",(req,res)=>{
    try {
        const locals = {
            'title':'ParkFind LogIn',
            "desc":""
        }
        res.render('login',{locals})
    } catch (error) {
        console.log(error)
    }
})


export default routes;