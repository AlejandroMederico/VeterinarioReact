import React, { Fragment } from 'react'

export default function EncabezadoTabla({columna}) {
    return (
        <Fragment>
             <thead className="thead-dark">
                <tr>
                    {columna.length === 0 
                    ?<p>Ingrese dato para la tabla</p>
                    :<Fragment>
                        <th scope="col">#</th>
                        {columna.map( (columna, index) => <th key={index} scope="col"> {columna}</th>)}
                        <th scope="col">Accion</th>
                     </Fragment>
                    }
                </tr>
            </thead>
        </Fragment>
    )
}
