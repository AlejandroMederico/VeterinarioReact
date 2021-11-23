import {React, useState,useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap'
import ComponenteCampo from './ComponenteCampo';
import { CrearEditarEntidas } from './servicio/Servicio'


export default function ModalGenerico({handleClose,url,editarEntindad,numero,columna,modal}) {
    if(columna.length === 0){
        if(url === "duenos" || url === "veterinarias")columna=["nombre","apellido","documento"];  
        if(url === "mascota") columna=["tipo","nombre","dueno"]
    }  
    const [BtnEditar, setBtnEditar] = useState(false)
    const [stateFormulario, setstateFormulario] = useState({})
    const Guardar= "Guardar"
    const Editar ="Editar"

    useEffect(() => {
        if(editarEntindad != null){
        setstateFormulario(editarEntindad)
        setBtnEditar(true)
        }
    }, [editarEntindad])

    const botonEditar = () =>{
        setBtnEditar(false)
        cerrarModal()
    }
    const handleSumit = () =>{
        if (BtnEditar === false) {
            console.log("Crear");
            CrearEditarEntidas(url,"POST",stateFormulario).then(() =>botonEditar() ) 
        } else {
            console.log("Editar");
            CrearEditarEntidas(url,"PUT",stateFormulario,numero).then(() =>botonEditar() ) 
        }  
    }
    const valueChange = (value,name)=>{
        setstateFormulario({...stateFormulario,[name]:value})
    }
    const cerrarModal= () =>{
        setstateFormulario({})
        handleClose()
    }
    console.log(stateFormulario);
    return (
        <>
        <Modal show={modal} onHide={cerrarModal} animation={false}>
            <Modal.Header closeButton>
                 <Modal.Title>{`Nueva ${url}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    url === "consultas"
                    ?["mascota","veterinarias","historia","diagnosticos"].map((col,index) => {
                          return  <ComponenteCampo
                                    key={`${index}--${url}--${col}`}
                                    columnaCampo={col}
                                    url={url}
                                    editarEntindad={editarEntindad}
                                    valueChange={valueChange}/>})
                    :columna.map((col,index) => {
                        return  <ComponenteCampo
                                key={`${index}--${url}--${col}`}
                                url={url}
                                columnaCampo={col}
                                editarEntindad={editarEntindad}
                                valueChange={valueChange}/>})
                                
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cerrarModal}>
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

