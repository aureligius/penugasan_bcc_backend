const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const registerUser = async (email: string, password: string) => {
  console.log("INSERTING USER INTO DB...");

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, hashedPassword]
  )

  return result.rows[0];
};

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  
  const user = result.rows[0];

  if(!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) throw new Error("Invalid Password");

  const token = jwt.sign(
    {email: user.email},
    process.env.JWT_SECRET,
    { expiresIn: "1h"}
  );

  return token;
};

module.exports = { registerUser, loginUser };