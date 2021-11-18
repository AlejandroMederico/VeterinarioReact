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