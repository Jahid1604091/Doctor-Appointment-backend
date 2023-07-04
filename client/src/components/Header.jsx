import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GrNotification } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { links } from "../data";
import logo from "/logo.png";
import { toast } from "react-hot-toast";
function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/login");
      toast("Logged Out !");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Wrapper>
      <nav>
        <div className="nav-center">
          <div className="nav-header d-flex justify-content-between">
            <Link to="/">
              {" "}
              <img src={logo} alt="" className="logo" />
            </Link>
            <Link to="/">
              {" "}
              <h3>Doctor Portal</h3>
            </Link>
            {userInfo && (
              <button
                className="nav-toggle"
                onClick={() => setShowLinks(!showLinks)}
              >
                <FaBars />
              </button>
            )}
          </div>
          <div className="links-container" ref={linksContainerRef}>
            <ul className="links" ref={linksRef}>
              {userInfo && (
                <>
                  <li> {userInfo?.name}</li>
                  <li className="notification-icon">
                    <Link to="/notifications">
                      <GrNotification />{" "}
                      <span className="notification-number">
                        {userInfo?.unseenNotifications
                          ? userInfo?.unseenNotifications.length
                          : 0}
                      </span>
                    </Link>
                  </li>

                  <li>
                    <a href="#" onClick={logoutHandler}>
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  nav {
    background: var(--clr-white);
    box-shadow: var(--light-shadow);
    position: fixed;
    width: 100vw;
    z-index: 999;
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }
  .nav-toggle {
    font-size: 1.5rem;
    color: var(--clr-primary-5);
    background: transparent;
    border-color: transparent;
    transition: var(--transition);
    cursor: pointer;
  }
  .nav-toggle:hover {
    color: var(--clr-primary-1);
    transform: rotate(90deg);
  }
  .logo {
    height: 40px;
  }
  .links {
    text-align: center !important;
  }
  .links a {
    color: var(--clr-grey-3);
    font-size: 1rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    display: block;
    padding: 0.5rem 1rem;
    transition: var(--transition);
  }
  .links a:hover {
    background: var(--clr-primary-8);
    color: var(--clr-primary-5);
    padding-left: 1.5rem;
  }

  .links-container {
    height: 0;
    overflow: hidden;
    transition: var(--transition);

    .notification-icon {
      position: relative;
      .notification-number {
        color: var(--clr-primary-2);
        position: absolute;
        top: -3px;
      }
    }
  }
  .show-container {
    height: 10rem;
  }
  @media screen and (min-width: 800px) {
    .nav-center {
      max-width: 1170px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
    }
    .nav-header {
      padding: 0;
    }
    .nav-toggle {
      display: none;
    }
    .links-container {
      height: auto !important;
    }
    .links {
      display: flex;
    }
    .links a {
      padding: 0;
      margin: 0 0.5rem;
    }
    .links a:hover {
      padding: 0;
      background: transparent;
    }
  }
`;

export default Header;
