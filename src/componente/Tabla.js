import React from 'react'

export default function Tabla() {
    return (
        <table className="table table-stripped table-hover">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Dueño</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody id="lista-mascotas">
                
            </tbody>
        </table>
    )
}
