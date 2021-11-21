const fs = require("fs");
const path = require("path");
const util = require("util")

// eslint-disable-next-line no-undef
const directorioBase = path.join(__dirname,"data");

const readFilePromesa = util.promisify(fs.readFile)


// const readFilePromesa = ({rutaArchivo}) =>{
//     return new Promise ((resolve,reject) =>{
//         fs.readFile(rutaArchivo,"utf-8", (error,data) =>{
//             if(error ){
//                 return reject(new Error ("No se pudo leer el archivo o ya existe ")) ;
//             }
//             return resolve(JSON.parse(data));
//         });
//     })
// }

/// con libreria para convertir en promesa

const dataHandler = {
    crear: ({directorioEntidad,nombreArchivo,datosGuardar},callback)=>{
        fs.open(`${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`,
        "wx",
        (error,filedescripcion) =>{
            if (!error && filedescripcion) {
                const datoString= JSON.stringify(datosGuardar);
                fs.write(filedescripcion,datoString, error2 =>{
                    if(error2) {
                    return callback(new Error ("No pudo escribir en el archivo"));
                    };
                });
                fs.close(filedescripcion, error3 =>{
                    if(error3) {
                    return callback(new Error ("No pudo cerrar el archivo"));
                    };
                    callback(false);
                });
            } else {
                callback(new Error ("No se pudo crear el archivo o ya existe ")) ;
            };
        });
    },
    obtenerUno: async({directorioEntidad,nombreArchivo}) =>{
       try {
           const entidadUno = await readFilePromesa(
            `${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`,"utf-8")
            return JSON.parse(entidadUno);    
       } catch (error) {
        new Error (`No se pudo leer el archivo ${nombreArchivo} o ya existe` )
       }
    },
    listar: async({directorioEntidad}) =>{
        try {
            let files = await fs.promises.readdir(`${directorioBase}/${directorioEntidad}/`);
                files = files.filter(nombreCarpeta => nombreCarpeta.includes(".json"));
                const arrayPromesaLeerArchivo = files.map(entidad =>{
                    return fs.promises.readFile(
                        `${directorioBase}/${directorioEntidad}/${entidad}`,
                        {encoding:"utf-8"}  
                    );
                });
                let datosArchivos = await Promise.all(arrayPromesaLeerArchivo);
                datosArchivos =datosArchivos.map(JSON.parse);
                return (false,datosArchivos);  
        } catch (error) {
            return (new Error (`No se pudo leer el archivo o ya existe de la carpeta ${directorioEntidad}`))
        }
    },
};
module.exports =dataHandler;