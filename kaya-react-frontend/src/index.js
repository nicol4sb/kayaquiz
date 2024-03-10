import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// import App from './App';
import KayaQuizForm from "./components/KayaQuizForm/KayaquizForm";
import Results from "./components/Results/Results";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<KayaQuizForm />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
