import {db} from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register=(req,res)=>{
const q = "select * from users where username = ?"

db.query(q, [req.body.username] , (err,data)=>{
   
    if(err) return res.status(500).json(err)
    if(data.length) return res.status(409).json("user already exists")
    const salt= bcrypt.genSaltSync(10)
    const hashedPassword= bcrypt.hashSync(req.body.password, salt)

    const q = "insert into users(`username`, `email`, `password`, `name`) values (?)";

    const values = [req.body.username, req.body.email, hashedPassword, req.body.name];
    
    db.query(q, [values], (err, data) => { 
        if (err) return res.status(500).json(err);
        return res.status(200).json("user has been created.")
    })
})



 
}

export const login=(req,res)=>{
    
const q = "select * from users where username = ?"

db.query(q, [req.body.username] , (err,data)=>{
    if(err) return res.status(500).json(err);
    if(data.length===0) return res.status(404).json("no user like that");

    const checkPassword = bcrypt.compareSync(req.body.password,data[0].password)

    if(!checkPassword) return res.status(400).json("wrong password")
    
    
    const token = jwt.sign({id:data[0]}, "musse");

    const {password, ...others}=data[0];

    res.cookie("accessToken", token,{
httpOnly: true,
    }).status(200).json(others);
})

}

export const logout=(req,res)=>{
    
    res.clearCookie("accessToken",/*{secure:true,sameSite:"none"}*/).status(200).json("user has been logged out");
}