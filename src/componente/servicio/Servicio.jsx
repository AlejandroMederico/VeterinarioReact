const urlBasica ="https://veterinaria-vanilla-backend.vercel.app";


export  async function ListasEntidas({url="mascota"}) {
    try {
        const respuesta = await fetch(`${urlBasica}/${url}`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        return error 
    }
}
export  async function CrearEntidas({url="mascota"}) {
    try {
        const respuesta = await fetch(`${urlBasica}/${url}`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        return error 
    }
}
