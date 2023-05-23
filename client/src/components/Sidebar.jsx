import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaTachometerAlt, FaAdn, FaBuffer } from "react-icons/fa";
import { useSelector } from "react-redux";
export default function Sidebar() {
    const {pathname} = useLocation();
    const { collapsedSidebar } = useSelector((state) => state.app);
    
  const items = [
    {
      id: 1,
      text: "Home",
      path: "/",
      icon: <FaTachometerAlt />,
    },
    {
      id: 2,
      text: "Appoint a doctor",
      path: "/appoint-doctor",
      icon: <FaAdn />,
    },
    {
      id: 3,
      text: "profile",
      path: "/profile",
      icon: <FaBuffer />,
    },
  ];
  return (
    <Wrapper>
      <Container>
        <Row>
          <Col>
            <ul>
              {items.map((item) => {
              
                return (
                  <li key={item.id} className={pathname === item.path ? 'active-menu' : ''}>
                    <Link to={item.path}>
                      {item.icon} {!collapsedSidebar && item.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  height: 90vh;
  background-color: var(--clr-primary-2);
  color: var(--clr-primary-10);

  ul {
    margin-top: 40px;
    li {
      margin: auto;
      padding: 10px;
      text-transform: capitalize;
      font-size: 16px;
    }
    .active-menu{
      border-bottom:1px solid var(--clr-black);
      background-color: var(--clr-primary-1);
      color: var(--clr-primary-1);
      padding: 5px;
    }
  }

  a {
    color: var(--clr-primary-10);
  }
`;
