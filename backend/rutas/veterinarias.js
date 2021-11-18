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