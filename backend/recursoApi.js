module.exports ={
    mascota: [
        {tipo: "Perro", nombre: "Marley", dueno: "Alejox" },
        {tipo: "Gato", nombre: "fufu", dueno: "camilo" },
        {tipo: "Perro", nombre: "Shiro", dueno: "Jaiza" }
    ],
    veterinarias: [
        {nombre: "Marcos", apellido: "Joa", documento: "25226589" },
        {nombre: "Manzur", apellido: "Mederico", documento: "3900705" },
        {nombre: "Ramon", apellido: "Joa", documento: "153420" },
    ],
    duenos: [
        {nombre: "Alejox", apellido: "Mederico", documento: "18452886105" },
        {nombre: "camilo", apellido: "gonza", documento: "188866220" },
        {nombre: "Jaiza", apellido: "Joa", documento: "4545456654" },
    ],
    consultas: [
        {mascota: 0, 
        veterinarias: 0, 
        fechaCreacion: new Date(),
        fechaEdicion: new Date(),
        historia: '',
        diagnosticos: 'Moquillo',
        },
    ],
}