import React from 'react'
import ActionMenu from './componente/ActionMenu'
import NavbarPagina from './componente/NavbarPagina'
import Tabla from './componente/Tabla'

export default function Pagina() {
    return (
        <div>
              <div className="container">
                    <NavbarPagina/>
                    <ActionMenu/>
                    <Tabla/>
              </div>
        </div>
    )
}
