import React from 'react'
import Boton from './Boton'

export default function FilaTabla({mascota}) {
    return (
        <tbody id="lista-mascotas">
              {" "}
              { mascota.map((mascota, index)=><tr key={index}>
            <th scope="row">{index}</th>
            <td>{mascota.tipo}</td>
            <td>{mascota.nombre}</td>
            <td>{mascota.dueno}</td>
            <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <Boton color={'btn-info'} tipo={"editar"}/>
                    <Boton color={'btn-danger'} tipo={"eliminar"}/>
                </div>
            </td>
          </tr>)}
            </tbody>
    )
}
