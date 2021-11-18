module.exports = function mascotaHandler(mascota) 
 {
    return  {
        get: (data,callback) => {
            if (data.indice) {
                if (mascota[data.indice]) {
                    return callback(200,mascota[data.indice]);
                }
                return callback (404,{mensaje:`Mascota nuero ${data.indice} no se encontrado`})
            }
            callback(200,mascota);
        },
        post: (data,callback) => {
            mascota.push(data.payload);
            //creaos algo es 201
            callback(201,data.payload);
        },
        put: (data,callback) => {
            if (data.indice) {
                if (mascota[data.indice]) {
                    mascota[data.indice]= data.payload;
                    return callback(200,mascota[data.indice]);
                }
                return callback (404,{mensaje:`Mascota no encontrada con el indice ${data.indice}`})
            }
            callback(404,{mensaje:`No se envio el indice`});
        },
        delete: (data,callback) => {
            if (data.indice) {
                if (mascota[data.indice]) {
                    mascota= mascota.filter((_mascota,index) => index != data.indice);
                    return callback(204,{mensaje:`La Mascota numero ${data.indice} fue Eliminada`});
                }
                return callback (404,{mensaje:`Mascota no encontrada con el indice ${data.indice}`})
            }
            callback(404,{mensaje:`No se envio el indice`});
        }
    };
    
} 