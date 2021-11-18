const urlBasica ="http://localhost:5000";


export  async function ListasEntidas(url) {
    try {
        const respuesta = await fetch(`${urlBasica}/${url}`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        return error 
    }
}
export  async function CrearEditarEntidas(url,method,objeto={},id=null) {
    try {
        let urlEntindad 
        if (method === "PUT") {
            urlEntindad =`${urlBasica}/${url}/${id}`;
        }
        if (method === "POST") {
            urlEntindad = `${urlBasica}/${url}`
        }

        const respuesta = await fetch(urlEntindad,{
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(objeto),
            mode: "cors",
          });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        return error 
    }
}
export  async function EliminarEntidas(url,id=null) {
    try {
        let urlEntindad =`${urlBasica}/${url}/${id}`
        const respuesta = await fetch(urlEntindad,{
            method:"DELETE"
          });
        return respuesta;
    } catch (error) {
        return error 
    }
}
