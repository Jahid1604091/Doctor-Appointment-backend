import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GrNotification } from "react-icons/gr";
import { IconContext } from "react-icons";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Wrapper>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="/">Sample Auth </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/about">About</Link>
            </Nav>
            <Nav className="notification">
              <Link to="/notifications">
                <GrNotification/>
              </Link>
            </Nav>

            <Nav>
              {userInfo ? (
                <NavDropdown title={userInfo?.name} className="nav-dropdown">
                  {/* <NavDropdown.Item className="nav-item" to='/profile'>
                   Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider /> */}
                  <NavDropdown.Item
                    className="nav-item"
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <p className="text-light">Guest</p>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  height: 10vh;
  background-color: var(--clr-grey-1);
  color: var(--clr-primary-10);
  box-shadow: var(--light-shadow);
  .notification {
    font-size: 22px;
  }
  a {
    &:hover {
      color: var(--clr-primary-2);
    }
  }
  .nav-dropdown,
  .nav-link,
  .nav-link.show {
    box-shadow: var(--light-shadow);
    color: var(--clr-primary-10);
    &:hover {
      color: var(--clr-primary-10);
    }
    .nav-item,
    .nav-item a {
      color: var(--clr-primary-10);
      &:hover {
        color: var(--clr-primary-2);
      }
    }
    .dropdown-menu {
      background-color: var(--clr-primary-2);
      color: var(--clr-primary-10);
    }
  }
`;

export default Header;
