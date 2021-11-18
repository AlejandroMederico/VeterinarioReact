import React from 'react'
import EncabezadoTabla from './EncabezadoTabla'
import FilaTabla from './FilaTabla'

export default function Tabla({Entidad,editarEntidad,eliminarEntidad,columna=[]}) {
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
