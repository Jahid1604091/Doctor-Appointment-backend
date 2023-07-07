import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useApproveAppointmentMutation } from "../slices/doctorApiSlice";
import { toast } from "react-hot-toast";

export default function ApproveModal({ show, setShow, id }) {
  const handleClose = () => setShow(false);
  const [approveAppointment, { isLoading }] = useApproveAppointmentMutation();
  const [placeType, setPlaceType] = useState("online");
  const [place, setPlace] = useState("http://zoom/543656");

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const { data } = await approveAppointment({ place, placeType, id });
    handleClose();
    toast.success(data.msg)
   } catch (error) {
    toast.error(error?.data?.msg);
   }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter Meeting Place Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Appointment Place Type"
              value={placeType}
              onChange={(e) => setPlaceType(e.target.value)}
              autoFocus
            />
            <Form.Label>Enter Meeting Place Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Appointment Place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              autoFocus
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
