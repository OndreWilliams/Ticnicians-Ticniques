import React from "react";
import "./Footer.css";

const Footer = () => {
  return(
    <div className="footerContainer">
      <div className="proLinks">
        <div className="about">
          Developed by,  Ondre Williams
        </div>
        <div >
          <a href="https://www.linkedin.com/in/ondre-williams-289b26132/" className="linkedin">
            <span className="socialLinks">
              linkedin
            </span>
          </a>
          <a href="https://github.com/OndreWilliams" className="github">
            <span className="socialLinks">
              github
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer;
