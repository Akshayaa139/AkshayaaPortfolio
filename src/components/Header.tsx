import React from "react";

const Header: React.FC = () => {
  return (
    <header className="header" id="header">
      <nav className="nav container">
        <div className="nav__logo">
          <span className="logo-text">Akshayaa</span>
        </div>

        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#home" className="nav__link active">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="#about" className="nav__link">
                About
              </a>
            </li>
            <li className="nav__item">
              <a href="#projects" className="nav__link">
                Projects
              </a>
            </li>
            <li className="nav__item">
              <a href="#experience" className="nav__link">
                Experience
              </a>
            </li>
            <li className="nav__item">
              <a href="#achievements" className="nav__link">
                Awards
              </a>
            </li>
            <li className="nav__item">
              <a href="#coding-profile" className="nav__link">
                Coding
              </a>
            </li>
            <li className="nav__item">
              <a href="#contact" className="nav__link">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="nav__toggle" id="nav-toggle">
          <i className="ri-menu-line"></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
