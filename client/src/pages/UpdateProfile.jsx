import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormContainer from "../components/FormContainer";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useUpdateProfileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function UpdateProfile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const {userInfo} = useSelector(state=>state.auth);
 
  useEffect(()=>{
      setName(userInfo?.name)
      setEmail(userInfo?.email)
  },[userInfo]);

  const [updateProfile,{isLoading}] = useUpdateProfileMutation();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(password !== confirmPassword){
        console.log(`Password doesn't match`);
    }
    else{

        try {
            const res = await updateProfile({_id:userInfo?._id,name,email,password}).unwrap();
            dispatch(setCredentials({...res.data}));
            
        } catch (error) {
            console.log(error?.data?.message || error.error);
        }
    }
    setPassword('');
    setConfirmPassword('');
}
  return (
    <FormContainer>
        <h2>Update Profile</h2>
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
          autoComplete="off"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        {
        isLoading ? <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Updating...
      </Button> :
       <Button variant="primary" type="submit">
       Update
     </Button>
    }
      </Form>

      
    </FormContainer>
  );
}

export default UpdateProfile;
