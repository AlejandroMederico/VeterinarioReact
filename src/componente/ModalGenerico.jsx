import {React, useState,useEffect} from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { ListasEntidas,CrearEditarEntidas } from './servicio/Servicio'


export default function ModalGenerico({handleClose,url,editarEntindad,numero,columna,modal}) {
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
    
    const [BtnEditar, setBtnEditar] = useState(false)
    const [ApiMascota, setApiMascota] = useState([])
    const [ApiDueno, setApiDueno] = useState([])
    const [ApiVeterinario, setApiVeterinario] = useState([])
    const [newMascota, setnewMascota] = useState(stateInicial[url])

    const Guardar= "Guardar"
    const Editar ="Editar"
    useEffect(() => {
        ListasEntidas('mascota').then((e)=>setApiMascota(e))
        ListasEntidas('veterinarias').then((e)=>setApiVeterinario(e))
        ListasEntidas('duenos').then((e)=>setApiDueno(e))
    }, [url])

    var tipoMascota =[
        {valor: "Perro", etiqueta: "Perro"},
        {valor: "Gato", etiqueta: "Gato"},
        {valor: "Pajaro", etiqueta: "Pajaro"},
        {valor: "Otro", etiqueta: "Otro"},
    ]

    const botonEditar = () =>{
        setBtnEditar(false)
        handleClose()
    }

    const handleChange = (e) =>{
        let {value, name}= e.target
        console.log(e.target);
        let mientras =null;
        if(url === "consultas" )
        {
            if( name === "mascota"){
                ApiMascota.forEach((mas,inde) => {
                    if(value === mas.nombre) {
                        mientras=value;
                        value=inde;
                    }
                })
            }
            if(name === "veterinarias"){
                ApiVeterinario.forEach((mas,inde) => {
                    if(value === mas.nombre){
                        mientras=value;
                        value=inde
                    } 
                })
            }
        }
        setnewMascota({...newMascota,[name]:value})
    }

    const handleSumit = () =>{
        if (BtnEditar === false) {
            // console.log(newMascota);
            CrearEditarEntidas(url,"POST",newMascota).then(() =>botonEditar() ) 
        } else {
            // console.log(newMascota);
            CrearEditarEntidas(url,"PUT",newMascota,numero).then(() =>botonEditar() ) 
        }  
    }

    useEffect(() => {
        if(editarEntindad != null){
        setBtnEditar(true)
        if (url === "consultas") {
                let mascotaConsulta =editarEntindad.mascota.id
                let veteriConsulta =editarEntindad.veterinarias.id
                editarEntindad.mascota= mascotaConsulta
                editarEntindad.veterinarias= veteriConsulta
        }
            setnewMascota(editarEntindad)
        }
    }, [editarEntindad])

    const ComponenteCampo = ({columnaCampo=""}) =>{
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

    // console.log(newMascota);
    return (
        <>
        <Modal show={modal} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                 <Modal.Title>{`Nueva ${url}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    url === "consultas"
                    ?["mascota","veterinarias","historia","diagnosticos"].map((col,index) => {
                          return  <ComponenteCampo 
                            key={`${index}-- ${url}`}
                            columnaCampo={col}/>
                                        })
                    :columna.map((col,index) => {
                        return  <ComponenteCampo 
                          key={`${index}-- ${url}`}
                          columnaCampo={col}/>
                                      })
                        
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSumit}>
                    {BtnEditar === true ? Editar : Guardar}
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    )
}

