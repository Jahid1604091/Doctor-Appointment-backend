import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteProfileMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import Layout from "../components/Layout";

export default function Profile() {
  const {
    userInfo: { name, email, isDoctor },
  } = useSelector((state) => state.auth);

  const [deleteProfile, { isLoading }] = useDeleteProfileMutation();
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
      <Card>
        <Card.Img
          variant="top"
          src="https://images.pexels.com/photos/4560086/pexels-photo-4560086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=500&dpr=1"
        />
        <Card.Body>
          <Card.Title>
            <h2>{name}</h2>
            <span>{isDoctor ? 'Doctor' : ''}</span>
          </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{email}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Link to="/profile/edit">Edit Profile</Link> |
          <Link to="/profile" onClick={handleDelete}>
            Delete Profile
          </Link>
        </Card.Body>
      </Card>
    </Layout>
  );
}
