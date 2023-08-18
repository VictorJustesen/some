import { db } from "../connect.js";
import jwt from "jsonwebtoken"
import moment from "moment"
export const getPosts = (req, res) => {
    const token= req.cookies.accessToken;
    if(!token) return res.status(401).json("not logged in!")

 jwt.verify(token, "mussekey", (err, userInfo) => {
    if(err) return res.status(403).json("token not valid");

    const q =
     
        `SELECT p.*, u.id AS userid, name, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userid)
    LEFT JOIN relationships AS r ON (p.userid = r.followeduserid) WHERE r.followeruserid= ? OR p.userid =?
    ORDER BY p.createdat DESC`;
     
  

  db.query(q, [userInfo.id, userInfo.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});
};

  export const addPost = (req, res) => {
    const token= req.cookies.accessToken;
    if(!token) return res.status(401).json("not logged in!")

 jwt.verify(token, "mussekey", (err, userInfo) => {
    if(err) return res.status(403).json("token not valid");
//console.log(userInfo.id) weird going on here
    const q= "insert into posts (`desc`,`img`,`createdat`,`userid`) values (?)";
 const values=[
    req.body.desc,
    req.body.img,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    userInfo.id,
 ]
    db.query(q, [values],(err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("post has been created");
      });
  })


}
