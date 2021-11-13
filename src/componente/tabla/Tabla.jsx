import React from 'react'
import EncabezadoTabla from './EncabezadoTabla'
import FilaTabla from './FilaTabla'

export default function Tabla() {
   const  mascota = [
        {tipo: "Perro", nombre: "fifi", dueno: "jose" },
        {tipo: "Gato", nombre: "fufu", dueno: "camilo" },
        {tipo: "Gato", nombre: "ruldo", dueno: "alejo" }
    ]
    const columna = mascota.length >0 ? Object.keys(mascota[0]) : []
    return (
        <table className="table table-stripped table-hover">
           <EncabezadoTabla columna={columna}/>
            <FilaTabla mascota={mascota}/>
        </table>
    )
}
