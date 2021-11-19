import {React, useState} from 'react'
import { Navbar,Container,Button,Nav,FormControl,Form } from 'react-bootstrap'

export default function NavbarPagina({busqueda}) {
    const [busquedaEntidades, setbusquedaEntidades] = useState("")
    const onChangeBusqueda = (e) =>{
        setbusquedaEntidades(e.target.value)
    }
    const onClickBuesqueda = (e) =>{
        e.preventDefault();
        busqueda(busquedaEntidades)
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                    <Container fluid>
                    <Navbar.Brand href="/">Veterinaria</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link href="/">Mascotas</Nav.Link>
                            <Nav.Link href="/veterinarias">Veterinari@s</Nav.Link>
                            <Nav.Link href="/consultas">Consultas</Nav.Link>
                            <Nav.Link href="/duenos">Duen@s</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            name="busqueda"
                            value={busquedaEntidades}
                            onChange={onChangeBusqueda}
                        />
                        <Button 
                        variant="outline-success"
                        onClick={onClickBuesqueda}
                        >Buscar</Button>
                        </Form>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
        </div>
    )
}
