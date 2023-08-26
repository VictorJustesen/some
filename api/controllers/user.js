import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userid;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [req.params.userid], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data || data.length === 0) return res.status(404).json("User not found");
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "mussekey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const updatableFields = ["name", "city", "website", "profilepic", "coverpic", "twitter", "linkedin", "instagram", "facebook","description"];    const placeholders = [];
    const values = [];
    
    updatableFields.forEach((field) => {
      if (req.body[field] && req.body[field].trim().length > 0) {
        placeholders.push(`\`${field}\`=?`);
        values.push(req.body[field]);
      }
    });

    if (placeholders.length === 0) {
      return res.status(400).json("No valid fields provided for update.");
    }

    const q = `UPDATE users SET ${placeholders.join(", ")} WHERE id=?`;
    values.push(userInfo.id);

    db.query(q, values, async (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data || data.affectedRows === 0) return res.status(403).json("You can update only your post!");

      // Fetch updated user info from the database
      const fetchUserQ = "SELECT * FROM users WHERE id=?";
      db.query(fetchUserQ, [userInfo.id], (err, updatedData) => {
        if (err) return res.status(500).json(err);
        if (updatedData.length === 0) return res.status(404).json("User not found after update");

        // Create a new token with the updated user data
        const updatedUserData = { ...updatedData[0] };
        const newToken = jwt.sign(updatedUserData, "mussekey");

        const {password, ...others} = updatedData[0];
        res.cookie("accessToken", newToken, { httpOnly: true })
           .status(200)
           .json(others);
      });
    });
  });
};

export const searchUsers = (req, res) => {
  const query = req.params.query;
  if (query.length === 0) return res.status(400).json("Search query is empty!");

  // The SQL might differ based on the actual structure and columns you have in your 'users' table
  const q = "SELECT * FROM users WHERE name LIKE ? LIMIT 5";

  db.query(q, [`%${query}%`], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data || data.length === 0) return res.status(404).json("No users found");

    const users = data.map(user => {
      const { password, ...info } = user; // Exclude the password from the returned data
      return info;
    });
    return res.json(users);
  });
};