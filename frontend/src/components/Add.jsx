import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./Add.css";

export default function Add() {
  const [name, setName] = useState("");
  const abc = new Date();
  const [date, setDate] = useState(abc.toISOString().split("T")[0]);
  const navigate = useNavigate();

  const handleAddStudent = async () => {
    // Validation
    if (!name.trim() || !date) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    try {
      let res = await axios.post("http://localhost:8080/addStudent", {
        name,
        date,
      });
      console.log("Response:", res.data);
      toast.success("Student added successfully!");
      setName(""); // Clear the name field after success
      setDate(abc.toISOString().split("T")[0]); // Reset date to current date
    } catch (err) {
      console.error("Error adding student:", err);
      toast.error(
        `Error adding student: ${err.response?.data?.message || err.message}`
      );
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <h2>Add Student</h2>
        <button className="navigate-button" onClick={handleNavigate}>
          Go to Home
        </button>
      </div>

      {/* Form Section */}
      <div className="form">
        <div className="form-group">
          <label htmlFor="student-name">Student Name</label>
          <input
            type="text"
            id="student-name"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="joining-date">Joining Date</label>
          <input
            type="date"
            id="joining-date"
            placeholder="Select Joining Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="submit-button" onClick={handleAddStudent}>
          Add Student
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}
