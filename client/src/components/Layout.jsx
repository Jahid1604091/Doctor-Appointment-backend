import React, { useState } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { setCollapsed } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";

export default function Layout({ children }) {
  const { collapsedSidebar } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="d-flex justify-content-between">
        <div className={collapsedSidebar ? "collapsed-sidebar" : "sidebar"}>
          <Sidebar />
        </div>

        <div className={collapsedSidebar ? "main-collapsed" : "main"}>
          <div className="border">
            <span
              className="icon"
              onClick={() => dispatch(setCollapsed(!collapsedSidebar))}
            >
              {collapsedSidebar ? <MdMenuOpen /> : <FaTimes />}
            </span>
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .sidebar {
    width: 20vw;
  }
  .sidebar-collapsed {
    width: 5vw;
  }
  .main {
    width: 80vw;
    transition: var(--transition);
  }
  .main-collapsed {
    width: 95vw;
    transition: var(--transition);
  }
  .icon {
    font-size: 22px;
    background-color: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
    cursor: pointer;
  }
`;
