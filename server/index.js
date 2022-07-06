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

app.post("/todos", async(req,resp)=>{
try{
    console.log(req.body);
}
catch{
    console.error(err.message);
}
})

//* get a todo

//* update a todo

//* delete a todo

app.listen(5000,()=>{
    console.log("Listening on Port 5000");
})
