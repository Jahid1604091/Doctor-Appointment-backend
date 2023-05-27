import React, { useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRegisterAsDoctorMutation } from "../slices/userApiSlice";
import { Space, TimePicker } from "antd";
import moment from "moment/moment";
export default function ApplyAsDoctor() {
  const { userInfo } = useSelector((state) => state.auth);
  const [registerAsDoctor, { isLoading, isError, error }] =
    useRegisterAsDoctorMutation();
  const [info, setInfo] = useState({
    phone: "",
    expertise_in: "",
    experience: "",
    fee: "",
  });

  const [startTime,setStartTime] = useState();
  const [endTime,setEndTime] = useState();
  
  const [timeRange, setTimeRange] = useState();

  const onTimeChange = (time, timeString) => {
    setTimeRange(time);
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerAsDoctor({
      ...info,
      timings:timeRange,
      email: userInfo?.email,
    });
    // console.log({...info,timeRange});
    //set alert
  };
  return (
    <Wrapper>
      <Layout>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Enter phone no"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Expertise In</Form.Label>
                <Form.Control
                  type="text"
                  name="expertise_in"
                  onChange={handleChange}
                  placeholder="Enter your expertise area"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Select Time Range</Form.Label>
                <TimePicker.RangePicker
                  use12Hours
                  format="h:mm a"
                  name="time"
                  onChange={onTimeChange}
                />
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="date"
                  name="end_time"
                  onChange={handleChange}
                />
              </Form.Group> */}
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  type="number"
                  name="experience"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Fee</Form.Label>
                <Form.Control type="text" name="fee" onChange={handleChange} />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Layout>
    </Wrapper>
  );
}

const Wrapper = styled.section``;
