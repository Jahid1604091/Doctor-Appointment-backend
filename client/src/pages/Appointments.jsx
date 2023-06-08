import React from "react";
import {
  useGetAllAppointmentsQuery,
  useGetAllApprovedDoctorsQuery,
} from "../slices/userApiSlice";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { BiTimeFive } from "react-icons/bi";
import Layout from "../components/Layout";
import NotFound from "../components/NotFound";

export default function Appointments() {
  const { data } = useGetAllAppointmentsQuery();
  const { data: doctors } = useGetAllApprovedDoctorsQuery();
  if (data?.length === 0) return <NotFound>No Appointment Found!</NotFound>;

  const associate_doctor = (doctorId) => {
    const user = doctors?.find((doc) => doc._id == doctorId);
    return user?.user.name;
  };

  return (
    <Layout>
      <h3>Appointments</h3> <hr />
      <Row>
      {data?.map((appointment) => {
        return (
          <Col key={appointment._id} md={4}>
            <Card className="card my-4">
              <Card.Body>
                <Card.Title>
                  {associate_doctor(appointment.doctor._id)}{" "}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-uppercase">
                  {appointment.doctor.expertise_in}
                </Card.Subtitle>
                <div>
                  <p>
                    Fee :{" "}
                    <span className="fw-bold">{appointment.doctor.fee}</span> TK
                  </p>{" "}
                  <p className="fw-light">
                    <BiTimeFive size={18} />{" "}
                    {moment(appointment.time).format("MMMM Do YYYY, h:mm a")}
                  </p>{" "}
                </div>
                <div className="text-center">
                  <Button
                    disabled
                    to={`doctors/${appointment._id}`}
                    className="btn-danger"
                  >
                    Cancel
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}

      </Row>
    </Layout>
  );
}
