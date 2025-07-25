import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          MNNIT <span>Mess Management</span>
        </h3>
        <p className="footer-links">
          {/* <a href="#" className="link-1">
            Home
          </a>
          <a href="#">Blog</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <a href="#">Faq</a>
          <a href="#">Contact</a> */}
          <p>Teliyarganj,prayagraj,</p>
          <p>Uttarpradesh, India 🏳️‍🌈</p>
          <p>211004</p>
        </p>
        <p className="footer-company-name">Copy right reserved © 2024</p>
      </div>
      <div className="footer-center">
        <div>
          <h6>Email us:</h6>
          <p>
            <p>xxxxx@gmail.com</p>
          </p>
        </div>
        <div>
          <h6>Accountant Contact:</h6>
          <p>+1.555.555.5555</p>
        </div>
        <div>
          <div>
            <h6>Warden Contact:</h6>
            <p>+1.555.555.XXXX</p>
          </div>
          <div></div>
          <i className="fa fa-envelope" />
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>"Stay Connected with Campus Updates" </span>
          "Stay updated with the latest college events, announcements, and
          opportunities. Join our community to connect with fellow students,
          explore resources, and make the most of your college journey. Your
          success starts here!"
        </p>
        <div className="footer-icons">
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
