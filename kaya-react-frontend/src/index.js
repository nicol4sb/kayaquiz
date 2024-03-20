import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import KayaQuizForm from "./components/KayaQuizForm/KayaquizForm";
import Results from "./components/Results/Results";
import Results119 from "./components/Results/Results119";
import Results126 from "./components/Results/Results126";
import Results245 from "./components/Results/Results245";
import Results370 from "./components/Results/Results370";
import Results580 from "./components/Results/Results580";
import Conclusion from "./components/Conclusion/Conclusion";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Routes>
          <Route path="/" element={<KayaQuizForm />} />
          <Route path="/results" element={<Results />} />
          <Route path="/results119" element={<Results119 />} />
          <Route path="/results126" element={<Results126 />} />
          <Route path="/results245" element={<Results245 />} />
          <Route path="/results370" element={<Results370 />} />
          <Route path="/results580" element={<Results580 />} />
          <Route path="/conclusion" element={<Conclusion />} />
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
