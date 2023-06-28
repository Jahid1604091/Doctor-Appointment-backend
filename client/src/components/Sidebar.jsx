import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaTachometerAlt, FaAdn, FaBuffer, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCollapsed } from "../slices/appSlice";
import { MdMenuOpen } from "react-icons/md";
export default function Sidebar() {
  const { pathname } = useLocation();
  const { collapsedSidebar } = useSelector((state) => state.app);
  const {
    userInfo: { role,isDoctor },
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const userMenu = [
    {
      id: 1,
      text: "Home",
      path: "/",
      icon: <FaTachometerAlt />,
    },
    {
      id: 2,
      text: "Appointments",
      path: "/booked-appointments",
      icon: <FaAdn />,
    },
    {
      id: 3,
      text: "Apply as doctor",
      path: "/apply-as-doctor",
      icon: <FaAdn />,
    },
    {
      id: 4,
      text: "profile",
      path: "/profile",
      icon: <FaBuffer />,
    },
  ];

  const doctorMenu = [
    {
      id: 1,
      text: "Home",
      path: "/",
      icon: <FaTachometerAlt />,
    }, {
      id: 2,
      text: "Appointments",
      path: "/booked-appointments",
      icon: <FaAdn />,
    },

    {
      id: 3,
      text: "profile",
      path: "/profile",
      icon: <FaBuffer />,
    },
  ];

  const adminMenu = [
    {
      id: 1,
      text: "Home",
      path: "/",
      icon: <FaTachometerAlt />,
    },
    {
      id: 2,
      text: "doctors",
      path: "/admin/doctors",
      icon: <FaAdn />,
    },
    {
      id: 3,
      text: "users",
      path: "/admin/users",
      icon: <FaAdn />,
    },
    {
      id: 4,
      text: "profile",
      path: "/profile",
      icon: <FaBuffer />,
    },
  ];

  const menuToRender =
    role === "user" && !isDoctor ? userMenu : role === "admin" ? adminMenu : doctorMenu;

  return (
    <Wrapper>
      <aside>
        <div
          className="icon"
          onClick={() => dispatch(setCollapsed(!collapsedSidebar))}
        >
          {collapsedSidebar ? <MdMenuOpen /> : <FaTimes />}
        </div>
        <ul className="links">
          {menuToRender.map((item) => {
            return (
              <li key={item.id}>
                <Link to={item.path}>
                  <span
                    className={
                      pathname === item.path ? "p-1 active-menu" : "p-1"
                    }
                  >
                    {item.icon}{" "}
                    {!collapsedSidebar && (
                      <span className="menu-text">{item.text}</span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  aside {
    height: 85vh;
    background-color: var(--clr-primary-2);
    color: var(--clr-primary-10);

    /* position: fixed; */
    z-index: 1;
    left: 0;

    /* padding: 20px; */

    .icon {
      /* position: absolute; */
      right: 0;
      top: 0;
      z-index: 99999999;
      font-size: 22px;
      background-color: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
      cursor: pointer;
    }
  }

  ul {
    margin-top: 2rem;
    .active-menu {
      background-color: var(--clr-primary-1);
      color: var(--clr-primary-10);
      transition: var(--transition);
    }
  }
  .links a {
    color: var(--clr-primary-10);
    font-size: 0.8rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    display: block;
    padding: 0.5rem 1rem;
    transition: var(--transition);
  }
  .links a:hover {
    color: var(--clr-primary-5);
  }

  /* .open-sidebar {
    width: 100%;
  }
  .sidebar-collapsed {
    width: 100px;
    margin: auto;
  } */

  @media screen and (max-width: 767px) {
    aside {
      width: 95vw;
      height: 8vh;
      text-align: center;
    }
    .links {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      display: inline-block;
      text-align: center;
      li {
        float: left;

        li a {
          display: block;
          color: white;
          text-align: center;
          padding: 16px;
          text-decoration: none;
        }
      }
    }
    .menu-text,
    .icon {
      display: none;
    }
  }
`;
