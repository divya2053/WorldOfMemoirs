import React from 'react'
import { Navbar,Offcanvas,Container,Nav, Form , NavDropdown , Button , FormControl } from 'react-bootstrap'

class App extends React.Component {
  render(){
    return (
		<Navbar bg="light" variant="light">
			<Container fluid>
				<Navbar.Brand href="#home">World Of Memoirs</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="#home">Home</Nav.Link>
					<Nav.Link href="#features">Features</Nav.Link>
					<Nav.Link href="#pricing">Pricing</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
    );
  }
}

export default App;
