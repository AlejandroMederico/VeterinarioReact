const fs = require("fs");
const path = require("path");
const util = require("util");

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
    crear: async({directorioEntidad,nombreArchivo,datosGuardar})=>{
        try {
            const filedescripcion = await fs.promises.open(
                `${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`,
                "wx");
            const dataString = JSON.stringify(datosGuardar);
            await fs.promises.writeFile(filedescripcion,dataString);
            // No se cierra con fs.close porque writeFile ya lo cierra pero da error y se usa el de abajo
            await filedescripcion?.close();
            return datosGuardar;
        } catch (error) {
           return error; 
        }
    },
    obtenerUno: async({directorioEntidad,nombreArchivo}) =>{
       try {
           const entidadUno = await readFilePromesa(
            `${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`,"utf-8")
            return JSON.parse(entidadUno);    
       } catch (error) {
        return new Error (`No se pudo leer el archivo ${nombreArchivo} o ya existe` )
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
    actualizar: async({directorioEntidad,nombreArchivo,datosGuardar})=>{
        try {
            const direccionExita = fs.existsSync(
                `${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`)
            if (!direccionExita) {
               return new Error (`No se pudo leer el archivo ${nombreArchivo} o ya existe` )
            }
            const datosAnteriores = await dataHandler.obtenerUno({
                directorioEntidad,nombreArchivo
            })
            const datosActualizados = {...datosAnteriores,...datosGuardar}
            await fs.promises.unlink(`${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`);
            const filedescripcion = await fs.promises.open(
                `${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`,
                "wx");
            const dataString = JSON.stringify(datosActualizados);
            await fs.promises.writeFile(filedescripcion,dataString);
            // No se cierra con fs.close porque writeFile ya lo cierra pero da error y se usa el de abajo
            await filedescripcion?.close();
            return datosGuardar;
        } catch (error) {
           return error; 
        }
    },
    eliminar: async({directorioEntidad,nombreArchivo})=>{
        try {
            const direccionExita = fs.existsSync(
                `${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`)
            if (!direccionExita) {
               return new Error (`No se pudo leer el archivo ${nombreArchivo} o no existe` )
            }
            await fs.promises.unlink(`${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`);
            return nombreArchivo
        } catch (error) {
           return error; 
        }
    },
};
module.exports =dataHandler;