const recursoApi = require('./recursoApi');
const EnrutadorMascota = require('./rutas/mascotas');
const EnrutadorVeterinarias = require('./rutas/veterinarias');
const EnrutadorDuenos = require('./rutas/duenos');
const EnrutadorConsultas = require('./rutas/consultas');

module.exports ={
    ruta: (data,callback) => {
        callback(200,{mensaje: "esta es la /ruta"})
    },
    mascota: EnrutadorMascota (recursoApi.mascota),
    veterinarias: EnrutadorVeterinarias (recursoApi.veterinarias),
    duenos: EnrutadorDuenos (recursoApi.duenos),
    consultas: EnrutadorConsultas (recursoApi),
    noEncontrado: (data,callback) =>{
        callback (404,{mensaje: "No encontrado"})
    }
}