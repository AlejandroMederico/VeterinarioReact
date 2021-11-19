module.exports = function veterinariasHandler(veterinarias) 
 {
    return  {
        get: (data,callback) => {
            if (data.indice) {
                if (veterinarias[data.indice]) {
                    return callback(200,veterinarias[data.indice]);
                }
                return callback (404,{mensaje:`veterinaria nuero ${data.indice} no se encontrado`})
            }
            //busqueda de modal
            if (
                data.query &&
                (data.query.nombre || data.query.apellido || data.query.documento)
              ) {
                const llavesQuery = Object.keys(data.query);
                let respuestaveterinariass = [...veterinarias];
                respuestaveterinariass = respuestaveterinariass.filter((_veterinarias) => {
                  let resultado = false;
                  for (const llave of llavesQuery) {
                    const expresionRegular = new RegExp(data.query[llave], "ig");
                    resultado = _veterinarias[llave].match(expresionRegular);
                    if (resultado) {
                      break;
                    }
                  }
                  return resultado;
                });
                return callback(200, respuestaveterinariass);
            }
            
            callback(200,veterinarias);
        },
        post: (data,callback) => {
            veterinarias.push(data.payload);
            //creaos algo es 201
            callback(201,data.payload);
        },
        put: (data,callback) => {
            if (data.indice) {
                if (veterinarias[data.indice]) {
                    veterinarias[data.indice]= data.payload;
                    return callback(200,veterinarias[data.indice]);
                }
                return callback (404,{mensaje:`veterinaria no encontrada con el indice ${data.indice}`})
            }
            callback(404,{mensaje:`No se envio el indice`});
        },
        delete: (data,callback) => {
            if (data.indice) {
                if (veterinarias[data.indice]) {
                    veterinarias= veterinarias.filter((_veterinarias,index) => index != data.indice);
                    return callback(204,{mensaje:`La veterinarias numero ${data.indice} fue Eliminada`});
                }
                return callback (404,{mensaje:`veterinaria no encontrada con el indice ${data.indice}`})
            }
            callback(404,{mensaje:`No se envio el indice`});
        }
    };
    
} 