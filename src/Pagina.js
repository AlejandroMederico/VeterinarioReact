import {React, useState,useEffect, Fragment} from 'react'
import ActionMenu from './componente/ActionMenu'
import Tabla from './componente/tabla/Tabla'
import ModalGenerico from './componente/ModalGenerico'
import {ListasEntidas,EliminarEntidas} from './componente/servicio/Servicio'


export default function Pagina({titulo,url}) {
    const [modal, setModal] = useState(false)
    const [Entidad, setEntidad] = useState([])
    const [editar, seteditar] = useState()
    const [columna, setcolumna] = useState([])
    const ActivarModal = () =>setModal(true);
    const handleClose = async() => {
            setModal(false);
            seteditar(null)
            BuscarDato(url);
        };

    useEffect(() => {
        BuscarDato(url);
    }, [url])
    const BuscarDato = async (url) =>{
        try {  
                const datosApi = await ListasEntidas(url)
                setEntidad(datosApi);
                
                if (Array.isArray(datosApi) && datosApi.length >0) setcolumna(Object.keys(datosApi[0]))
                
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
    // console.log(Entidad);

    return (
            <Fragment>
                <ActionMenu ActivarModal={ActivarModal} titulo={titulo}/>
                {Entidad.length > 0 ? <Tabla Entidad={Entidad}
                                        eliminarEntidad={eliminarEntidad} 
                                        columna={columna}
                                        editarEntidad={editarEntidad}/> 
                                        : <p>Esperando datos </p> }
                <ModalGenerico 
                            modal={modal}
                            handleClose={handleClose} 
                            url={url} 
                            editarEntindad ={Entidad[editar]}
                            columna={columna}
                            numero={editar}>
                            </ModalGenerico>
            </Fragment>
           
    )
}


