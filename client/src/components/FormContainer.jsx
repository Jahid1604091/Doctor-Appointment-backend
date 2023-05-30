import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export default function FormContainer({ children }) {
  return (
    <Wrapper>
      <section className="section center">
        <Row>
          <Col md={6} className="mx-auto mt-5">
            {children}
          </Col>
        </Row>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.section`

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
  }
`;
