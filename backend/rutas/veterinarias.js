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
            if(data.query && (
                (typeof data.query.nombre !== "undefined")
                || (data.query.apellido !== "undefined")
                || (data.query.documento !== "undefined")
                
            )){
                const keyQuery = Object.keys(data.query)
                let veterinariasQuery = [...veterinarias]
                keyQuery.forEach( llave => {
                    //exprecion regular si es ig = no importa mayuscula y minuscia
                    const expreRegular = new RegExp(data.query[llave],"ig")
                    //evaluar todas las entidades
                    veterinariasQuery = veterinariasQuery.filter(_veterinarias => {
                        //verificar cada entinda con cada key si posee la exprecon regular 
                        const resultado = _veterinarias[llave].match(expreRegular)
                        // console.log(resultado);
                        // _veterinarias[llave] === data.query[llave] 
                        //si retorna true es el objeto y como estamos en filter lo devulves completo
                        return resultado
                    })
                });
                return callback(200,veterinariasQuery);
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