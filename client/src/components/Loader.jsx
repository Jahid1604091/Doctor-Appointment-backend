import React from "react";
import Layout from "./Layout";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export default function Loader() {
  return (
    <>
      <Wrapper>
        <Container>
          <Row>
            <Col>
              <div className="spinner d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  .spinner {
    margin-top: 10rem;
    font-size: 150px;
  }
`;
