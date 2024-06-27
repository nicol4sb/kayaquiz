import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import KayaQuizForm from "./components/KayaQuizForm/KayaquizForm";
import Results from "./components/Results/Results";
import Conclusion from "./components/Conclusion/Conclusion";
import GroupResults from "./components/GroupResults/GroupResults"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Footer from "./components/Footer/Footer";
import Stats from "./components/Stats/Stats";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Routes>
          <Route path="/" element={<KayaQuizForm />} />
          <Route path="/results" element={<Results />} />
          <Route path="/conclusion" element={<Conclusion />} />
          <Route path="/admin" element={<GroupResults />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
        <Footer/>
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
