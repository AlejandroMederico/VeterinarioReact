const {crear,obtenerUno,listar, actualizar, eliminar} = require("../data-handler")
module.exports = function consultasHandler({consultas,duenos,veterinarias,mascota}) 
 {
    return  {
        get:async (data,callback) => {
            if (data.indice) {
                try {
                    const resultado = await obtenerUno({
                        directorioEntidad: "consultas",
                        nombreArchivo: data.indice
                    });
                    const mascotaUna = await obtenerUno({
                    directorioEntidad: "mascota",
                    nombreArchivo: resultado.mascota});
                    const veterinariasUna = await obtenerUno({
                    directorioEntidad: "veterinarias",
                    nombreArchivo: resultado.veterinarias});
                
                    let resultadoUna = {
                        ...resultado,
                        mascota: mascotaUna,
                        veterinarias: veterinariasUna
                    }
                    
                    return callback(200,resultadoUna);
                } catch (error) {
                    return callback (500,{mensaje: error.message}); 
                }    
            }
            // if (data.indice) {
            //     if (consultas[data.indice]) {
            //         return callback(200,consultas[data.indice]);
            //     }
            //     return callback (404,{mensaje:`consulta nuero ${data.indice} no se encontrado`})
            // }
            let _consultas = await listar({ directorioEntidad: "consultas"});
            if(_consultas.error){
                return callback (500,{mensaje: _consultas.message});
            }   
            if(data.query && (
                ( data.query.mascota )
                || (data.query.veterinarias )
                || (data.query.historia )
                || (data.query.diagnosticos )
                
            )){
                const keyQuery = Object.keys(data.query)
                _consultas = _consultas.filter(consultas_ => {
                    let resultado = false;
                    for (const llave of keyQuery) {
                        const expreRegular = new RegExp(data.query[llave],"ig")
                            if(llave === "fechaCreacion" || llave === "fechaEdicion" ){
                            continue
                            }
                            if(llave === "historia" || llave === "diagnosticos" ){
                            resultado = consultas_[llave].match(expreRegular)
                            if (resultado) {
                                break;
                              }
                            }
                            if(llave === "mascota" || llave === "veterinarias" ){
                            resultado = consultas_[llave] == data.query[llave]
                            if (resultado) {
                                break;
                              }
                            }
                        }
                        return resultado
                });
            }
            let respuesta = [];
            for (const consulta of _consultas) {
                respuesta = [
                ...respuesta,
                {
                    ...consulta,
                    mascota: await obtenerUno({
                    directorioEntidad: "mascota",
                    nombreArchivo: consulta.mascota,
                    }),
                    veterinarias: await obtenerUno({
                    directorioEntidad: "veterinarias",
                    nombreArchivo: consulta.veterinarias,
                    }),
                },
            ];
            }
            return callback(200,respuesta);
        },
        post: async (data,callback) => {
            if(data && data.payload && data.payload.id){
                let consultaActual = data.payload;
                    consultaActual.fechaCreacion = new Date();
                    consultaActual.fechaEdicion = null;
                const resultado = await crear({
                    directorioEntidad: "consultas",
                    nombreArchivo: data.payload.id,
                    datosGuardar: consultaActual});
                    return callback(201,resultado);
            }else{
                return callback(400, {
                    mensaje:
                      "hay un error porque no se envió el payload o no se creó el id",
                  });
            }
        },
        put: async(data,callback) => {
            if (data.indice) {
                const datosActuales = {
                    ...data.payload,
                    id:data.indice,
                    fechaEdicion: new Date()
                }
                const resultado = await actualizar(
                    {directorioEntidad: "consultas",
                    nombreArchivo: data.indice,
                    datosGuardar: datosActuales}
                )
                if(resultado.id){
                    return callback(200,resultado);
                }
                if(resultado.message){
                    return callback (404,{mensaje:`Consultas no encontrada con el indice ${data.indice}`})
                }  
            }
            callback(404,{mensaje:`No se envio el indice`});
        },
        delete: async (data,callback) => {
            if (data.indice) {
                await eliminar(
                    {directorioEntidad: "consultas", 
                    nombreArchivo: data.indice});
                    if(eliminar.error){
                        return callback (404,{mensaje:`consulta no encontrada con el indice ${data.indice}`})
                    }
                    return callback(204);
            }
            callback(404,{mensaje:`No se envio el indice`});
        }
    };
    
} 