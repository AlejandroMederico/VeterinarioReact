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
            let _consultas = [...consultas]
            if(data.query && (
                (typeof data.query.mascota !== "undefined")
                || (data.query.veterinarias !== "undefined")
                || (data.query.historia !== "undefined")
                || (data.query.diagnosticos !== "undefined")
                
            )){
                const keyQuery = Object.keys(data.query)
                keyQuery.forEach( llave => {
                    //exprecion regular si es ig = no importa mayuscula y minuscia
                    const expreRegular = new RegExp(data.query[llave],"ig")
                    //evaluar todas las entidades
                    _consultas = _consultas.filter(consultas_ => {
                        let resultado = false;
                        if(llave === "historia" || llave === "diagnosticos" ){
                            //verificar cada entinda con cada key si posee la exprecon regular 
                         resultado = consultas_[llave].match(expreRegular)
                        }
                        if(llave === "mascota" || llave === "veterinarias" ){
                         resultado = consultas_[llave] == data.query[llave]
                        }
                        // console.log(resultado);
                        // _veterinarias[llave] === data.query[llave] 
                        //si retorna true es el objeto y como estamos en filter lo devulves completo
                        return resultado
                    })
                });
            }
            const consultasRelacionada = _consultas.map((consulta) =>(
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
                    consultas= consultas.filter((_consultas,index) => index !== data.indice);
                    return callback(204,{mensaje:`La consultas numero ${data.indice} fue Eliminada`});
                }
                return callback (404,{mensaje:`consulta no encontrada con el indice ${data.indice}`})
            }
            callback(404,{mensaje:`No se envio el indice`});
        }
    };
    
} 