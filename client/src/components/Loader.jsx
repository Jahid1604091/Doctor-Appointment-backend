import React from "react";
import Layout from "./Layout";
import Spinner from 'react-bootstrap/Spinner';

export default function Loader() {
  return (
    <Layout>
        <Spinner animation="grow"></Spinner>
    </Layout>
  );
}
