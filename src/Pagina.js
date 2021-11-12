import React from 'react'
import ActionMenu from './componente/ActionMenu'
import Modal from './componente/Modal'
import Nav from './componente/Nav'
import Tabla from './componente/Tabla'

export default function Pagina() {
    return (
        <div>
              <div className="container">
                    <Nav/>
                    <ActionMenu/>
                    <Tabla/>
              </div>
              <Modal/>
        </div>
    )
}
