import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import axios from "axios";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/todos");
        setItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTodos();
  });

  function addItem(inputText) {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
  }

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onAdd={addItem} />
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={todoItem._id}
              text={todoItem.listItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
