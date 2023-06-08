import React, { useState } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { setCollapsed } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";
import { Col, Container, Row } from "react-bootstrap";

export default function Layout({ children }) {
  const { collapsedSidebar } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Container fluid>
        <Row>
          <Col md={collapsedSidebar ? 1 : 3}>
            <div
              className={`${
                collapsedSidebar ? "collapsed-sidebar" : "open-sidebar"
              }`}
            >
              <Sidebar />
            </div>
          </Col>

          <Col md={collapsedSidebar ? 11 : 9}>
            <div
              className={`main ${
                collapsedSidebar ? "open-main" : "collapsed-main"
              }`}
            >
              {children}
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
    
  .main {
    /* margin-right: auto; */
  }
  .open-main {
    transition: var(--transition);
    margin-top: 5rem;
   
  }
  .collapsed-sidebar {
   
    margin-top: 5rem;
    width: 60px;
  }
  .collapsed-main {
   
    margin-top: 5rem;

  }
  .open-sidebar {
    width: 20vw;
    transition: var(--transition);
    margin-top: 5rem;
  }

  @media screen and (max-width: 767px) {
    .main-collapsed {
      padding: 0 100px;
    }
    .main{
      margin-top: 1rem;
    }
  }
`;
