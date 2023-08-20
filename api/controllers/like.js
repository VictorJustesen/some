import {db} from "../connect.js"
import jwt from "jsonwebtoken"
export const getLikes = (req,res)=>{
   
    const q= "select userid from likes where postid=? ";
    
    db.query(q, [req.query.postid],(err, data) => {
        if (err) return res.status(500).json(err);
        const userIds = data.map(like => like.userid);
    return res.status(200).json(userIds);
      });
  }

  export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "mussekey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO likes (`userid`,`postid`) VALUES (?)";
      const values = [
        userInfo.id,
        req.body.postid
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been liked.");
      });
    });
  };
  
  export const deleteLike = (req, res) => {
  
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "mussekey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "DELETE FROM likes WHERE `userid` = ? AND `postid` = ?";
      db.query(q, [userInfo.id, req.query.postid], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been disliked.");
      });
    });
  };