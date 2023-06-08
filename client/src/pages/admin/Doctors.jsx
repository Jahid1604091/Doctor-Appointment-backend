import React from "react";
import Layout from "../../components/Layout";
import { Table } from "react-bootstrap";
import {
  useApproveAsDoctorMutation,
  useGetAllDoctorsQuery,
} from "../../slices/adminApiSlice";
import { Link } from "react-router-dom";
import NotFound from "../../components/NotFound";
import styled from "styled-components";
import moment from "moment";
import { toast } from "react-hot-toast";


export default function Doctors() {
  const { data } = useGetAllDoctorsQuery();
  const [approveAsDoctor, { isLoading }] = useApproveAsDoctorMutation();

  const handleApprove = async(id) => {
    try {
      const res  = await approveAsDoctor(id);
      toast.success('Approved!')
      
    } catch (error) {
      
    }
  };
  
  const tbody_data = data?.map((doctor) => {
    return (
      <tr key={doctor._id}>
        <td className="text-capitalize"> 
        <span className={`text-light rounded p-1 bg-${doctor.status === 'pending' ? 'warning' : 'primary'}`}>{ doctor.status}</span> 
        </td>
        <td>{doctor.user.name ? doctor.user.name : null}</td>
        <td>{doctor.email}</td>
        <td>{moment(doctor.createdAt).format("DD MMMM YYYY, h:mm a")}</td>
        <td>
          {doctor.status === "pending" ? (
            <span className="approve-btn" onClick={()=>handleApprove(doctor._id)}>Approve</span>
          ) : (
            <Link>Block</Link>
          )}
        </td>
      </tr>
    );
  });
  if (data?.length === 0) return <NotFound>No Doctor Found!</NotFound>


  return (
    <Layout>
      <Wrapper>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Email</th>
            <th>Applied At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{tbody_data}</tbody>
      </Table>

      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.section`
  .approve-btn{
    transition: var(--transition);
    cursor: pointer;
    &:hover{
      color: var(--clr-primary-2);
      border-bottom: 1px solid var(--clr-primary-1);
      transition: var(--transition);
    }
  }

`