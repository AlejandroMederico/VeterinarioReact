import React from 'react'
import { Form } from 'react-bootstrap'

export default function SelectForm({opciones=[],titulo}) {
    return (
        <Form.Select aria-label={titulo}>
                <option>{titulo}</option>
                {opciones.length >0
                ? opciones.map((opcion,index) =><option value={opcion.valor} key={index}>{opcion.etiqueta}</option> )
                : <option value="">No hay datos Cargados</option>
                }
        </Form.Select>
    )
}
