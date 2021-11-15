import {React, useState,useEffect} from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { ListasEntidas,CrearEditarEntidas } from './servicio/Servicio'


export default function ModalGenerico({handleClose,url,editarEntindad,numero}) {
    const [BtnEditar, setBtnEditar] = useState(false)
    const [ApiMascota, setApiMascota] = useState([])
    const [ApiDueno, setApiDueno] = useState([])
    const [ApiVeterinario, setApiVeterinario] = useState([])
    const [ApiConsultas, setApiConsultas] = useState([])
    const [newMascota, setnewMascota] = useState({
        tipo: "",
        nombre: "",
        dueno: ""
    })

    const Guardar= "Guardar"
    const Editar ="Editar"

    useEffect(() => {
        ListasEntidas('mascota').then((e)=>setApiMascota(e))
        ListasEntidas('veterinarias').then((e)=>setApiVeterinario(e))
        ListasEntidas('duenos').then((e)=>setApiDueno(e))
        ListasEntidas('consultas').then((e)=>setApiConsultas(e))
    }, [url])

    const tipoMascota =[
        {valor: "Perro", etiqueta: "Perro"},
        {valor: "Gato", etiqueta: "Gato"},
        {valor: "Pajaro", etiqueta: "Pajaro"},
        {valor: "Otro", etiqueta: "Otro"},
    ]

    const botonEditar = () =>{
        setBtnEditar(false)
        handleClose()
    }

    const handleChange = (e) =>{
        const {value, name}= e.target
        setnewMascota({...newMascota,[name]:value})
    }

    const handleSumit = () =>{
        if (BtnEditar === false) {
            console.log(newMascota);
            CrearEditarEntidas(url,"POST",newMascota).then(() =>botonEditar() ) 
        } else {
            console.log(numero);
            CrearEditarEntidas(url,"PUT",newMascota,numero).then(() =>botonEditar() ) 
        }  
    }

    useEffect(() => {
        if(editarEntindad != null){
        setBtnEditar(true)
        setnewMascota(editarEntindad) 
        }
    }, [editarEntindad])

    return (
        <>
        <Modal show={true} onHide={botonEditar} animation={false}>
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
                            {ApiDueno.length >0
                            ? ApiDueno.map((opcion,index) =>
                            <option 
                                value={opcion.nombre} 
                                key={index}>{opcion.nombre}</option> )
                            : <option value="">No hay datos Cargados</option>
                            }
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={botonEditar}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSumit}>
                    {BtnEditar === true ? Editar : Guardar}
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    )
}

