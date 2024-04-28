import React from "react";
import { LinkedinShareButton, LinkedinIcon } from "react-share";

function LinkedInButton() {
  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
    margin: "20px auto",
    background: "#0077B5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    textDecoration: "none",
    width: "fit-content",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };

  // Retrieving calculatedSSP from local storage
  const calculatedSSP =
    localStorage.getItem("calculatedSSP") || "Default summary if none found.";

  // Content to share
  const shareUrl = window.location.href; // URL of the page
  const title = "Check out my Kayaquiz carbon trajectory !"; // Title for the LinkedIn post
  const summary =
    "My projections of GDP, population and pace of dacarbonization lead me to " +
    calculatedSSP; // Summary or description retrieved from local storage

  return (
    <div style={containerStyle}>
      <LinkedinShareButton
        style={buttonStyle}
        url={shareUrl}
        title={title}
        summary={summary}
      >
        <LinkedinIcon size={32} round={true} />
        <span style={{ marginLeft: "8px" }}>Share on LinkedIn!</span>
      </LinkedinShareButton>
    </div>
  );
}

export default LinkedInButton;
