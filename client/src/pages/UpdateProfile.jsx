import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormContainer from "../components/FormContainer";
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MiniLoader from "../components/MiniLoader";

function UpdateProfile() {
  const { userInfo } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState({});
  const [url, setUrl] = useState(userInfo?.avatar?.url);
  const [name, setName] = useState(userInfo?.name);
  const [city, setCity] = useState(userInfo?.address?.city);
  const [state, setState] = useState(userInfo?.address?.state);
  const [zip, setZip] = useState(userInfo?.address?.zip);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateProfile, { isLoading: isLoadingProfileUpdate }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  const uploadAvatarHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    //call uploading api
    const {data} = await uploadAvatar(formData);

    setUrl(data?.url);
    setAvatar(data)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        name,
        url:avatar?.url,
        secure_url: avatar?.secure_url,
        public_id: avatar?.public_id,
        city,
        state,
        zip,
      }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      navigate("/profile");
    } catch (error) {
      console.log(error?.data?.message || error);
    }
  };

  return (
    <FormContainer>
      <h3 className="text-center">Update Profile</h3>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Row className="mb-1">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Your Name"
              value={name}
            />
          </Form.Group>
        </Row>
        <Row className="mb-1">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Avatar</Form.Label>
            {isLoading && <MiniLoader />}
            <Form.Control
              type="file"
              onChange={uploadAvatarHandler}
              name="url"
              placeholder="Upload Avatar"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail" className="text-end">
            <img
              src={url}
              alt=""
              height={150}
              width={200}
              className="rounded"
            />
          </Form.Group>
        </Row>

        <Row className="mb-1">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              name="city"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="Muktagacha">Muktagacha</option>
              <option value="Charpara">Charpara</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setZip(e.target.value)}
              value={zip}
              name="zip"
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to='/profile'className="btn btn-danger" type="submit">
          Cancel
        </Link>
      </Form>
    </FormContainer>
  );
}

export default UpdateProfile;
