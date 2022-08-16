const express = require("express");
const app = express();
const cors = require("cors");

const pool = require("./db");
//? we will use this pool to do psql queries

//middleware
app.use(cors());
app.use(express.json());
//? json() helps us to access the request.body

//* ROUTES

//* create a todo

app.get('/',function(req,resp)
{
    console.log('Hello I am Get for /')
    resp.send("<h1>Hello I am Get for /</h1>")
})

app.post("/todos", async(req,resp)=>{

try{
    console.log(req.body);
    const { description } = req.body
    // const {variables in json received } = json object
    //! Sometimes if we insert json other than 'decription' field then description will be undefined.
    console.log(description)
    //* https://youtu.be/-vR3a11Wzt0

    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description])
    //* INSERT INTO todo(todo_id,description) values(7,'test insertion');
    //* Returning * return's us the Inserted Document into newTodo.

    resp.json(newTodo.rows[0])
} catch(err){
    console.error(err.message);
}
})

//* get all todos

app.get('/todos', async function (req,resp)
{
    try{
    const all_todos = await pool.query("Select * from todo")
    //* Return * not needed as select also returns the result
    resp.json(all_todos.rows)
    } catch(err)
    {
        console.error(err.message)
    }
})

//* get a todo

//* update a todo

//* delete a todo

app.listen(5000,()=>{
    console.log("Listening on Port 5000");
})
