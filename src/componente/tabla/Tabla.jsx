import React from 'react'
import EncabezadoTabla from './EncabezadoTabla'
import FilaTabla from './FilaTabla'

export default function Tabla({Entidad,editarEntidad,eliminarEntidad}) {
    const columna = Entidad.length >0 ? Object.keys(Entidad[0]) : [];
    return (
        <table className="table table-stripped table-hover">
           <EncabezadoTabla columna={columna}/>
           <tbody id="lista-Entidads">
                <FilaTabla Entidad={Entidad} 
                    editarEntidad={editarEntidad} 
                    eliminarEntidad={eliminarEntidad}
                    columna={columna}/>
            </tbody>
        </table>
    )
}
