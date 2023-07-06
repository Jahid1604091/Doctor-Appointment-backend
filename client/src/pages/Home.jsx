import React from "react";
import Layout from "../components/Layout";
import { Card, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { useGetAllApprovedDoctorsQuery } from "../slices/userApiSlice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Fetching from "../components/Fetching";
import NotFound from "../components/NotFound";

export default function Home() {
  const {
    data=[],
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllApprovedDoctorsQuery();

  if (isError) return <Error error={error} />;
  if (data.length === 0) return <NotFound>No Approved Doctor Found!</NotFound>;
  if (isLoading) return <Loader />;
  if (isFetching) return <Fetching />;


  return (
    <Layout>
      <Wrapper>
        <Container>
          <Row className="">
            {data?.map((doctor) => {
              return (
                <Col sm={4} key={doctor._id}>
                  <div disabled={isFetching}>
                    <Card className="card mb-3">
                      <Card.Img
                        variant="top"
                        src={doctor?.user?.avatar?.url || "https://images.pexels.com/photos/4560086/pexels-photo-4560086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=500&dpr=1"}
                        className="avatar"
                      />
                      <Card.Body>
                        <Card.Title>{doctor?.user?.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted text-uppercase">
                          {doctor?.expertise_in}
                        </Card.Subtitle>
                        <Card.Text>
                          <span>Fee Per Visit (BDT) : {doctor?.fee}</span>
                        </Card.Text>
                        <div className="text-center">
                          <Link to={`doctors/${doctor?._id}`} className="btn btn-primary">
                            Appoint Now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.section`
  .card {
    .avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin: auto;
    }
  }
`;
