import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import {
  useCheckAvailabilityMutation,
  useGetDoctorByIdQuery,
} from "../slices/doctorApiSlice";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import moment from "moment";
import { DatePicker, TimePicker } from "antd";
import { useSelector } from "react-redux";
import { useNewAppointmentMutation } from "../slices/userApiSlice";
import styled from "styled-components";
import { toast } from "react-hot-toast";

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
  const [available, setAvailable] = useState(false);

  const onTimeChange = (time) => {
    setTime(time);
  };

  const handleNewAppoint = async (e) => {
    e.preventDefault();
    const {data} =await newAppointment({ doctor: id, user: userInfo._id, date, time });
    if(data.success){
      toast.success('Appointment Done ! Wait for Doctor respond');
      setAvailable(false);
    }
    else{
      toast.error('Something Wrong!');
      setAvailable(false);
    }
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    if(!time || !date){
      toast.error('Please Select Time and Date');
    }
    else{
      const {data,error} = await checkAvailability({
        doctor: id,
        user: userInfo._id,
        date,
        time,
      });
      
      if (data) {
        toast.success(data?.msg)
        setAvailable(true);
      }
      else{
        toast.error(error?.data?.msg)
        setAvailable(false);
      }
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Container>
          <Row>
            <Col>
              <h3>Appointment</h3>
              <hr />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card className="text-center mb-2">
                <Card.Body>
                  <Card.Title className="text-uppercase">
                    Appointment Schedule
                  </Card.Title>
                  <div className="text-muted">{timings}</div> <br />
                  <div className="py-1 my-1">
                    <DatePicker
                      className="rounded-0"
                      onChange={(v) => setDate(v)}
                      required
                    />{" "}
                    <TimePicker
                      className="my-1 rounded-0"
                      use12Hours format="h:mm a" 
                      onChange={onTimeChange}
                      required
                    />{" "}
                    <br />
                    <div className="btn-group btn-group-sm my-2">
                      {!available && (
                        <Button
                          type="submit"
                          className="btn"
                          onClick={handleCheck}
                        >
                          Check Availability
                        </Button>
                      )}
                      {available && (
                        <Button
                          type="submit"
                          className="btn"
                          onClick={handleNewAppoint}
                        >
                          Appoint Now
                        </Button>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="text-center p-1">
                <Image
                  src="https://images.pexels.com/photos/4560086/pexels-photo-4560086.jpeg?auto=compress&cs=tinysrgb&w=171&h=180&dpr=1"
                  roundedCircle
                />
                <Card.Body>
                  <h4 className="text-uppercase"> {data?.user.name}</h4>
                  <Card.Subtitle className="mb-2 text-muted text-capitalize fw-bold">
                    {data?.expertise_in}
                  </Card.Subtitle>
                  <Card.Text>
                    <span>Fee Per Visit (BDT) : {data?.fee}</span> <br />
                    <span>Degree : </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.section`
  img {
    height: 190px;
    width: 200px;
    margin: 0 auto;
    box-shadow: var(--dark-shadow) !important;
  }
`;
