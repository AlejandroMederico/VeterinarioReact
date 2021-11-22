const {crear,obtenerUno,listar, actualizar, eliminar} = require("../data-handler")
module.exports = function mascotaHandler() 
 {
    return  {
        
        get: async (data,callback) => {
            if (data.indice) {
                try {
                    const _mascota = await obtenerUno({
                        directorioEntidad: "mascota",
                        nombreArchivo: data.indice
                    });
                    return callback(200,_mascota);
                } catch (error) {
                    return callback (500,{mensaje: error.message}); 
                }    
            }
            if (
                data.query &&
                (data.query.nombre || data.query.tipo || data.query.dueno)
              ) {
                const arrayMascota = await listar({ directorioEntidad: "mascota"});
                // creo un array con las llaves del objeto data query
                const llavesQuery = Object.keys(data.query);
                let respuestaMascotas = [...arrayMascota];
                console.log(respuestaMascotas);
                respuestaMascotas = respuestaMascotas.filter((_mascota) => {
                  let resultado = false;
                  for (const llave of llavesQuery) {
                    const expresionRegular = new RegExp(data.query[llave], "ig");
                    resultado = _mascota[llave].match(expresionRegular);
                    if (resultado) {
                      break;
                    }
                  }
                  return resultado;
                });
                return callback(200, respuestaMascotas);
            }
            try {
                let arrayMascota = await listar({ directorioEntidad: "mascota"});
                return callback(200,arrayMascota);
            } catch (error) {
                return callback (500,{mensaje: error.message});
            }
        },
         post: async (data,callback) => {
            if(data && data.payload && data.payload.id){
                const resultado = await crear({
                    directorioEntidad: "mascota",
                    nombreArchivo: data.payload.id,
                    datosGuardar: data.payload});
                    return callback(201,resultado);
            }else{
                return callback(400, {
                    mensaje:
                      "hay un error porque no se envió el payload o no se creó el id",
                  });
            }
        },
        put: async (data,callback) => {
            if (data.indice) {
                    const datosActuales = {...data.payload,id:data.indice}
                    const resultado = await actualizar(
                        {directorioEntidad: "mascota",
                        nombreArchivo: data.indice,
                        datosGuardar: datosActuales}
                    )
                    if(resultado.id){
                        return callback(200,resultado);
                    }
                    if(resultado.message){
                        return callback (404,{mensaje:`Mascota no encontrada con el indice ${data.indice}`})
                    }  
            }
            callback(404,{mensaje:`No se envio el indice`});
        },
        delete: async (data,callback) => {
                if (data.indice) {
                    await eliminar(
                        {directorioEntidad: "mascota", nombreArchivo: data.indice});
                    return callback(204);
                }
                else{
                    return callback(400,
                        {mensaje:"hay un error porque no se envió el payload o no se creó el id"});
                }
        }
    };
    
} 