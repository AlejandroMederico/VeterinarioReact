import {Button} from 'react-bootstrap'
import React, { Fragment } from 'react'
import { fas,faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FilaTabla({Entidad,editarEntidad,eliminarEntidad}) {

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
                                        <Button variant="primary" onClick={() => editarEntidad(index) }>
                                             <FontAwesomeIcon icon={faEdit}/>
                                        </Button>
                                        <Button variant="danger" onClick={() => eliminarEntidad(index) }>
                                             <FontAwesomeIcon icon={faTrashAlt}/>
                                        </Button>
                                        
                                        </div>
                                    </td>
                                </tr>)
                            }
                </Fragment>
            }
        </Fragment> 
    )
}
