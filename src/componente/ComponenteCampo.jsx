import {React, useState,useEffect,useCallback} from 'react'
import {Form } from 'react-bootstrap'
import { ListasEntidas } from './servicio/Servicio'

export default function ComponenteCampo({columnaCampo,url,editarEntindad,valueChange}) {
    const stateInicial = useCallback(
        (entidad) => {
            const dato={
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
            return dato[entidad]
        },[]) 
    var tipoMascota =[
        {valor: "Perro", etiqueta: "Perro"},
        {valor: "Gato", etiqueta: "Gato"},
        {valor: "Pajaro", etiqueta: "Pajaro"},
        {valor: "Otro", etiqueta: "Otro"},
    ]
    const [ApiMascota, setApiMascota] = useState([])
    const [ApiDueno, setApiDueno] = useState([])
    const [ApiVeterinario, setApiVeterinario] = useState([])
    const [newEntidades, setnewEntidades] = useState(stateInicial(url))
    const handleChange = (e) =>{
        let {value, name}= e.target
        setnewEntidades({...newEntidades,[name]:value})
        console.log(newEntidades);
        valueChange(value,name)
    }
    useEffect(() => {
        if(editarEntindad != null){
            if (url === "consultas") {
                const mascotaConsulta = editarEntindad.mascota.id;
                const veterinariaConsulta =editarEntindad.veterinarias.id;
                let numeroEditar = {}
                numeroEditar ={
                    ...editarEntindad,
                    mascota:mascotaConsulta,
                    veterinarias:veterinariaConsulta
                }
                setnewEntidades(numeroEditar)
            }else{
            setnewEntidades(editarEntindad)
            }
        }
    }, [editarEntindad])
    
    useEffect( () => {
        listaEntidades();
    }, [url])

    const listaEntidades= async () =>{
        try {
            const listaMascota = await ListasEntidas('mascota');
            const listaVeterinarias = await ListasEntidas('veterinarias');
            const listaDuenos = await ListasEntidas('duenos');
            setApiMascota(listaMascota);
            setApiDueno(listaDuenos);
            setApiVeterinario(listaVeterinarias);
        } catch (error) {
            throw error
        }
    }
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
            return(
                    <Form.Group className="mb-3">
                        <Form.Label>{`Selecione ${columnaCampo}`}</Form.Label>
                        <Form.Select 
                        name={columnaCampo}
                        value={newEntidades[columnaCampo]}
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
                                // :<p>hola</p>
                               // LOS DEMAS SELECT
                                :   arrayEntidadeSelec.length >0
                                        ? arrayEntidadeSelec.map((opcion,index) =>{
                                            return <option 
                                            key={`${index}--${opcion.nombre}--${url}`}
                                            value={url === "consultas" ? opcion.id : opcion.nombre}
                                            >{opcion.nombre}</option> 
                                            })
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
            return (
                <Form.Group className="mb-3">
                    <Form.Label>{columnaCampo}</Form.Label>
                    <Form.Control 
                        type="text"
                        name={columnaCampo}
                        value={newEntidades[columnaCampo]}
                        onChange={handleChange}
                        placeholder={`Ingrese ${columnaCampo}`}/>
                </Form.Group>
            )
        default:
            break;
    }
}
