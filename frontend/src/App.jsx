import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Add from "./components/Add";
import DeleteStudent from "./components/DeleteStudent";
import View from "./components/View";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addstudent" element={<Add />} />
        <Route path="/deletestudent" element={<DeleteStudent />} />
        <Route path="/viewstudent/:id" element={<View />} />
      </Routes>
    </>
  );
}

export default App;
