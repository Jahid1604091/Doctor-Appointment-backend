import React, { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteProfileMutation } from "../slices/userApiSlice";
import { useGetDoctorDetailsByUserIdQuery } from "../slices/doctorApiSlice";
import { logout } from "../slices/authSlice";
import Layout from "../components/Layout";
import { FaMailBulk } from "react-icons/fa";
import styled from "styled-components";

import ProfileComplete from "../components/ProfileComplete";

export default function Profile() {
  const {
    userInfo: { _id, name, email, isDoctor, isComplete,avatar },
  } = useSelector((state) => state.auth);

  const [deleteProfile, { isLoading }] = useDeleteProfileMutation();
  const {data} = useGetDoctorDetailsByUserIdQuery(_id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteProfile();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error?.data?.message || error.error);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Row>
          <Col md={6} className="mx-auto">
            <Card className="text-center">
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  margin: "auto",
                }}
                src={avatar?.url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiF_OQ_-RS1ksidGVXXFQ-nJehHFxbHfIoQ&usqp=CAU'}
                alt={name}
              />
              <Card.Body>
                <Card.Title>
                  <h3>{name}</h3>
                  <span>{isDoctor ? "Doctor" : ""}</span>
                </Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  {" "}
                  <h6>
                    {" "}
                    <span className="text-primary">
                      {" "}
                      <FaMailBulk />{" "}
                    </span>{" "}
                    {email}
                  </h6>{" "}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
               {isComplete && <Link
                  to="/profile/edit"
                  className="btn bg-secondary text-light p-1"
                >
                  Edit Profile
                </Link>}
                &nbsp;
                <Link
                  to="/profile"
                  className="btn bg-danger text-light p-1"
                  onClick={handleDelete}
                >
                  Delete Profile
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            {/* if profile not complete */}
           
            {!isComplete && <ProfileComplete />}
            {isDoctor && (
              <>
                <h3>Professional Information</h3>
                {data && (
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      {" "}
                      Specialize In : {data[0]?.expertise_in}
                    </ListGroup.Item>
                    <ListGroup.Item>Visit: {data[0]?.fee} Tk</ListGroup.Item>
                    <ListGroup.Item>
                      Experiences : {data[0]?.experience} Years
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Contact No: {data[0]?.phone}
                    </ListGroup.Item>
                  </ListGroup>
                )}
              </>
            )}
            {/* if complete then */}
          </Col>
        </Row>
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.section`
  .btn {
    transition: var(--transition);
    /* color: var(--clr-red-dark); */
    cursor: pointer;
    &:hover {
      /* color: var(--clr-red-light); */
    }
  }
`;
