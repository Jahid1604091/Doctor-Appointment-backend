import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import {
  useCheckAvailabilityMutation,
  useGetDoctorByIdQuery,
} from "../slices/doctorApiSlice";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import moment from "moment";
import { DatePicker, TimePicker } from "antd";
import { useSelector } from "react-redux";
import { useNewAppointmentMutation } from "../slices/userApiSlice";

export default function Appointment() {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { data } = useGetDoctorByIdQuery(id);
  const [checkAvailability] = useCheckAvailabilityMutation();
  const [newAppointment] = useNewAppointmentMutation();

  const timings = `${moment(data?.timings[0]).format("HH:MM a")} - ${moment(
    data?.timings[1]
  ).format("HH:MM a")}`;

  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const onTimeChange = (time) => {
    setTime(time);
  };

  const handleNewAppoint = async (e) => {
    e.preventDefault();
    await newAppointment({ doctor: id, user: userInfo._id, date, time });
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    await checkAvailability({ doctor: id, user: userInfo._id, date, time });
    // await handleNewAppoint();
  };

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
                <Card.Subtitle className="mb-2 text-muted text-uppercase">
                  {data?.expertise_in}
                </Card.Subtitle>
                <span>Fee Per Visit (BDT) : {data?.fee}</span>
                <div>Timings :{timings}</div> <br />
                <div>
                  <DatePicker
                    className="my-1"
                    onChange={(v) => setDate(v)}
                  />{" "}
                  <TimePicker
                    className="my-1"
                    format="hh:mm a"
                    onChange={onTimeChange}
                  />
                  <Button type="submit" className="btn my-2" onClick={handleCheck} >
                    Check Availability
                  </Button>
                  <Button type="submit" className="btn" onClick={handleNewAppoint}>
                    Appoint Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Basic Info</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-uppercase">
                  {data?.expertise_in}
                </Card.Subtitle>
                <Card.Text>
                  <span>Fee Per Visit (BDT) : {data?.fee}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
