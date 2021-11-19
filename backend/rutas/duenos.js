module.exports = function duenosHandler(duenos) 
 {
    return  {
        get: (data,callback) => {
            if (data.indice) {
                if (duenos[data.indice]) {
                    return callback(200,duenos[data.indice]);
                }
                return callback (404,{mensaje:`dueno nuero ${data.indice} no se encontrado`})
            }
            if (
                data.query &&
                (data.query.nombre || data.query.apellido || data.query.documento)
              ) {
                const llavesQuery = Object.keys(data.query);
                let respuestaduenos = [...duenos];
                respuestaduenos = respuestaduenos.filter((_duenos) => {
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
                return callback(200, respuestaduenos);
            }
            callback(200,duenos);
        },
        post: (data,callback) => {
            duenos.push(data.payload);
            //creaos algo es 201
            callback(201,data.payload);
        },
        put: (data,callback) => {
            if (data.indice) {
                if (duenos[data.indice]) {
                    duenos[data.indice]= data.payload;
                    return callback(200,duenos[data.indice]);
                }
                return callback (404,{mensaje:`dueno no encontrada con el indice ${data.indice}`})
            }
            callback(404,{mensaje:`No se envio el indice`});
        },
        delete: (data,callback) => {
            if (data.indice) {
                if (duenos[data.indice]) {
                    duenos= duenos.filter((_duenos,index) => index != data.indice);
                    return callback(204,{mensaje:`La duenos numero ${data.indice} fue Eliminada`});
                }
                return callback (404,{mensaje:`dueno no encontrada con el indice ${data.indice}`})
            }
            callback(404,{mensaje:`No se envio el indice`});
        }
    };
    
} 