import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// styling
import "../style/Navbar.css";


const Navbar = () => {
  let [currentTime, setCurrentTime] = useState("");
  let [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    let date = new Date();

    let monthDay = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    setCurrentDate(`${monthDay}/${month}/${year}`);
  }, []);

  const updateFn = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };

  setInterval(updateFn, 1000);

  const open_navbar = () => {
    let mobileNavbar = document.querySelector(".mobile_navbar");
    let body = document.querySelector("body");
    if (mobileNavbar.style.transform === "scale(0)") {
      mobileNavbar.style.transform = "scale(1.5)";
      body.style.overflow = "hidden";
    } else {
      mobileNavbar.style.transform = "scale(0)";
      body.style.overflowY = "auto";
    }
  };

  return (
    <section className="Navbar">
      <div className="logo">
        <h1>WTanker History</h1>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/">HOME</NavLink>
          </li>
          <li>
            <NavLink to="History">HISTORY</NavLink>
          </li>
        </ul>
      </nav>

      <div className="date_time">
        <div className="date">
          <h4>Date: {currentDate}</h4>
        </div>

        <div className="time">
          <h4>Time: {currentTime}</h4>
        </div>
      </div>

      <div className="hamburger" onClick={open_navbar}>
        <i className="fa-solid fa-bars"></i>
      </div>

      <div className="mobile_navbar">
        <div className="center">
          <div className="mob_hamburger" onClick={open_navbar}>
            <i className="fa-solid fa-xmark"></i>
          </div>

          <ul>
            <li>
              <NavLink to="/" onClick={open_navbar}>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="History" onClick={open_navbar}>
                HISTORY
              </NavLink>
            </li>
          </ul>

          <div className="mobile_date_time">
            <div className="date">
              <h4>Date: {currentDate}</h4>
            </div>

            <div className="time">
              <h4>Time: {currentTime}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
