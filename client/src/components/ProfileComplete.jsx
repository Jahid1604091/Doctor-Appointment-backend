import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MiniLoader from "./MiniLoader";
import { setCredentials } from "../slices/authSlice";
import {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUploadFileMutation,
} from "../slices/userApiSlice";

export default function ProfileComplete() {
  const {userInfo} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState({});
  const [url, setUrl] = useState(userInfo?.avatar?.url);
  const [file, setFile] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Muktagacha");
  const [zip, setZip] = useState("");

  const [uploadFile, { isLoading: isLoadingFileUpload }] = useUploadFileMutation();
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();
  const [updateProfile] = useUpdateProfileMutation();

  const uploadAvatarHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    //call uploading api
    const {data} = await uploadAvatar(formData);
    setUrl(data?.url);
    setAvatar(data)
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    //call uploading api
    const {
      data: { url, secure_url },
    } = await uploadFile(formData);

    setFile(url);
  };

  //submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await updateProfile({     
      url:avatar?.url,
      secure_url: avatar?.secure_url,
      public_id: avatar?.public_id, 
      city, 
      state, 
      zip 
    }).unwrap();
    dispatch(setCredentials({ ...res.data }));

  };

  return (
    <>
      <h3>Complete Profile</h3>
      <Form className="mb-3" onSubmit={submitHandler}>
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

          {/* {isDoctor && (
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label> Certificate </Form.Label>

            {isLoadingFileUpload && <MiniLoader />}
          <Form.Control
            type="file"
            onChange={uploadFileHandler}
            name="file"
            placeholder="Upload Certificate"
            accept="application/pdf"
          />
          </Form.Group>
        )} */}
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
      </Form>
    </>
  );
}
