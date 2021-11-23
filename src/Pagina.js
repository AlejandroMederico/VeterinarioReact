import {React, useState,useEffect, Fragment} from 'react'
import ActionMenu from './componente/ActionMenu'
import Tabla from './componente/tabla/Tabla'
import ModalGenerico from './componente/ModalGenerico'
import {ListasEntidas,EliminarEntidas, buscarUnaEntidad} from './componente/servicio/Servicio'


export default function Pagina({titulo,url,busquedaGenerica}) {
    const [modal, setModal] = useState(false)
    const [Entidad, setEntidad] = useState([])
    const [editar, seteditar] = useState(null)
    const [columna, setcolumna] = useState([])
    const [numeroEditar, setnumeroEditar] = useState(null)
    const ActivarModal = () =>setModal(true);
    const handleClose = async() => {
            setModal(false);
            seteditar(null)
            BuscarDato(url);
        };

    useEffect(() => {
        BuscarDato(url,busquedaGenerica);
    }, [url,busquedaGenerica])


    const BuscarDato = async (url,buscar) =>{
        try {  
                const datosApi = await ListasEntidas(url,buscar)
                setEntidad(datosApi);
                
                if (Array.isArray(datosApi) && datosApi.length >0) {
                    setcolumna(Object.keys(datosApi[0]).filter(col => col !== "id"))
                }
                
                } catch (error) {
                throw error  
                }
        }

    const editarEntidad = async (numero) => {  
        try {
            const resultado = await buscarUnaEntidad(url,numero);
            console.log(resultado); 
            seteditar(resultado);
            setnumeroEditar(numero);
            setModal(true);
            
        } catch (error) {
           throw error 
        }
    };

    const eliminarEntidad = async(elim) => { 
        try { console.log(url,elim);
            await EliminarEntidas(url,elim)
            BuscarDato(url)
            
        } catch (error) {
            throw error
        }
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
                            editarEntindad ={editar}
                            columna={columna}
                            numero={numeroEditar}>
                            </ModalGenerico>
            </Fragment>
           
    )
}


