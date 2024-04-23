import React from "react";
import { useTranslation } from "react-i18next";
import ShowLocale from '../showLocale/showLocale';

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
      <ShowLocale />
    </footer>
  );
};

export default Footer;
