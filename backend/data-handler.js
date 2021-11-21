const { assert } = require("console");
const fs = require("fs");
const path = require("path");

// eslint-disable-next-line no-undef
const directorioBase = path.join(__dirname,"data");
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
    obtenerUno: ({directorioEntidad,nombreArchivo},callback) =>{
        fs.readFile(`${directorioBase}/${directorioEntidad}/${nombreArchivo}.json`,
        "utf-8",
        (error,data) =>{
            if(!error && data){
                callback(false,JSON.parse(data));
            }else{
                callback(new Error ("No se pudo leer el archivo o ya existe ")) ;
            }
        });
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