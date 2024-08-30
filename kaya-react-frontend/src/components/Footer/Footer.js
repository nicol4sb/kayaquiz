import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";  // Assuming you're using React Router

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "#f0f0f0",
      }}
    >
      © {new Date().getFullYear()} kayaquiz.com. {t("All_rights_reserved")}
      <br />
      <Link to="/stats" style={{ color: "blue", textDecoration: "underline" }}>
        {t("Stats")}
      </Link>
    </footer>
  );
};

export default Footer;
