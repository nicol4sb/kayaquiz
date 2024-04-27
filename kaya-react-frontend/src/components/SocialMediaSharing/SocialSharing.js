import React from 'react';
import { LinkedinShareButton, LinkedinIcon } from 'react-share';

function LinkedInButton() {
  const buttonStyle = {
    display: 'flex',         // Enables flexbox for internal alignment
    alignItems: 'center',    // Centers items vertically in the button
    justifyContent: 'center', // Centers items horizontally in the button
    height: '50px',           // Set a height for the button area
    margin: '20px auto',      // Centers the button horizontally with auto margins
    background: '#0077B5',    // LinkedIn brand color for background
    color: 'white',           // White text color
    border: 'none',           // No borders
    borderRadius: '8px',      // Rounded corners
    padding: '10px 20px',     // Padding inside the button
    fontSize: '16px',         // Font size
    cursor: 'pointer',        // Cursor to pointer on hover
    textDecoration: 'none',   // No underline on the text
    width: 'fit-content',     // Adjust width to fit its content
  };

  const containerStyle = {
    display: 'flex',          // Enable flexbox
    justifyContent: 'center', // Center content horizontally
    width: '100%',            // Take full width to allow centering
  };

  return (
    <div style={containerStyle}> {/* Flex container to center the button */}
      <LinkedinShareButton style={buttonStyle} url={window.location.href} >
        <LinkedinIcon size={32} round={true} />
        <span style={{ marginLeft: '8px' }}>Share on LinkedIn!</span>
      </LinkedinShareButton>
    </div>
  );
}

export default LinkedInButton;
