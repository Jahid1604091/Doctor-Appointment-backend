import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../slices/userApiSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword({ password, token }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      navigate("/");
      toast.success("Password Reset Successfully!");
    } catch (error) {
      toast.error(error.data?.msg);
      console.log(error);
    }
  };
  return (
    <FormContainer>
      <h3 className="text-center my-1">Reset Password</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="text-center">
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
            <>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </>
          )}
        </div>
      </Form>
    </FormContainer>
  );
}
