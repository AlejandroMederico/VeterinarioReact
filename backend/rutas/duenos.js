const {crear,obtenerUno,listar, actualizar, eliminar} = require("../data-handler")
module.exports = function duenosHandler() 
 {
    return  {
        
        get: async (data,callback) => {
            if (data.indice) {
                try {
                    const _duenos = await obtenerUno({
                        directorioEntidad: "duenos",
                        nombreArchivo: data.indice
                    });
                    return callback(200,_duenos);
                } catch (error) {
                    return callback (500,{mensaje: error.message}); 
                }    
            }
            if (
                data.query &&
                (data.query.nombre || data.query.apellido || data.query.documento)
              ) {
                const arrayduenos = await listar({ directorioEntidad: "duenos"});
                const llavesQuery = Object.keys(data.query);
                let respuestaduenoss = [...arrayduenos];
                respuestaduenoss = respuestaduenoss.filter((_duenos) => {
                  let resultado = false;
                  for (const llave of llavesQuery) {
                    const expresionRegular = new RegExp(data.query[llave], "ig");
                    resultado = _duenos[llave].match(expresionRegular);
                    if (resultado) {
                      break;
                    }
                  }
                  return resultado;
                });
                return callback(200, respuestaduenoss);
            }
            try {
                let arrayduenos = await listar({ directorioEntidad: "duenos"});
                return callback(200,arrayduenos);
            } catch (error) {
                return callback (500,{mensaje: error.message});
            }
        },
         post: async (data,callback) => {
            if(data && data.payload && data.payload.id){
                const resultado = await crear({
                    directorioEntidad: "duenos",
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
                        {directorioEntidad: "duenos",
                        nombreArchivo: data.indice,
                        datosGuardar: datosActuales}
                    )
                    if(resultado.id){
                        return callback(200,resultado);
                    }
                    if(resultado.message){
                        return callback (404,{mensaje:`duenos no encontrada con el indice ${data.indice}`})
                    }  
            }
            callback(404,{mensaje:`No se envio el indice`});
        },
        delete: async (data,callback) => {
                if (data.indice) {
                    await eliminar(
                        {directorioEntidad: "duenos", nombreArchivo: data.indice});
                    return callback(204);
                }
                else{
                    return callback(400,
                        {mensaje:"hay un error porque no se envió el payload o no se creó el id"});
                }
        }
    };
    
} 