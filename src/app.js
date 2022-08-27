const express = require('express');
const Register=require('./models/registerschema')
const path=require('path');
const hbs=require("hbs");
const app=express();

require('./db/conn')

const static_path=path.join(__dirname,"../Green")
const registerstatic_path=path.join(__dirname,"../colorlib-regform-18")
const loginstatic_path=path.join(__dirname,"../login-form-11")
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path));
app.use(express.static(registerstatic_path));
app.use(express.static(loginstatic_path));
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path)

const port=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    
    res.render("index");
})

app.get('/register',(req,res)=>{
   
    res.render("register");
})

app.get('/login',(req,res)=>{
   
    res.render("login");
})

app.post('/register',async(req,res)=>{
    try{
        const password=req.body.password;
        const conpassword=req.body.conpassword;
        if(password===conpassword){
            const registeremployee=new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:req.body.password,
                conpassword:req.body.conpassword
            })

           const registered=await registeremployee.save();
           console.log(registered)
           
           res.status(201).render('index');
        }else{
            res.send('password are not matching')
        }
    }catch(e){
        console.log(e);
    }
})

app.post('/login',async(req,res)=>{
    try{
        const email=req.body.email;
        console.log(email)
        const password=req.body.password
        console.log(password)
        const useremail=await Register.findOne({email:email});
        console.log(useremail);
        if(useremail.password===password){
            res.render('index');
        }else{
            res.send('invalid credintials')
        }
    }catch(e){
        res.send(e)
    }
})

app.listen(port, () => {
    console.log('App listening on port 3000!');
});