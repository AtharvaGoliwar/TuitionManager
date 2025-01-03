// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./View.css"; // Import the CSS file for styling
// import { useNavigate, useParams } from "react-router-dom";

// export default function View() {
//   const { id } = useParams();
//   const [userData, setUserData] = useState({});
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [presentNo, setPresentNo] = useState(0);
//   const [absentNo, setAbsentNo] = useState(0);

//   const navigate = useNavigate();

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const years = Array.from(
//     { length: 10 },
//     (_, index) => new Date().getFullYear() - index
//   ); // Generate the past 10 years

//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//     if (selectedMonth !== "") {
//       generateMonthlyAttendance(event.target.value, selectedMonth);
//     }
//   };

//   const handleMonthChange = (event) => {
//     const selectedMonthIndex = months.indexOf(event.target.value);
//     setSelectedMonth(selectedMonthIndex);
//     if (selectedYear !== "") {
//       generateMonthlyAttendance(selectedYear, selectedMonthIndex);
//     }
//   };

//   const generateMonthlyAttendance = (year, monthIndex) => {
//     const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
//     const attendance = [];

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
//         day
//       ).padStart(2, "0")}`;
//       attendance.push({
//         date,
//         status: userData.attendance?.[date] ? "Present" : "Absent",
//       });
//     }
//     setAttendanceData(attendance);
//   };

//   useEffect(() => {
//     const getStudentData = async () => {
//       try {
//         let res = await axios.get(`http://localhost:8080/getInfo/${id}`);
//         setUserData(res.data.item);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getStudentData();
//   }, []);

//   return (
//     <div className="view-container">
//       {console.log(attendanceData)}
//       <button className="navigate-button" onClick={() => navigate("/")}>
//         Go to Home
//       </button>
//       <div className="student-name">
//         <h2>{userData.name}</h2>
//       </div>

//       <div className="selectors">
//         <div className="year-selector">
//           <label htmlFor="year-select">Choose a year: </label>
//           <select
//             id="year-select"
//             value={selectedYear}
//             onChange={handleYearChange}
//           >
//             {years.map((year, index) => (
//               <option key={index} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="month-selector">
//           <label htmlFor="month-select">Choose a month: </label>
//           <select
//             id="month-select"
//             value={months[selectedMonth] || ""}
//             onChange={handleMonthChange}
//           >
//             <option value="" disabled>
//               Select a month
//             </option>
//             {months.map((month, index) => (
//               <option key={index} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {selectedMonth !== "" && (
//         <div className="attendance-table">
//           <div className="attendance-header">
//             <span className="date-header">Date</span>
//             <span className="status-header">Attendance Status</span>
//           </div>
//           {attendanceData.map((item, index) => (
//             <div key={index} className="attendance-row">
//               <span className="attendance-date">{item.date}</span>
//               <span
//                 className={`attendance-status ${
//                   item.status === "Present" ? "present" : "absent"
//                 }`}
//               >
//                 {item.status}
//                 {item.status === "present"
//                   ? setPresentNo(presentNo + 1)
//                   : setAbsentNo(absentNo + 1)}
//               </span>
//             </div>
//           ))}
//           <div className="attendance-row">
//             <span className="attendance-date">Present No. of Days</span>
//             <span>{presentNo}</span>
//           </div>
//           <div className="attendance-row">
//             <span className="attendance-date">Present No. of Days</span>
//             <span>{presentNo}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./View.css"; // Import the CSS file for styling
import { useNavigate, useParams } from "react-router-dom";

export default function View() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [presentNo, setPresentNo] = useState(0);
  const [absentNo, setAbsentNo] = useState(0);

  const navigate = useNavigate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 10 },
    (_, index) => new Date().getFullYear() - index
  ); // Generate the past 10 years

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    if (selectedMonth !== "") {
      generateMonthlyAttendance(event.target.value, selectedMonth);
    }
  };

  const handleMonthChange = (event) => {
    const selectedMonthIndex = months.indexOf(event.target.value);
    setSelectedMonth(selectedMonthIndex);
    if (selectedYear !== "") {
      generateMonthlyAttendance(selectedYear, selectedMonthIndex);
    }
  };

  const generateMonthlyAttendance = (year, monthIndex) => {
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const attendance = [];
    let presentCount = 0;
    let absentCount = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const status = userData.attendance?.[date] ? "Present" : "Absent";
      attendance.push({ date, status });

      // Count the number of presents and absents
      if (status === "Present") {
        presentCount++;
      } else {
        absentCount++;
      }
    }

    // Update state after processing all data
    setAttendanceData(attendance);
    setPresentNo(presentCount);
    setAbsentNo(absentCount);
  };

  useEffect(() => {
    const getStudentData = async () => {
      try {
        let res = await axios.get(`${import.meta.env.VITE_URL}/getInfo/${id}`);
        setUserData(res.data.item);
      } catch (err) {
        console.log(err);
      }
    };
    getStudentData();
  }, [id]);

  return (
    <div className="view-container">
      {console.log(attendanceData)}
      <button className="navigate-button" onClick={() => navigate("/")}>
        Go to Home
      </button>
      <div className="student-name">
        <h2>{userData.name}</h2>
      </div>

      <div className="selectors">
        <div className="year-selector">
          <label htmlFor="year-select">Choose a year: </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="month-selector">
          <label htmlFor="month-select">Choose a month: </label>
          <select
            id="month-select"
            value={months[selectedMonth] || ""}
            onChange={handleMonthChange}
          >
            <option value="" disabled>
              Select a month
            </option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedMonth !== "" && (
        <div className="attendance-table">
          <div className="attendance-header">
            <span className="date-header">Date</span>
            <span className="status-header">Attendance Status</span>
          </div>
          {attendanceData.map((item, index) => (
            <div key={index} className="attendance-row">
              <span className="attendance-date">{item.date}</span>
              <span
                className={`attendance-status ${
                  item.status === "Present" ? "present" : "absent"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
          <div className="attendance-table">
            <div className="attendance-row">
              <span className="attendance-date">Present No. of Days</span>
              <span>{presentNo}</span>
            </div>
            <div className="attendance-row">
              <span className="attendance-date">Absent No. of Days</span>
              <span>{absentNo}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
