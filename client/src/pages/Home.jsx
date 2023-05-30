import React from "react";
import Layout from "../components/Layout";

import {  Card, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { useGetAllApprovedDoctorsQuery } from "../slices/userApiSlice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function Home() {
  const { data = [], isLoading, isFetching, isError  } = useGetAllApprovedDoctorsQuery();
  if (isError) return <Error/>
  if (isLoading) return <Loader/>

  return (
    <Layout>
      <Container>
        <Row>
          {data?.map((doctor, idx) => {
            return (
              <Col key={doctor._id} disabled={isFetching}>
                <Card className="card my-4">
                  <Card.Img
                    variant="top"
                    src="https://images.pexels.com/photos/4560086/pexels-photo-4560086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=500&dpr=1"
                    className="avatar"
                  />
                  <Card.Body>
                    <Card.Title>{doctor.user.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted text-uppercase">{doctor.expertise_in}</Card.Subtitle>
                    <Card.Text>
                     <span>Fee Per Visit (BDT) : {doctor.fee}</span>
                  
                    </Card.Text>
                    <Link to={`doctors/${doctor._id}`} className="btn">Appoint Now</Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
}

const Wrapper = styled.section`
  .card {
    .avatar {
      
    }
  }
`;
