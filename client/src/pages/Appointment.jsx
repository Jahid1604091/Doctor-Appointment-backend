import React from 'react';
import Layout from '../components/Layout';
import { Link, useParams } from 'react-router-dom';
import { useGetDoctorByIdQuery } from '../slices/doctorApiSlice';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function Appointment() {
    const {id} = useParams();

    const {data} = useGetDoctorByIdQuery(id);

  return (
    <Layout>
        <Container>
            <Row>
                <Col>
                    <h2>Appointment</h2>
                    <hr />
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                  <Card>
                  <Card.Body>
                    <Card.Title>{data?.user.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted text-uppercase">{data?.expertise_in}</Card.Subtitle>
                    <Card.Text>
                     <span>Fee Per Visit (BDT) : {data?.fee}</span>
                    </Card.Text>
                    <Link to={`doctors/${data?._id}`} className="btn">Check Availability</Link>
                  </Card.Body>

                  </Card>
                </Col>
                
                <Col md={6}>
                  <Card>
                  <Card.Body>
                   
                    <Card.Title>Basic Info</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted text-uppercase">{data?.expertise_in}</Card.Subtitle>
                    <Card.Text>
                     <span>Fee Per Visit (BDT) : {data?.fee}</span>
                    </Card.Text>
                    
                  </Card.Body>

                  </Card>
                </Col>
                
            </Row>
        </Container>
    </Layout>
  )
}
