import React from "react";
import Layout from "../../components/Layout";
import { Table } from "react-bootstrap";
import {
  useApproveAsDoctorMutation,
  useGetAllDoctorsQuery,
  useRemoveAsDoctorMutation,
} from "../../slices/adminApiSlice";
import { Link } from "react-router-dom";
import NotFound from "../../components/NotFound";
import styled from "styled-components";
import moment from "moment";
import { toast } from "react-hot-toast";

export default function Doctors() {
  const { data } = useGetAllDoctorsQuery();
  const [approveAsDoctor] = useApproveAsDoctorMutation();
  const [removeAsDoctor, { isLoading }] = useRemoveAsDoctorMutation();

  const handleApprove = async (id) => {
    try {
      const res = await approveAsDoctor(id);
      toast.success("Approved!");
    } catch (error) {}
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeAsDoctor(id);
      toast.success("Removed!");
    } catch (error) {}
  };

  const tbody_data = data?.map((doctor) => {
    return (
      <tr key={doctor?._id}>
        <td className="text-capitalize">
          <span
            className={`text-light rounded p-1 bg-${
              doctor?.status === "pending" ? "warning" : "primary"
            }`}
          >
            {doctor?.status}
          </span>
        </td>
        <td>{doctor?.user?.name ? doctor?.user?.name : null}</td>
        <td>{doctor?.email}</td>
        <td>{doctor?.expertise_in}</td>
        <td>{moment(doctor?.createdAt).format("DD MMM YY, hh:mm a")}</td>
        <td>
          {doctor?.status === "pending" ? (
            <span
              className="approve-btn"
              onClick={() => handleApprove(doctor?._id)}
            >
              Approve
            </span>
          ) : (
            <span
              className="approve-btn"
              onClick={() => handleRemove(doctor?._id)}
            >
              Remove
            </span>
          )}
        </td>
      </tr>
    );
  });
  if (data?.length === 0) return <NotFound>No Doctor Found!</NotFound>;

  return (
    <Layout>
      <Wrapper>
        <div className="d-flex justify-content-between my-2">
          <h4>
            {data?.length > 0 && (
              <span className="badge bg-primary">{data.length}</span>
            )}{" "}
            doctors
          </h4>{" "}
          {/* <div>Search Bar</div> */}
        </div>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Expert In</th>
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
  .approve-btn {
    transition: var(--transition);
    color: var(--clr-red-dark);
    cursor: pointer;
    &:hover {
      border-bottom: 1px solid var(--clr-primary-1);
      transition: var(--transition);
    }
  }
`;
