import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaGoogle,
  FaVimeoV,
} from "react-icons/fa";
import "./style.css";
const index = () => {
  return (
    <div className="footer-wrappper mt-5">
      <hr />
      <div className="container mt-4 ">
        <div className="row">
          <div className="mt-5 col-md-6">
            <p className="footer-heading">CONTACT</p>
            <p className="text-footer">
              Address: 1231 Domain Blvd, Austin, TX 78758, United State.
            </p>
            <p className="text-footer"> Phone: +9212345789</p>
            <p className="text-footer">Email:info@thejacker.com </p>
            <div className="d-flex">
              <span className="description-social-icon-wrapper">
                <FaTwitter className="description-social-icon" />
              </span>
              <span className="description-social-icon-wrapper">
                <FaFacebookF className="description-social-icon" />
              </span>
              <span className="description-social-icon-wrapper">
                <FaGoogle className="description-social-icon" />
              </span>
              <span className="description-social-icon-wrapper">
                <FaLinkedinIn className="description-social-icon" />
              </span>
              <span className="description-social-icon-wrapper">
                <FaVimeoV className="description-social-icon" />
              </span>
            </div>
          </div>
          <div className="mt-5 col-md-3">
            {" "}
            <p className="footer-heading">INFORMATION</p>
            <div className="footer-list  text-left">
              <ul>
                <li>Our Stories</li>
                <li>About Us</li>
                <li>Business With us</li>
                <li>Deliver Information</li>
                <li>Terms {"&"} Condition</li>
              </ul>
            </div>
          </div>
          <div className="mt-5 col-md-3 ">
            {" "}
            <p className="footer-heading">HELP</p>
            <div className="footer-list  text-left">
              <ul>
                <li>Contact Us</li>
                <li>Track Order</li>
                <li>F.A.Q </li>
                <li>Privacy Policy</li>
                <li>Return</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-5">
          © 2021 Designed by The Jacker.All Copyrights Reserved
        </p>
      </div>
    </div>
  );
};

export default index;
