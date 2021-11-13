import {React, useState} from 'react'
import ActionMenu from './componente/ActionMenu'
import NavbarPagina from './componente/NavbarPagina'
import Tabla from './componente/tabla/Tabla'
import ModalGenerico from './componente/ModalGenerico'

export default function Pagina() {
    const [modal, setModal] = useState(false)
    const ActivarModal = () =>setModal(true);
    const handleClose = () => setModal(false);
    return (
            <div className="container">
                    <NavbarPagina/>
                    <ActionMenu ActivarModal={ActivarModal}/>
                    <Tabla/>
                    {modal && <ModalGenerico handleClose={handleClose}/>}
            </div>
    )
}


