import React from "react";
import Layout from "../../components/Layout";
import { Table } from "react-bootstrap";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../slices/adminApiSlice";
import NotFound from "../../components/NotFound";
import {FaTrashAlt} from 'react-icons/fa';
import moment from "moment";
import styled from "styled-components";
export default function Users() {
  const { data } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  
  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id);
      toast.success("User Deleted!");
    } catch (error) {}
  };

  const tbody_data = data?.map((user) => {
    return (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.isDoctor ? 'Doctor' : 'User'}</td>
        <td>{moment(user.createdAt).format('DD MMM, YY')}</td>
        <td className="trashIcon" onClick={()=>handleDelete(user._id)}><FaTrashAlt/></td>
      </tr>
    );
  });
  if (data?.length === 0) return <NotFound>No User Found!</NotFound>

  return (
    <Layout>
      <Wrapper>
       <div className="d-flex justify-content-between my-2">
          <h4>
            {data?.length > 0 && (
              <span className="badge bg-primary">{data.length}</span>
            )}{" "}
           Users
          </h4>{" "}
          {/* <div>Search Bar</div> */}
        </div>
      <Table   >
        <thead>
          <tr>
          
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tbody_data}</tbody>
      </Table>
      </Wrapper>
    </Layout>
  );
}


const Wrapper = styled.section`
  .trashIcon {
    transition: var(--transition);
    color: var(--clr-red-dark);
    cursor: pointer;
    &:hover {
      color: var(--clr-red-light);
      
    }
  }
`;