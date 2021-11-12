import {React,useState} from 'react'
import {Button} from 'react-bootstrap'
import Alerta from './Alerta'

export default function ActionMenu() {

const [Alarma, setAlarma] = useState(false)
const cambio = () =>{
    setAlarma(!Alarma)
}
    return (
        <div className="actions-menu">
            <h1>Mascotas</h1>
            <div className="actions-menu-content ">
                <Button variant="primary"  
                onClick={cambio}>Nueva</Button>
                {Alarma && <Alerta 
                    parrafo={"Error 404"}
                    tipo={'danger'}
                    inicio={true}/>}
            </div>
        </div>
    )
}
