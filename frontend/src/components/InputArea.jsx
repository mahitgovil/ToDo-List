import React, { useState } from "react";
import axios from "axios";

export default function InputArea(props) {
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputText(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      props.onAdd(inputText);
      const response = await axios.post("http://localhost:5000/api/todos", {
        listItem: inputText,
      });
      setInputText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
      <button type="submit" onClick={handleSubmit}>
        <span>Add</span>
      </button>
    </div>
  );
}
