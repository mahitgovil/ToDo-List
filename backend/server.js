const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
bodyParser.urlencoded({ extended: true });

// Enable All CORS Requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todoListDB");

// Define Todo schema
const todoSchema = new mongoose.Schema({
  listItem: String,
});

// Create Todo model
const Todo = mongoose.model("Todo", todoSchema);

// Endpoint to load all todo items
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).send(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to add a new todo item
app.post("/api/todos", async (req, res) => {
  const todo = new Todo(req.body);
  try {
    await todo.save();
    res.status(201).send("Item added successfully!");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to delete a todo item
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) res.status(404).send("No item found");
    res.status(200).send("Item deleted successfully!");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
