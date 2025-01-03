// import React, { useEffect, useState } from "react";
// import "./ToggleButton.css"; // Make sure to import the CSS file

// const ToggleButton = ({ state, onToggleChange, index }) => {
//   // Set initial state to true (Present)
//   const [isPresent, setIsPresent] = useState(state);
//   console.log("tog", isPresent);

//   const handleToggle = () => {
//     setIsPresent((prev) => !prev); // Toggle the state between true and false
//   };

//   useEffect(() => {
//     onToggleChange(index, isPresent);
//   }, [isPresent, state]);

//   useEffect(() => {
//     console.log(isPresent);
//   }, []);

//   if (state === undefined) {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     <div className="toggle-container">
//       {/* {console.log(isPresent)} */}
//       {/* Toggle button with dynamic class based on the state */}
//       <div
//         className={`toggle-button ${!isPresent ? "absent" : ""}`}
//         onClick={handleToggle}
//       >
//         <div className="toggle-text">{isPresent ? "Present" : "Absent"}</div>
//       </div>
//     </div>
//   );
// };

// export default ToggleButton;

// import React, { useEffect, useState } from "react";
// import "./ToggleButton.css"; // Make sure to import the CSS file

// const ToggleButton = ({ state, onToggleChange, index }) => {
//   const [isPresent, setIsPresent] = useState(state);
//   console.log(state, index, isPresent);

//   // Synchronize `isPresent` with `state` when `state` prop changes
//   useEffect(() => {
//     // Only update isPresent if the state prop has changed
//     if (state !== isPresent) {
//       setIsPresent(state);
//     }
//   }, []);

//   // Notify parent of `isPresent` changes
//   useEffect(() => {
//     onToggleChange(index, isPresent);
//   }, [isPresent, state]);

//   const handleToggle = () => {
//     setIsPresent((prev) => !prev); // Toggle the state between true and false
//   };

//   if (state === undefined) {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     <div className="toggle-container">
//       <div
//         className={`toggle-button ${!isPresent ? "absent" : ""}`}
//         onClick={handleToggle}
//       >
//         <div className="toggle-text">{isPresent ? "Present" : "Absent"}</div>
//       </div>
//     </div>
//   );
// };

// export default ToggleButton;

import React, { useEffect, useState } from "react";
import "./ToggleButton.css"; // Ensure the CSS file is imported

const ToggleButton = ({ state, onToggleChange, index }) => {
  const [isPresent, setIsPresent] = useState(state);

  // Synchronize `isPresent` with the `state` prop when it changes
  useEffect(() => {
    if (state !== isPresent) {
      setIsPresent(state);
    }
  }, [state, isPresent]);

  // Handle toggle action
  const handleToggle = () => {
    const newValue = !isPresent;
    setIsPresent(newValue); // Update local state
    onToggleChange(index, newValue); // Notify parent of the new value
  };

  // Return loading state if `state` is undefined
  if (state === undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="toggle-container">
      <div
        className={`toggle-button ${!isPresent ? "absent" : "present"}`}
        onClick={handleToggle}
      >
        <div className="toggle-text">{isPresent ? "Present" : "Absent"}</div>
      </div>
    </div>
  );
};

export default ToggleButton;
