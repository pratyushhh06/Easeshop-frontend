import React, { useState } from "react";
import "./Navbar.css";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";

import { Link } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { toast } from "react-toastify";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../Context/cart";
import { Badge } from "antd";
import { CgDetailsMore } from "react-icons/cg";
import { Sheet } from "react-modal-sheet";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isAuth = localStorage.getItem("token");

  const [isOpen, setOpen] = useState(false);

  const handleViewMoreClick = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out Successfully");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleCloseSheet = () => {
    setOpen(false);
  };

  return (
    <div>
      <nav className="navbar-container">
        <div className="navbar-heading">
          <img
            className="shopease-image-navbar"
            src="https://i.pinimg.com/originals/ea/17/93/ea1793c74a64341275ede17a21a297ad.jpg"
            alt="shoplogo"
          />
        </div>

        <div className="hide-on-mobile navbar-middle">
          <ul className="nav-links">
            {["/", "/about", "/contact"].map((path, index) => (
              <li key={index}>
                <Link to={isAuth ? path : "/login"} className="nav-link">
                  {index === 0 && <AiOutlineHome className="nav-icon" />}
                  {index === 1 && <AiOutlineInfoCircle className="nav-icon" />}
                  {index === 2 && <AiOutlinePhone className="nav-icon" />}
                  {index === 0 ? "Home" : index === 1 ? "About" : "Contact"}
                </Link>
              </li>
            ))}
          </ul>
          <div className="search-container">
            <SearchInput />
          </div>
        </div>

        <div className="hide-on-mobile nav-options">
          <ul>
            {!auth?.user ? (
              <>
                <li>
                  <Link to="/login" className="nav-link-login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="nav-link-register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown" onClick={toggleDropdown}>
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    aria-expanded={dropdownOpen}
                  >
                    {auth?.user?.name}
                  </Link>
                  <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                    <li>
                      <Link
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li>
              <Badge count={cart?.length} showZero>
                <Link to="/cart" className="nav-link-cart">
                  Cart
                </Link>
              </Badge>
            </li>
          </ul>
        </div>

        <div onClick={handleViewMoreClick} className="viewmore">
          <CgDetailsMore />
        </div>

        <Sheet
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          style={{ height: "400px" }}
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              {/* Your sheet content (like navbar links and search) */}
              <div className="navbar-middle">
                <ul className="nav-links">
                  {["/", "/about", "/contact"].map((path, index) => (
                    <li key={index}>
                      <Link to={isAuth ? path : "/login"} className="nav-link">
                        {index === 0 && <AiOutlineHome className="nav-icon" />}
                        {index === 1 && (
                          <AiOutlineInfoCircle className="nav-icon" />
                        )}
                        {index === 2 && <AiOutlinePhone className="nav-icon" />}
                        {index === 0
                          ? "Home"
                          : index === 1
                          ? "About"
                          : "Contact"}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="search-container">
                  <SearchInput />
                </div>
              </div>

              {/* Auth Options */}
              <div className="nav-options">
                <ul>
                  {!auth?.user ? (
                    <>
                      <li>
                        <Link to="/login" className="nav-link-login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/register" className="nav-link-register">
                          Register
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className="nav-item dropdown"
                        onClick={toggleDropdown}
                      >
                        <Link
                          className="nav-link dropdown-toggle"
                          href="#"
                          role="button"
                          aria-expanded={dropdownOpen}
                        >
                          {auth?.user?.name}
                        </Link>
                        <ul
                          className={`dropdown-menu ${
                            dropdownOpen ? "show" : ""
                          }`}
                        >
                          <li>
                            <Link
                              to={`/dashboard/${
                                auth?.user?.role === 1 ? "admin" : "user"
                              }`}
                              className="dropdown-item"
                            >
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={handleLogout}
                              to="/login"
                              className="dropdown-item"
                            >
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </>
                  )}
                  <li>
                    <Badge count={cart?.length} showZero>
                      <Link
                        to="/cart"
                        style={{ textDecoration: "none" }}
                        className="nav-link-cart"
                      >
                        Cart
                      </Link>
                    </Badge>
                  </li>
                </ul>
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
      </nav>
    </div>
  );
};

export default Navbar;
