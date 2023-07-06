import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form, Spinner } from 'react-bootstrap'
import { useForgotPasswordMutation } from '../slices/userApiSlice';
import { toast } from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [forgotPassword,{isLoading}] = useForgotPasswordMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      // navigate("/");
      toast.success(res.data?.msg);
    } catch (error) {
      toast.error(error.data?.msg);
      console.log(error?.data?.msg || error.error);
    }
  };
  return (
    <FormContainer>
    <h3 className="text-center my-1">Reset Password</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="my-3">
   
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        ) :  (
          <>
          <Button variant="primary" type="submit">
            Submit
          </Button> 
        
          </>
        )}

      </div>
    </Form>

  
  </FormContainer>
  )
}
