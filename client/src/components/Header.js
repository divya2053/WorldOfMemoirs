import React from 'react'
import { Navbar, Offcanvas, Container, Nav, Form, NavDropdown, Button, FormControl } from 'react-bootstrap'

class Header extends React.Component {
    render() {
        return (
            <Navbar bg="light" variant="light">
                <Container fluid>
                    <Navbar.Brand href="#home">World to Memoir</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#feature">Read Blogs</Nav.Link>
                        <Nav.Link href="/writeblog">Write a Blog</Nav.Link>
                        <Nav.Link href="#pricing">Login</Nav.Link>
                        <Nav.Link href="#pricing">Sign Up</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default Header;
