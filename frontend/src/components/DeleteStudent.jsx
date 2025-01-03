import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DeleteStudent.css";

export default function DeleteStudent() {
  const [dataArr, setDataArr] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [userToDelete, setUserToDelete] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/getAllInfo`);
        console.log("Fetched data:", res.data);
        setDataArr(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    getData();
  }, []);

  const handleCross = (id, name) => {
    setPopUp(true);
    setDeleteId(id);
    setUserToDelete(name);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/deleteStudent/${id}`);
      // Remove the deleted student from the state
      setDataArr((prevData) => prevData.filter((item) => item._id !== id));
      setPopUp(false); // Close the popup
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  //   if (popUp) {
  //     return (
  //       <div>
  //         <div>
  //           Confirm Delete?
  //           <button onClick={() => handleDelete(deleteId)}>Yes</button>
  //           <button onClick={() => setPopUp(false)}>Cancel</button>
  //         </div>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div>
  //       <div>
  //         <button onClick={() => navigate("/")}>Go to Home</button>
  //       </div>
  //       <div>
  //         {dataArr.map((item, index) => (
  //           <div key={index}>
  //             {item.name}
  //             <button
  //               style={{ color: "white", background: "red" }}
  //               onClick={() => handleCross(item._id)}
  //             >
  //               Delete
  //             </button>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  return popUp ? (
    <div className="popup-container">
      <div className="popup-content">
        <h3>Confirm Delete {userToDelete}?</h3>
        <div className="popup-actions">
          <button
            className="confirm-button"
            onClick={() => handleDelete(deleteId)}
          >
            Yes
          </button>
          <button className="cancel-button" onClick={() => setPopUp(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="header">
        <button className="navigate-button" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>

      <div className="student-list">
        {dataArr.map((item, index) => (
          <div key={index} className="student-item">
            <span className="student-name">{item.name}</span>
            <button
              className="delete-button"
              onClick={() => handleCross(item._id, item.name)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
