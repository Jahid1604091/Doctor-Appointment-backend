import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import About from "./pages/About.jsx";
import ApplyAsDoctor from "./pages/ApplyAsDoctor.jsx";
import NotFound from "./components/NotFound.jsx";
import Notifications from "./pages/Notifications.jsx";
import Users from "./pages/admin/Users.jsx";
import Doctors from "./pages/admin/Doctors.jsx";
import Appointment from "./pages/Appointment.jsx";
import Appointments from "./pages/Appointments.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />

      <Route path="" element={<PrivateRoute />}>
        <Route index path="/" element={<Home />} />
        <Route path="/booked-appointments" element={<Appointments />} />
        <Route path="/apply-as-doctor" element={<ApplyAsDoctor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<UpdateProfile />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<Appointment />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
