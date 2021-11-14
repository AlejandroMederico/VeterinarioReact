import React, { Fragment } from 'react'
import Boton from './Boton'

export default function FilaTabla({Entidad}) {
    return (
        <Fragment>
            {Entidad.length === 0 
                ?<h5>Ingrese dato para la tabla</h5>
                :<Fragment>
                            { Entidad.map((Entidad, index)=>
                                <tr key={index}>
                                    <th scope="row">{index}</th>
                                    <td>{Entidad.tipo}</td>
                                    <td>{Entidad.nombre}</td>
                                    <td>{Entidad.dueno}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <Boton color={'btn-info'} tipo={"editar"}/>
                                            <Boton color={'btn-danger'} tipo={"eliminar"}/>
                                        </div>
                                    </td>
                                </tr>)
                            }
                </Fragment>
            }
        </Fragment> 
    )
}
