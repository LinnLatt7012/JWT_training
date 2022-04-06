const express = require("express");
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const router = express.Router();
const {check, validationResult} = require("express-validator")
const {users} = require("../database/db");
const checkAuth = require("../middleware/checkAuth");
router.get('/',(req,res)=>{
    res.send("Auth route working")
})
router.get('/all',checkAuth,(req,res)=>{
    res.send(users)
})
router.post('/signup',[
    check("email","Please provide a valid email")
        .isEmail(),
    check("password","Password must be greater than 6 numbers or character")
        .isLength({
            min:6
        }),
],async(req,res)=>{
    const {password, email} = req.body;
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    // console.log(email)
    const userDuplication = users.find((user)=>
    user.email==email
    )
    if(userDuplication){
        return res.status(400).json({
            errors: [
                {
                    "msg": "Email is already exist",
                }
            ]
        })
    }
    users.push({
        email,
        password:await bcrypt.hash(String(password),10)
    })
    token = JWT.sign({
        email
    },'sdakjfsadfkdsjfl;dskfas;dskdflads',{
        expiresIn: 36000
    }
    )
    res.json({
        token
    })
})


router.post('/login',async(req,res)=>{
    const {password, email} = req.body;
    const user = users.find((user)=>{
        return user.email==email
    }
    )
    if(!user){
        return res.status(400).json({
            errors: [
                {
                    "msg": "Email is not match",
                }
            ]
        })
    }
    console.log(user);
    const passwordMatch = await bcrypt.compare(String(password),user.password)
    if(!passwordMatch){
        return res.status(400).json({
            errors: [
                {
                    "msg": "Password is not match",
                }
            ]
        })
    }
    token = JWT.sign({
        email
    },'sdakjfsadfkdsjfl;dskfas;dskdflads',{
        expiresIn: 36000
    }
    )
    res.json({
        token
    })
    
})

module.exports = router