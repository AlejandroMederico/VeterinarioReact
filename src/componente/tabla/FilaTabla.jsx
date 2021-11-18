import {Button} from 'react-bootstrap'
import React, { Fragment } from 'react'
import { fas,faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FilaTabla({Entidad,editarEntidad,eliminarEntidad,columna}) {
    const evaluarCampo = ({_Entidad,col}) =>{
        if(typeof _Entidad[col] === 'object'){
            if(col === "veterinarias"){
                return `${_Entidad[col].nombre}  ${_Entidad[col].apellido}`
            }
            if(col === "mascota"){
                return `${_Entidad[col].nombre}  (${_Entidad[col].tipo})`
            }
        }
        return _Entidad[col]
    }
    return (
        <Fragment>
            {Entidad.length === 0 
                ?<p>Ingrese dato para la tabla</p>
                :<Fragment>
                            { Entidad.map((_Entidad, index)=>
                                <tr key={`${index}-${_Entidad}`}>
                                    <th scope="row">{index}</th>
                                    {columna.map((col,_index) => 
                                    <td key={`${_index}-${col}`}>
                                        {evaluarCampo({_Entidad,col})
                                        /* {_Entidad[col]} */}
                                        </td>
                                    )}
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
