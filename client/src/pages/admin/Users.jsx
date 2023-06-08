import React from "react";
import Layout from "../../components/Layout";
import { Table } from "react-bootstrap";
import { useGetAllUsersQuery } from "../../slices/adminApiSlice";
import NotFound from "../../components/NotFound";

export default function Users() {
  const { data } = useGetAllUsersQuery();
  const tbody_data = data?.map((user) => {
    return (
      <tr key={user._id}>
        <td>{user._id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.createdAt}</td>
        <td>Edit | Delete | Block</td>
      </tr>
    );
  });
  if (data?.length === 0) return <NotFound>No User Found!</NotFound>

  return (
    <Layout>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
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
