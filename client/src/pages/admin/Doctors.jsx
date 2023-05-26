import React from "react";
import Layout from "../../components/Layout";
import { Table } from "react-bootstrap";
import { useGetAllDoctorsQuery } from "../../slices/adminApiSlice";
import { Link } from "react-router-dom";


export default function Doctors() {
  const { data } = useGetAllDoctorsQuery();
  const tbody_data = data?.map((doctor) => {
    return (
      <tr key={doctor._id}>
        <td>{doctor.status}</td>
        <td>{doctor.name ? doctor.name : null}</td>
        <td>{doctor.email}</td>
        <td>{doctor.createdAt}</td>
        <td>{doctor.status === 'pending' ? <Link>Approve</Link> : <Link>Block</Link>}</td>
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
