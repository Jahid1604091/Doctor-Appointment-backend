import React, { useState } from "react";
import Layout from "../components/Layout";
import { Card, Container, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useMarkAllAsReadMutation } from "../slices/userApiSlice";

export default function Notifications() {
  const { userInfo } = useSelector((state) => state.auth);
  const [markAllAsRead,{loading}] = useMarkAllAsReadMutation();
  const [activeTab, seActiveTab] = useState("unseen");
  const navigate = useNavigate();


  return (
    <Layout>
      <Container>
        <h3>Notification</h3> <hr />
        <div className="d-flex justify-content-between">
          <div>
            <Tabs
              defaultActiveKey={activeTab}
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="unseen" title="Unseen">
                <ul>
                  {userInfo?.unseenNotifications?.map((notification,idx) => {
                    return (
                      <li className="my-2" key={idx}>
                        <Link to={notification.clickPath}>
                          <Card className="p-2">{notification.message}</Card>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Tab>

              <Tab eventKey="seen" title="Seen">
              <ul>
                  {userInfo?.seenNotifications?.map((notification,idx) => {
                    return (
                      <li className="my-2" key={idx}>
                        <Link to={notification.clickPath}>
                          <Card className="p-2">{notification.message}</Card>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Tab>
            </Tabs>
          </div>

          <div>
            <span onClick={markAllAsRead}>Mark all as read</span>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
