import moment from "moment";
import React, { useState } from "react";
import { Button, Card, Col, Tab, Tabs } from "react-bootstrap";
import { BiTimeFive } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDeleteAppointmentMutation } from "../slices/userApiSlice";



export default function AppointmentsAsDoctor({ data, associate_doctor }) {

  const [activeTab, seActiveTab] = useState("As Doctor");
  const [deleteAppointment,{data:deletedAppointment}] = useDeleteAppointmentMutation();
  return (
    <div>
      <Tabs
        defaultActiveKey={activeTab}
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="As Doctor" title="As Doctor">
        {data?.doctor.map((appointment) => {
            return (
              <Col key={appointment._id} md={4}>
                <Card className="card my-4">
                  <Card.Body>
                    <Card.Title>
                      {appointment.patientName}{" "}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted text-uppercase">
                      {/* {appointment.doctor.expertise_in} */}
                    </Card.Subtitle>
                    <div>
                      <p>
                     
                       
                          {appointment.status === 'pending' && appointment.status}
                     
                        
                      </p>{" "}
                      <p className="fw-light">
                        <BiTimeFive size={18} />{" "}
                        {moment(appointment.time).format("hh:mm a")},{" "}
                        {appointment.date}
                      </p>{" "}
                    </div>
                    <div className="text-center">
                    <Button
                  onClick={()=>deleteAppointment(appointment._id)}
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
        </Tab>

        <Tab eventKey="As Patient" title="As Patient">
          {data?.user.map((appointment) => {
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
                        <span className="fw-bold">
                          {appointment.doctor.fee}
                        </span>{" "}
                        TK
                      </p>{" "}
                      <p className="fw-light">
                        <BiTimeFive size={18} />{" "}
                        {moment(appointment.time).format("hh:mm a")},{" "}
                        {appointment.date}
                      </p>{" "}
                    </div>
                    <div className="text-center">
                    <Button
                  onClick={()=>deleteAppointment(appointment._id)}
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
        </Tab>
      </Tabs>
    </div>
  );
}
