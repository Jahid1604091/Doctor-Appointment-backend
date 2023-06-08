import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormContainer from "../components/FormContainer";
import { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ email, password, name }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      navigate("/");
      toast.success('Successfully added!')
    } catch (error) {
      toast.error(error.data?.msg);
      // console.log(error?.data?.message || error.error);
    }
  };
  return (
    <FormContainer>
      <h3 className="text-center my-1">Register</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {isLoading ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
      </Form>

      <Row>
        <Col>
          <p>
            Already a Customer ? <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Register;
