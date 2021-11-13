import {React, useState} from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import SelectForm from './SelectForm'

export default function ModalGenerico({handleClose}) {

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
    return (
        <>
        <Modal show={true} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                 <Modal.Title>Nueva Mascota</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Tipo de mascota</Form.Label>
                    <SelectForm 
                    opciones={tipoMascota}
                    titulo={`Eliga tipo de mascota`}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nombre de mascota</Form.Label>
                    <Form.Control type="text" placeholder="Nombre de las mascota" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Duenos</Form.Label>
                    <SelectForm 
                    opciones={duenos}
                    titulo={`Eliga el Dueno`}/>
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

