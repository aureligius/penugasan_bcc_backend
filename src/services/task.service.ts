const pool = require("../config/db");
const axios = require("axios");

const createTask = async (title: string, email: string) => {
    let quote= "";

    try{
        const response = await axios.get("https://zenquotes.io/api/random");
        quote = response.data[0].q;
    } catch(err){
        console.log("Quote fetch failed");
        quote = "Stay motivated!";
    }

    const result = await pool.query(
        "INSERT INTO tasks (title, user_email, status) VALUES ($1, $2, $3) RETURNING *",
        [title, email, "todo"]
    );

    const task = result.rows[0];

    return{
        ...task,
        quote,
    };
};

const getTasks = async (email: string) => {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE user_email = $1",
    [email]
  );

  return result.rows;
};

const deleteTask = async (id: number, email: string) => {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 AND user_email = $2 RETURNING *",
    [id, email]
  );

  return result.rows[0];
};

const updateTask = async (id: number, email: string, status: string) => {
    const result = await pool.query(
        "UPDATE tasks SET status = $1 WHERE id = $2 AND user_email = $3 RETURNING *",
        [status, id, email]
    );

    return result.rows[0];
}

module.exports = { createTask, getTasks, deleteTask, updateTask };