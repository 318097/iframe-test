import React from "react";
import "./App.scss";
import AppContent from "./components/AppContent";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <div className="react-ui">
      <AppContent />
    </div>
  </BrowserRouter>
);

export default App;
