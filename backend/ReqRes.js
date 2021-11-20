
module.exports = (req, res) => {
    const url = require('url');
    const { StringDecoder } = require('string_decoder');
    const enrutador = require("./enrutador");
    const {numeroAlatorio}= require("./util")

    // 1. obetener la URL des req
    const urlActual = req.url;
    const urlParceada = url.parse(urlActual,true);
    // console.log(req.url);
    // console.log(urlParceada);

    // 2. obetener la ruta
    const ruta= urlParceada.pathname;

    // 3 quitar / a la ruta
    const rutaLimpia= ruta.replace(/^\/+|\/+$/g, '');

    //3.1 obtener metodo https
    const metodo=req.method.toLowerCase();

    //3.1.1 permiso CORNS CON HEADER
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Request-Headers", "*");

    //3.1.2 Respuesta el browser
    if (metodo === "options") {
        res.writeHead(200);
        res.end();
        return
    }
    //3.2 obtener los querry
    const {query ={}} =urlParceada;

    //3.3 obtener los header
    const {headers = {}}= req;

    //3.4 obtener Payload 
    const decoder = new StringDecoder('utf-8');
    let buffer=""

    // 3.4.1 acomulando la data cuando reciba payload
    req.on("data", (data) =>{
        buffer += decoder.write(data);
    });

    //3.4.2 terminar de acomular dato y decirle a decoder finalizar
    req.on("end", () =>{
        buffer += decoder.end();

        if (headers['content-type'] === 'application/json' ) {
            buffer = JSON.parse(buffer);
        }

        //3.4.3 verifica si tiene sub - rutas en este caso es indeci del array mascotas
        if(rutaLimpia.indexOf('/') > -1){
            var [rutaPrincial, indice] = rutaLimpia.split("/");
        }else{
            rutaPrincial=rutaLimpia;
        };

        //3.5 Ordenar la data del request
        let data={
            indice,
            ruta: rutaPrincial,
            query,
            metodo,
            headers,
            payload: buffer
        }

        if(metodo === "post" && data.payload){
            data.payload.id = numeroAlatorio()
        }
        // console.log(data);

        //3.6 Elegir el manejador depemdedo de la ruta //handler
        let handler;
        if (rutaPrincial && enrutador[rutaPrincial] && enrutador[rutaPrincial][metodo]) {
            handler = enrutador[rutaPrincial][metodo];
        }else{
            handler = enrutador.noEncontrado;
        };

        // 4. ejecutar handler para enviar la repuesta
        if (typeof handler === 'function') {
            handler(data,(statusCode=200, mensaje) =>{
                const respuesta = JSON.stringify(mensaje);
                res.setHeader("Content-Type", "application/json")
                res.writeHead(statusCode);
                // Linea donde realmente estamos reponiendo a la aplicacion respuesa
                res.end(respuesta);
            });
        };
    });

   
    
}