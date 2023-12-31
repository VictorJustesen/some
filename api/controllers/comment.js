import { db } from "../connect.js";
import jwt from "jsonwebtoken"
import moment from "moment"


export const getComments = (req, res) => {
    
    const q =
     
        `SELECT c.*, u.id AS userid, name, profilepic FROM comments AS c JOIN users AS u ON (u.id = c.userid)
    where c.postid=? ORDER BY c.createdat DESC`;
     
  

  db.query(q, [req.query.postid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

export const addComment = (req, res) => {
    const token= req.cookies.accessToken;
    if(!token) return res.status(401).json("not logged in!")

 jwt.verify(token, "mussekey", (err, userInfo) => {
    if(err) return res.status(403).json("token not valid");
//console.log(userInfo.id) weird going on here
    const q= "insert into comments (`desc`,`createdat`,`userid`, `postid`) values (?)";
 const values=[
    req.body.desc,
    
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    userInfo.id,
    req.body.postid
 ]
    db.query(q, [values],(err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("comment has been created");
      });
  })


}


export const deleteComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "mussekey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const commentid = req.params.id;
      const q = "DELETE FROM comments WHERE `id` = ? AND `userid` = ?";
  
      db.query(q, [commentid, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Comment has been deleted!");
        return res.status(403).json("You can delete only your comment!");
      });
    });
  };