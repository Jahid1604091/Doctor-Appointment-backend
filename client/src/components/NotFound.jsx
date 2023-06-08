import React from "react";
import Layout from "./Layout";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export default function NotFound({children}) {
  return (
    <Layout>
      <Wrapper>
        <Container>
          <Row>
            <Col>
              <div className="NotFound text-center">
                <h3 className="text-danger p-2">404 !</h3>
                <h4>{children}</h4>
              </div>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.section`
  .NotFound {
    margin-top: 10rem;
    
  }
`;
