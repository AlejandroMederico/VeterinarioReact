const {crear,obtenerUno,listar} = require("../data-handler")
module.exports = function mascotaHandler(mascota) 
 {
    return  {
        
        get: async (data,callback) => {
            if (data.indice) {
                try {
                    const _mascota = await obtenerUno({
                        directorioEntidad: "mascota",
                        nombreArchivo: data.indice
                    });
                    console.log(_mascota);
                    return callback(200,_mascota);
                } catch (error) {
                    return callback (500,{mensaje: error.message}); 
                }    
            }
            if (
                data.query &&
                (data.query.nombre || data.query.tipo || data.query.dueno)
              ) {
                // creo un array con las llaves del objeto data query
                const llavesQuery = Object.keys(data.query);
        
                //clono el array de mascotas que viene de recursos
                // y este irá guardando los resultados
                let respuestaMascotas = [...mascota];
        
                // filtro el array de mascotas según los datos que tenga data.query
                respuestaMascotas = respuestaMascotas.filter((_mascota) => {
                  // variable resultado cambiará a true cuando alguno de los campos de la _mascota esté en los criterios
                  // de búsqueda es decir esté en alguno de los campos de data.query
                  let resultado = false;
        
                  // recorro cada una de las llaves de data.query para verificar cada uno de los campos
                  // de cada mascota e incluirla o no en el resultado final
                  for (const llave of llavesQuery) {
                    // creo una expresión regular para que
                    //la busqueda arroje resultados parciales
                    //de lo que se manda como criterio de búsqueda
                    // ejemplo si tipo = 'gat' en el query me devuelve todas las
                    //mascotas con tipo = 'gato'
                    const expresionRegular = new RegExp(data.query[llave], "ig");
        
                    // resultado acá guarda la verificación de la expresión regular en cada uno de los campos
                    resultado = _mascota[llave].match(expresionRegular);
        
                    // si resultado es diferente a falso o null (.match entrega null cuando no hay match) entonces
                    // rompemos (break) el ciclo for
                    if (resultado) {
                      break;
                    }
                  }
        
                  // null es falsy por lo tanto el filter ignorará resultado === null
                  // y los que si tengan el criterio de búsqueda entran al array respuestaMascotas
                  return resultado;
                });
                return callback(200, respuestaMascotas);
            }
            try {
                let arrayMascota = await listar({ directorioEntidad: "mascota"});
                return callback(200,arrayMascota);
            } catch (error) {
                return callback (500,{mensaje: error.message});
            }
        },
         post: (data,callback) => {
            if(data && data.payload && data.payload.id){
                crear({
                    directorioEntidad: "mascota",
                    nombreArchivo: data.payload.id,
                    datosGuardar: data.payload
                },(error) =>{
                    if(error){
                        console.log(error,"error");
                       return callback(500,{mensaje:error.message});
                    };
                    return callback(201,data.payload);
                });
            }else{
                callback(400, {
                    mensaje:
                      "hay un error porque no se envió el payload o no se creó el id",
                  });
            }
            // mascota.push(data.payload);
            //creaos algo es 201
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
                    mascota= mascota.filter((_mascota,index) => index !== data.indice);
                    return callback(204,{mensaje:`La Mascota numero ${data.indice} fue Eliminada`});
                }
                return callback (404,{mensaje:`Mascota no encontrada con el indice ${data.indice}`})
            }
            callback(404,{mensaje:`No se envio el indice`});
        }
    };
    
} 