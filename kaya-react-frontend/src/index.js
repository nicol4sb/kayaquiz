import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import KayaQuizForm from "./components/KayaQuizForm/KayaquizForm";
import Results from "./components/Results/Results";
import Conclusion from "./components/Conclusion/Conclusion";
import GroupResults from "./components/GroupResults/GroupResults";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Footer from "./components/Footer/Footer";
import Stats from "./components/Stats/Stats";
import FacilitatorQR from "./components/FacilitatorQR/FacilitatorQR";
import { ModalProvider } from "./components/ModalContext/ModalContext";
import "./i18n"; // ✅ just import — no need to call init here
import { Suspense } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useLocation,
} from "react-router-dom";

const KayaQuizWithFacilitator = () => {
  const { facilitatorId, sessionId } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const sessionType = parseInt(queryParams.get("session_type") || "0", 10);
  return (
    <KayaQuizForm
      facilitatorId={facilitatorId}
      sessionId={sessionId}
      sessionType={sessionType}
    />
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<KayaQuizForm />} />
            <Route path="/results" element={<Results />} />
            <Route path="/conclusion" element={<Conclusion />} />
            <Route path="/admin" element={<GroupResults />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/facilitator/:facilitatorId" element={<FacilitatorQR />} />
            <Route path="/:facilitatorId/:sessionId" element={<KayaQuizWithFacilitator />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading translations...</div>}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Suspense>
  </React.StrictMode>
);

// Optional performance measuring
reportWebVitals();
