import React from "react";
import Layout from "../../components/Layout";
import { Table } from "react-bootstrap";
import {
  useApproveAsDoctorMutation,
  useGetAllDoctorsQuery,
} from "../../slices/adminApiSlice";
import { Link } from "react-router-dom";


export default function Doctors() {
  const { data } = useGetAllDoctorsQuery();
  const [approveAsDoctor, { isLoading }] = useApproveAsDoctorMutation();

  const handleApprove = async(id) => {
    const res  = await approveAsDoctor(id);
  };
  
  const tbody_data = data?.map((doctor) => {
    return (
      <tr key={doctor._id}>
        <td>{doctor.status}</td>
        <td>{doctor.user.name ? doctor.user.name : null}</td>
        <td>{doctor.email}</td>
        <td>{doctor.createdAt}</td>
        <td>
          {doctor.status === "pending" ? (
            <span onClick={()=>handleApprove(doctor._id)}>Approve</span>
          ) : (
            <Link>Block</Link>
          )}
        </td>
      </tr>
    );
  });

  return (
    <Layout>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Email</th>
            <th>Create At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{tbody_data}</tbody>
      </Table>
    </Layout>
  );
}
