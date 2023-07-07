import moment from "moment";
import React, { useState } from "react";
import { Button, Card, Col, Tab, Tabs } from "react-bootstrap";
import { BiTimeFive } from "react-icons/bi";
import { useDeleteAppointmentMutation } from "../slices/userApiSlice";
import ApproveModal from "./ApproveModal";

export default function AppointmentsAsDoctor({ data, associate_doctor }) {
  const [activeTab, seActiveTab] = useState("As Doctor");
  const [deleteAppointment, { data: deletedAppointment }] =
    useDeleteAppointmentMutation();

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const approveAppointmentHandler = (id) => {
    setShow(true);
    setSelectedId(id);
    //status will be approved and zoom link will be send via email
    //cancel button will be removed from doctor side
  };

  const payForAppointment = id =>{

  }
  return (
    <div>
      <ApproveModal show={show} setShow={setShow} id={selectedId} />

      <Tabs
        defaultActiveKey={activeTab}
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="As Doctor" title="As Doctor">
          {data?.doctor?.map((appointment) => {
            return (
              <Col key={appointment._id} md={4}>
                <Card className="card my-4">
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between">
                      <span>
                        {" "}
                        {appointment.patientName} <small>(patient)</small>
                      </span>{" "}
                      <p className={`badge bg-${appointment.status === 'approved' ? 'success' : 'primary'} text-wrap`}>
                        {appointment.status}
                      </p>{" "}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted text-uppercase">
                      {/* {appointment.doctor.expertise_in} */}
                    </Card.Subtitle>
                    <div>
                      <p className="fw-light">
                        <BiTimeFive size={18} />{" "}
                        {moment(appointment.time).format("hh:mm a")},{" "}
                        {appointment.date}
                      </p>{" "}
                    </div>

                    <div className="text-center">
                      <div
                        className="btn-group btn-group-sm"
                        role="group"
                        aria-label="Basic example"
                      >
                        {appointment.status === "pending" &&
                          !appointment.isPaid && (
                            <>
                            <button
                              type="button"
                              onClick={() => deleteAppointment(appointment._id)}
                              className="btn btn-danger"
                            >
                              Cancel
                            </button>
                          
                            
                            </>
                          )}
                        {appointment.status === "pending" &&
                          appointment.isPaid && (
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() =>
                                approveAppointmentHandler(appointment._id)
                              }
                            >
                              Approve
                            </button>
                          )}
                      </div>
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
                      <div className="d-flex justify-content-between">
                        {associate_doctor(appointment.doctor._id)}{" "}
                        <p className="badge bg-primary text-wrap">
                          {appointment.status}
                        </p>
                      </div>
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
                     {!appointment.isPaid && <Button
                        onClick={() => deleteAppointment(appointment._id)}
                        className="btn-danger"
                      >
                        Cancel
                      </Button>}
                     {!appointment.isPaid &&  <Button
                        onClick={() => payForAppointment(appointment._id)}
                        className="btn-primary"
                      >
                        Pay Now
                      </Button>}
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
