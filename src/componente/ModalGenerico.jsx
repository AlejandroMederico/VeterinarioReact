import {React, useState,useEffect} from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { ListasEntidas } from './servicio/Servicio'

export default function ModalGenerico({handleClose,url}) {
    const [newMascota, setnewMascota] = useState({
        tipo: "",
        nombre: "",
        dueno: ""
    })
    const duenos =[
        {valor: "jose", etiqueta: "jose"},
        {valor: "camilo", etiqueta: "camilo"},
        {valor: "alejo", etiqueta: "alejo"},
        {valor: "Felix", etiqueta: "Felix"},
    ]
    const tipoMascota =[
        {valor: "Perro", etiqueta: "Perro"},
        {valor: "Gato", etiqueta: "Gato"},
        {valor: "Pajaro", etiqueta: "Pajaro"},
        {valor: "Otro", etiqueta: "Otro"},
    ]
    const handleChange = (e) =>{
        const {value, name}= e.target
        setnewMascota({...newMascota,[name]:value})
    }
    console.log(newMascota);
    return (
        <>
        <Modal show={true} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                 <Modal.Title>Nueva Mascota</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Tipo de mascota</Form.Label>
                    <Form.Select 
                    name="tipo"
                    value={newMascota.tipo}
                    onChange={handleChange}
                    aria-label="Eliga tipo de mascota">
                            <option>Eliga tipo de mascota</option>
                            {tipoMascota.length >0
                            ? tipoMascota.map((opcion,index) =><option value={opcion.valor} key={index}>{opcion.etiqueta}</option> )
                            : <option value="">No hay datos Cargados</option>
                            }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nombre de mascota</Form.Label>
                    <Form.Control 
                        name="nombre"
                        type="text" 
                        value={newMascota.nombre}
                        onChange={handleChange}
                        placeholder="Nombre de las mascota" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Duenos</Form.Label>
                    <Form.Select 
                    name="dueno"
                    value={newMascota.dueno}
                    onChange={handleChange}
                    aria-label="Eliga el Dueno">
                            <option>Eliga el Dueno</option>
                            {duenos.length >0
                            ? duenos.map((opcion,index) =>
                            <option 
                                value={opcion.valor} 
                                key={index}>{opcion.etiqueta}</option> )
                            : <option value="">No hay datos Cargados</option>
                            }
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    )
}

