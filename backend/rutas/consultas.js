module.exports = function consultasHandler({consultas,duenos,veterinarias,mascota}) 
 {
    return  {
        get: (data,callback) => {
            if (data.indice) {
                if (consultas[data.indice]) {
                    return callback(200,consultas[data.indice]);
                }
                return callback (404,{mensaje:`consulta nuero ${data.indice} no se encontrado`})
            }
            const consultasRelacionada = consultas.map((consulta) =>(
                {...consulta,
                mascota: {...mascota[consulta.mascota], id: consulta.mascota},
                veterinarias: {...veterinarias[consulta.veterinarias], id: consulta.veterinarias},
                }
            ));
            callback(200,consultasRelacionada);
        },
        post: (data,callback) => {
            let consultaActual = data.payload;
            consultaActual.fechaCreacion = new Date();
            consultaActual.fechaEdicion = null;
            consultas =[...consultas,consultaActual]
            // consultas.push(consultaActual); Se puede usar pero como se modifica el original por buenas practica es preferible no usarlo
            //creaos algo es 201
            callback(201,consultaActual);
        },
        put: (data,callback) => {
            if (data.indice) {
                if (consultas[data.indice]) {
                    const {fechaCreacion} = consultas[data.indice];
                    consultas[data.indice]={
                        ...data.payload,
                        fechaCreacion,
                        fechaEdicion: new Date(),
                    }
                    return callback(200,consultas[data.indice]);
                }
                return callback (404,{mensaje:`consulta no encontrada con el indice ${data.indice}`})
            }
            callback(404,{mensaje:`No se envio el indice`});
        },
        delete: (data,callback) => {
            if (data.indice) {
                if (consultas[data.indice]) {
                    consultas= consultas.filter((_consultas,index) => index != data.indice);
                    return callback(204,{mensaje:`La consultas numero ${data.indice} fue Eliminada`});
                }
                return callback (404,{mensaje:`consulta no encontrada con el indice ${data.indice}`})
            }
            callback(404,{mensaje:`No se envio el indice`});
        }
    };
    
} 