import React from 'react'
import "../css/style.css"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavbarCollapse from 'react-bootstrap/NavbarCollapse'
import Button from 'react-bootstrap/Button'
import NavbarToggle from 'react-bootstrap/NavbarToggle'
import { Link } from 'react-router-dom'

export default function NavbarComponents() {
  return (
    <>
      <Navbar id="navibar" collapseOnSelect sticky="top" expand="lg" bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand id="navbrand" href="/">Cabinet<span>Dentaire</span></Navbar.Brand>
          <NavbarToggle    aria-controls="basic-navbar-nav">MENU</NavbarToggle>
          <NavbarCollapse id="basic-navbar-nav">
          <Nav className="navbar-nav me-auto">
            <Nav.Link eventKey="1" as={Link} to="/">Home</Nav.Link>
            <Nav.Link eventKey="2" as={Link} to="/About">About</Nav.Link>
            <Nav.Link eventKey="3" as={Link} to="/Services">Services</Nav.Link>
            <Nav.Link eventKey="4" as={Link} to="/Doctors">Doctors</Nav.Link>
            <Nav.Link eventKey="5" as={Link} to="/Contact">Contact</Nav.Link>
          </Nav>
          <Nav.Link href="/Login">
            <Button className="btn btn-primary" variant="primary">Login</Button>{' '}
          </Nav.Link>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  )
}
