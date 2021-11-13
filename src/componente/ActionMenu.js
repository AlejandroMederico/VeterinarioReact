import {React,useState} from 'react'
import {Button} from 'react-bootstrap'
import Alerta from './Alerta'

export default function ActionMenu({ActivarModal}) {
const Alarma = false;
const preciono = () =>{
    ActivarModal();
}
    return (
        <div className="actions-menu">
            <h1>Mascotas</h1>
            <div className="d-flex justify-content-between">
                <Button variant="primary" 
                style={{maxHeight:"45px"}} 
                onClick={preciono}>Nueva</Button>
                {Alarma && <Alerta 
                    titulo={"Error 404"}
                    parrafo={"El servidor web responsable no está en funcionamiento o hay problemas de conexión."}
                    tipo={'danger'}
                    inicio={true}/>}
            </div>
        </div>
    )
}
