import {db} from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register=(req, res)=>{
    const q = "select * from users where username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("user already exists");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        
        const insertUserQ = "insert into users(`username`, `email`, `password`, `name`) values (?)";
        const values = [req.body.username, req.body.email, hashedPassword, req.body.name];
        
        db.query(insertUserQ, [values], (err, data) => { 
            if (err) return res.status(500).json(err);

            // Fetch the new user's ID
            const newUserID = data.insertId;
            
            

            // Insert the new relationship with user ID 5 (Introduction user)
            const insertRelationshipQ = "insert into relationships(`followeruserid`, `followeduserid`) values (?, ?)";
            db.query(insertRelationshipQ, [newUserID, 5], (relErr) => {
                if (relErr) return res.status(500).json(relErr);
                return res.status(200).json("user has been created and followed the introduction profile.");
            });
        });
    });
}

export const login=(req,res)=>{
    
const q = "select * from users where username = ?"

db.query(q, [req.body.username] , (err,data)=>{
    if(err) return res.status(500).json(err);
    if(data.length===0) return res.status(404).json("no user like that");

    const checkPassword = bcrypt.compareSync(req.body.password,data[0].password)

    if(!checkPassword) return res.status(400).json("wrong password")
    
    //weird
    const userData = { ...data[0] };
    const token = jwt.sign(userData, "mussekey");

    const {password, ...others}=data[0];

    res.cookie("accessToken", token,{
httpOnly: true,
    }).status(200).json(others);
})

}

export const logout=(req,res)=>{
    
    res.clearCookie("accessToken",/*{secure:true,sameSite:"none"}*/).status(200).json("user has been logged out");
}