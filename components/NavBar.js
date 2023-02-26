/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import ProfileDropdown from './ProfileDropdown';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect className="navver" fixed="top" expand="sm" bg="dark" variant="dark">
      <Container style={{ padding: 3 }}>
        <Link passHref href="/">
          <Navbar.Brand>Jammer-Planner</Navbar.Brand>
        </Link>
        {/* <Link passHref href="/">
          <Navbar.Brand>aether-net</Navbar.Brand>
  </Link> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{ paddingTop: 30, paddingLeft: 50, paddingRight: 50 }}>
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/band/new">
              <Nav.Link style={{ paddingLeft: 20, paddingRight: 50 }}>Add Band</Nav.Link>
            </Link>
            <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
              Sign Out
            </Button>
            <div className="navbarProfile" id="navbarTogglerDemo01">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                    <img src={user?.image_url} width="50px" height="50px" alt="user" className="user-icon" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <div className="profileDropdownBottomDiv" style={{ paddingLeft: 50, paddingRight: 30 }}>
                      <ProfileDropdown />
                      <button type="button" className="signOutBtn btn" onClick={signOut}>
                        Sign Out
                      </button>
                    </div>
                  </ul>
                </li>
                <div />
              </ul>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
