import express from "express";
import cors from "cors";
import pool from "./pool.js"
const app = express();
// create a server and listen on port 3000
app.use(cors());
app.use(express.json());
app.get("/todos", async(req, res) => {
    try{
        const todos = await pool.query("SELECT * FROM todo");
        res.json(todos.rows);
    }catch(err){
        console.log(err);
    }
});

app.get("/todos/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const todos = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
        res.json(todos.rows[0]);
    }catch(err){
        console.log(err);
    }
});

app.post("/todos", async(req, res) => {
    try{
        let {description} = req.body;
        const todo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(todo.rows[0]);
    }catch(err){
        console.log(err);
    }
});

app.delete("/todos/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const todo = await pool.query("DELETE FROM todo WHERE todo_id=$1 RETURNING *", [id]);
        res.json(todo.rows[0]);
    }catch(err){
        console.log(err);
    }
});

app.put("/todos/:id", async(req, res) => {
    try{
        const desc = req.body.description;
        const id = req.params.id;
        const todo = await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *", [desc, id]);
        res.json(todo.rows[0]);
    }catch(err){
        console.log(err);
    }
});

app.listen(5000, () => {
    console.log("Listening");
})