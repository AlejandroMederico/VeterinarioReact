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
            if(data.query && (
                (typeof data.query.nombre !== "undefined")
                || (data.query.apellido !== "undefined")
                || (data.query.documento !== "undefined")
                
            )){
                const keyQuery = Object.keys(data.query)
                let duenosQuery = [...duenos]
                keyQuery.forEach( llave => {
                    //exprecion regular si es ig = no importa mayuscula y minuscia
                    const expreRegular = new RegExp(data.query[llave],"ig")
                    //evaluar todas las entidades
                    duenosQuery = duenosQuery.filter(_duenos => {
                        //verificar cada entinda con cada key si posee la exprecon regular 
                        const resultado = _duenos[llave].match(expreRegular)
                        // console.log(resultado);
                        // _duenos[llave] === data.query[llave] 
                        //si retorna true es el objeto y como estamos en filter lo devulves completo
                        return resultado
                    })
                });
                return callback(200,duenosQuery);
            }
            callback(200,duenos);
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