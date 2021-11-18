import {React, useState,useEffect, Fragment} from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { ListasEntidas,CrearEditarEntidas } from './servicio/Servicio'

export default function ComponenteCampo({columnaCampo,url,handleChange}) {
    const stateInicial = {
        mascota:{
                    tipo: "",
                    nombre: "",
                    dueno: ""
                  },
        duenos:{
                    nombre: "",
                    apellido: "",
                    documento: ""
                  },
        veterinarias:{
                    nombre: "",
                    apellido: "",
                    documento: ""
                  },
        consultas:{
                    mascota: "",
                    veterinarias: "",
                    diagnosticos: "",
                    historia: ""
                  }
    }
    var tipoMascota =[
        {valor: "Perro", etiqueta: "Perro"},
        {valor: "Gato", etiqueta: "Gato"},
        {valor: "Pajaro", etiqueta: "Pajaro"},
        {valor: "Otro", etiqueta: "Otro"},
    ]
    const [ApiMascota, setApiMascota] = useState([])
    const [ApiDueno, setApiDueno] = useState([])
    const [ApiVeterinario, setApiVeterinario] = useState([])
    const [newMascota, setnewMascota] = useState(stateInicial[url])
    
    useEffect(() => {
        ListasEntidas('mascota').then((e)=>setApiMascota(e))
        ListasEntidas('veterinarias').then((e)=>setApiVeterinario(e))
        ListasEntidas('duenos').then((e)=>setApiDueno(e))
    }, [url])

            switch (columnaCampo) { 
            case "tipo":
            case "dueno":
            case "mascota":
            case "veterinarias":
            let opcionApi ={
                dueno:ApiDueno,
                mascota:ApiMascota,
                veterinarias:ApiVeterinario
            }
            if(columnaCampo ==="dueno" || columnaCampo ==="mascota" || columnaCampo ==="veterinarias"){
                var arrayEntidadeSelec= opcionApi[columnaCampo]
            }
            const valorSelect = {
                        tipo:newMascota.tipo,
                        dueno:newMascota.dueno,
                        mascota:newMascota.mascota,
                        veterinarias:newMascota.veterinarias }
                return(
                        <Form.Group className="mb-3">
                            <Form.Label>{`Selecione ${columnaCampo}`}</Form.Label>
                            <Form.Select 
                            name={columnaCampo}
                            value={valorSelect[columnaCampo]}
                            onChange={handleChange}
                            aria-label={`Eliga ${columnaCampo}`}>
                                    <option>{`Eliga ${columnaCampo}`}</option>
                                    {columnaCampo === "tipo"
                                    ?  tipoMascota.length >0
                                        ? tipoMascota.map((opcion,index) =>
                                            <option 
                                            key={`${index}--${opcion.valor}--${url}`}
                                            value={opcion.valor}
                                            >{opcion.etiqueta}</option> )
                                        : <option value="">No hay datos Cargados</option>
                                   // LOS DEMAS SELECT
                                    :   arrayEntidadeSelec.length >0
                                            ? arrayEntidadeSelec.map((opcion,index) =>
                                                <option 
                                                key={`${index}--${opcion.nombre}--${url}`}
                                                value={url === "consultas" ? index : opcion.nombre}
                                                >{opcion.nombre}</option> )
                                            : <option value="">No hay datos Cargados</option>
                                    }
                                    
                            </Form.Select>
                        </Form.Group>
                        )
                
            case "nombre":
            case "documento":
            case "apellido":
            case "historia":
            case "diagnosticos":  
            const valortext ={
                         nombre:newMascota.nombre,
                         documento:newMascota.documento,
                         apellido:newMascota.apellido,
                         historia:newMascota.historia,
                         diagnosticos:newMascota.diagnosticos}
                return (
                    <Form.Group className="mb-3">
                        <Form.Label>{columnaCampo}</Form.Label>
                        <Form.Control 
                            type="text"
                            name={columnaCampo}
                            value={valortext[columnaCampo]}
                            onChange={handleChange}
                            placeholder={`Ingrese ${columnaCampo}`}/>
                    </Form.Group>
                )
            default:
                break;
        }
}
