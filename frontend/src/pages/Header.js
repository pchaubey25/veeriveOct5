import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import '../html/css/bootstrap.min.css';
import '../html/css/swiper-bundle.min.css';
import '../html/css/main.css';

import logoDark from '../html/images/svgs/logo-dark.svg';
import pulseIcon from '../html/images/svgs/pulse.svg';
import thinkTankIcon from '../html/images/svgs/think-tank.svg';

export default function Header () {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const navigate = useNavigate();  // Add useNavigate hook
  const { handleLogout } = useContext(AuthContext);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);  // Navigate to the specified path
    handleClose();
  };

  return (
    <>
      <header id="header">
        <div className="container">
          <div className="row align-items-center my-2">
            <div className="col-xl-3 col-6 col-md-6 col-lg-3 order-1 order-lg-1">
              <a href="index.html">
                <img src={logoDark} alt="Veerive Insights" />
              </a>
            </div>
            <div className="col-xl-6 order-3 order-lg-2 col-lg-6">
              <ul className="navigation">
                <li onClick={() => handleMenuItemClick('/home-feed')}>
                  Pulse Today
                </li>
                <li>
                  Think Tank
                  <ul>
                    <li onClick={() => handleMenuItemClick('/think-tank/influencer-comment')}>
                      Influencer Comment
                    </li>
                    <li onClick={() => handleMenuItemClick('/think-tank/reports')}>
                      Reports
                    </li>
                    <li onClick={() => handleMenuItemClick('/think-tank/interviews')}>
                      Interviews
                    </li>
                    <li onClick={() => handleMenuItemClick('/think-tank/infographics')}>
                      Infographics & Statistics
                    </li>
                  </ul>
                </li>
                <li>
                  Analyzer
                  <ul>
                    <li onClick={() => handleMenuItemClick('/analyzer/sector')}>
                      Sector Analyzer
                    </li>
                    <li onClick={() => handleMenuItemClick('/analyzer/company')}>
                      Company Analyzer
                    </li>
                    <li onClick={() => handleMenuItemClick('/analyzer/trend')}>
                      Trend Analyzer
                    </li>
                  </ul>
                </li>
                <li onClick={() => handleMenuItemClick('/dashboard')}>
                  My Dashboard
                </li>
              </ul>
            </div>
            <div className="col-xl-3 col-6 col-md-6 col-lg-3 text-end order-2 order-lg-3">
              <span className="searchIcon cursorPointer transition me-3">
                <i className="fa fa-magnifying-glass"></i>
              </span>
              <span
                className="buttonStyle cursorPointer transition"
                data-bs-toggle="modal"
                data-bs-target="#registerPopup"
              >
                Get Started
              </span>
              
            </div>
          </div>
          <br/>
          <div>
            <input
              type="button"
              value="Logout"
              onClick={handleLogout}
            />
          </div>
        </div>
      </header>
    </>
  );
}
