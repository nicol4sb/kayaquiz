import React from 'react';
import { LinkedinShareButton, LinkedinIcon } from 'react-share';

function LinkedInButton() {
  // Getting the current page URL
  const currentUrl = window.location.href;

  // Define the title and summary for the LinkedIn share
  const title = "Check out this page!";
  const summary = "Here's some interesting content I wanted to share with you.";

  return (
    <div>
      <LinkedinShareButton url={currentUrl} title={title} summary={summary}>
        <LinkedinIcon size={48} round />
      </LinkedinShareButton>
    </div>
  );
}

export default LinkedInButton;
