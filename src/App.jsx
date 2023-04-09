import React from "react";
import { Routes, Route } from "react-router-dom";

// components
import Home from "./components/Home";
import History from "./components/History";
import Component from "./components/Component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Component />}>
        <Route index element={<Home />} />
        <Route path="History" element={<History />} />
      </Route>
    </Routes>
  );
};

export default App;
