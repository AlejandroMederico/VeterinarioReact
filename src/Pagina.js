import {React, useState,useEffect} from 'react'
import ActionMenu from './componente/ActionMenu'
import NavbarPagina from './componente/NavbarPagina'
import Tabla from './componente/tabla/Tabla'
import ModalGenerico from './componente/ModalGenerico'
import {ListasEntidas} from './componente/servicio/Servicio'

export default function Pagina({titulo,url}) {
    const [modal, setModal] = useState(false)
    const ActivarModal = () =>setModal(true);
    const handleClose = () => setModal(false);
    const [Entidad, setEntidad] = useState([])
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

    return (
            <div className="container">
                    <NavbarPagina/>
                    <ActionMenu ActivarModal={ActivarModal} titulo={titulo}/>
                    {Entidad.length > 0 ? <Tabla Entidad={Entidad}/> : <h1>Esperando datos </h1> }
                    {modal && <ModalGenerico handleClose={handleClose} url={url}/>}
            </div>
    )
}


