import {React, useState,useEffect, Fragment} from 'react'
import ActionMenu from './componente/ActionMenu'
import NavbarPagina from './componente/NavbarPagina'
import Tabla from './componente/tabla/Tabla'
import ModalGenerico from './componente/ModalGenerico'
import {ListasEntidas,EliminarEntidas} from './componente/servicio/Servicio'

export default function Pagina({titulo,url}) {
    const [modal, setModal] = useState(false)
    const [Entidad, setEntidad] = useState([])
    const [editar, seteditar] = useState()
    const ActivarModal = () =>setModal(true);
    const handleClose = async() => {
            setModal(false);
            seteditar()
            BuscarDato(url);
        };

    useEffect(() => {
        BuscarDato(url);
    }, [url])
    const BuscarDato = async (url) =>{
        try {  
                const datosApi = await ListasEntidas(url)
                setEntidad(datosApi);
                } catch (error) {
                throw error  
                }
        }

    const editarEntidad = (numero) => {   
        seteditar(numero)
        setModal(true)
    };

    const eliminarEntidad = (elim) => { 
        EliminarEntidas(url,elim).then(()=>BuscarDato(url))
    };
    console.log(Entidad);
    return (
            <Fragment>
                <ActionMenu ActivarModal={ActivarModal} titulo={titulo}/>
                {Entidad.length > 0 ? <Tabla Entidad={Entidad}
                                        eliminarEntidad={eliminarEntidad} 
                                        editarEntidad={editarEntidad}/> 
                                        : <h1>Esperando datos </h1> }
                {modal && <ModalGenerico 
                handleClose={handleClose} 
                url={url} 
                editarEntindad ={Entidad[editar]}
                numero={editar}/>}
            </Fragment>
           
    )
}


