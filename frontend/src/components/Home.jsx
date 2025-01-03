import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for react-toastify
import ToggleButton from "./ToggleButton";

export default function Home() {
  const [dataArr, setDataArr] = useState([]);
  const [stateArr, setStateArr] = useState([]);
  const [recollectData, setRecollectData] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const navigate = useNavigate();

  // Function to assign states based on selected date
  const assignStates = () => {
    if (!dataArr || dataArr.length === 0) {
      setStateArr([]);
      return;
    }

    const newStateArr = dataArr.map(
      (item) => item.attendance?.[selectedDate] || false
    );
    setStateArr(newStateArr);
    console.log("Updated stateArr:", newStateArr);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/getAllInfo`);
        console.log("Fetched data:", res.data);
        setDataArr(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to fetch data. Please try again later.");
      }
    };

    getData();
  }, [recollectData]);

  useEffect(() => {
    assignStates();
  }, [dataArr, selectedDate]);

  const handleClick = () => {
    navigate("/addstudent");
  };

  const handleToggleClick = (index, newVal) => {
    setStateArr((prevArr) => {
      const newArr = [...prevArr];
      newArr[index] = newVal;
      return newArr;
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting:", { dataArr, selectedDate, stateArr });
      const res = await axios.put(`${import.meta.env.VITE_URL}/submit`, {
        data: dataArr,
        selectedDate,
        stateArr,
      });
      console.log("Response:", res.data);
      toast.success("Attendance updated successfully!");
      setRecollectData((prev) => !prev);
    } catch (err) {
      console.error("Error submitting data:", err);
      console.log(err);
      if (err.status === 400) {
        toast.error("No document changed");
      } else {
        toast.error(`Error updating attendance: ${err.message}`);
      }
    }
  };

  const handleDeleteClick = () => {
    navigate("/deletestudent");
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <button onClick={handleClick}>Add Student</button>
        <button onClick={handleDeleteClick}>Delete Student</button>
      </div>

      {/* Date Picker */}
      <div className="date-picker">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Student List */}
      <div className="student-list">
        {dataArr.map((item, index) => (
          <div key={index} className="student-item">
            <div className="student-name">{item.name}</div>
            <div className="student-actions">
              <button onClick={() => navigate(`/viewstudent/${item._id}`)}>
                View
              </button>
              {stateArr[index] !== undefined && (
                <ToggleButton
                  state={stateArr[index]}
                  index={index}
                  onToggleChange={handleToggleClick}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="footer">
        <button onClick={handleSubmit}>Post Attendance</button>
      </div>
      <ToastContainer />
    </div>
  );
}
