import React from "react";
import Layout from "./Layout";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export default function Fetching() {
  return (
    <Layout>
      <Wrapper>
        <Container>
          <Row>
            <Col>
              <div className="fetching d-flex justify-content-center">
                <h3>Fetching Data...</h3>
              </div>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.section`
  .fetching {
    margin-top: 10rem;
    
  }
`;
