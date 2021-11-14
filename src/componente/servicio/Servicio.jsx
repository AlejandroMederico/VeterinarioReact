const urlBasica ="https://veterinaria-vanilla-backend.vercel.app";


export  async function ListasEntidas(url) {
    try {
        const respuesta = await fetch(`${urlBasica}/${url}`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        return error 
    }
}
export  async function CrearEditarEntidas(url,method='POST',objeto={},id=null) {
    try {
        let urlEntindad =`${urlBasica}/${url}`
        if (method === "PUT" && id) {
            urlEntindad += `/${id}`;
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
