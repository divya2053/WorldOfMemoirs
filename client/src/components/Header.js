import React from 'react'
import './Header.css'
import { Navbar,  Nav, NavDropdown } from 'react-bootstrap'

class Header extends React.Component {
    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">World to Memoir</Navbar.Brand>
                <Nav>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/writeblog">Write a Blog</Nav.Link>
                        <Nav.Link href="#pricing">Login/Sign Up</Nav.Link>
                </Nav>
                <Nav className='ml-auto'>
                    <NavDropdown title="Link" id="navbarScrollingDropdown" className='dropdownMenu'>
                        <NavDropdown.Item href="#action3"></NavDropdown.Item>
                        <NavDropdown.Item href="#action4"></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;
