import { fas,faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Boton({color,contenido,tipo}) {
    return (
        <button type="button" 
                className={`btn ${color}`}>
                    {contenido}
                    {tipo === "editar" && <FontAwesomeIcon icon={faEdit}/>}
                    {tipo === "eliminar" && <FontAwesomeIcon icon={faTrashAlt}/>}
        </button>
    )
}
