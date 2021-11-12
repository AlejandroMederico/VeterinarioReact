import React from 'react'
import { Navbar,Container,Button,Nav,FormControl,Form } from 'react-bootstrap'

export default function NavbarPagina() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                    <Container fluid>
                    <Navbar.Brand href="#">Veterinaria</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <Nav.Link href="#action1">Mascotas</Nav.Link>
                        <Nav.Link href="#action2">Veterinari@s</Nav.Link>
                        <Nav.Link href="#action1">Consultas</Nav.Link>
                        <Nav.Link href="#action2">Duen@s</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Buscar</Button>
                        </Form>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
        </div>
    )
}
