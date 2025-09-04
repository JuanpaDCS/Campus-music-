// test_dataset.js - Poblamiento de la base de datos con datos de prueba
// Campus Music - Datos realistas para testing

use('campus_music');

// 1. INSERTAR SEDES (3 sedes)
const sedes = [
  {
    _id: ObjectId("650a1234567890123456001"),
    nombre: "Sede Bogotá Centro",
    ciudad: "Bogotá",
    direccion: "Carrera 7 # 45-32, La Candelaria",
    telefono: "601-234-5678",
    capacidad: 150,
    activa: true,
    fechaCreacion: new Date("2024-01-15")
  },
  {
    _id: ObjectId("650a1234567890123456002"),
    nombre: "Sede Medellín Laureles",
    ciudad: "Medellín",
    direccion: "Circular 73 # 44-25, Laureles",
    telefono: "604-876-5432",
    capacidad: 120,
    activa: true,
    fechaCreacion: new Date("2024-02-20")
  },
  {
    _id: ObjectId("650a1234567890123456003"),
    nombre: "Sede Cali Norte",
    ciudad: "Cali",
    direccion: "Avenida 6N # 23-15, Versalles",
    telefono: "602-345-6789",
    capacidad: 100,
    activa: true,
    fechaCreacion: new Date("2024-03-10")
  }
];

db.sedes.insertMany(sedes);

// 2. INSERTAR PROFESORES (10 profesores)
const profesores = [
  {
    _id: ObjectId("651a1234567890123456001"),
    nombre: "Carlos Andrés Ruiz",
    documento: "12345678",
    email: "carlos.ruiz@campusmusic.com",
    telefono: "300-123-4567",
    especialidades: ["piano", "teoria_musical"],
    experiencia: 8,
    sedesAsignadas: [ObjectId("650a1234567890123456001")],
    activo: true,
    fechaContratacion: new Date("2024-01-20")
  },
  {
    _id: ObjectId("651a1234567890123456002"),
    nombre: "María Elena Gómez",
    documento: "23456789",
    email: "maria.gomez@campusmusic.com",
    telefono: "301-234-5678",
    especialidades: ["guitarra", "canto"],
    experiencia: 12,
    sedesAsignadas: [ObjectId("650a1234567890123456001"), ObjectId("650a1234567890123456002")],
    activo: true,
    fechaContratacion: new Date("2024-01-25")
  },
  {
    _id: ObjectId("651a1234567890123456003"),
    nombre: "José Luis Hernández",
    documento: "34567890",
    email: "jose.hernandez@campusmusic.com",
    telefono: "302-345-6789",
    especialidades: ["violin", "teoria_musical"],
    experiencia: 15,
    sedesAsignadas: [ObjectId("650a1234567890123456002")],
    activo: true,
    fechaContratacion: new Date("2024-02-01")
  },
  {
    _id: ObjectId("651a1234567890123456004"),
    nombre: "Ana Patricia Torres",
    documento: "45678901",
    email: "ana.torres@campusmusic.com",
    telefono: "303-456-7890",
    especialidades: ["bateria", "bajo"],
    experiencia: 6,
    sedesAsignadas: [ObjectId("650a1234567890123456003")],
    activo: true,
    fechaContratacion: new Date("2024-02-15")
  },
  {
    _id: ObjectId("651a1234567890123456005"),
    nombre: "Roberto Jiménez",
    documento: "56789012",
    email: "roberto.jimenez@campusmusic.com",
    telefono: "304-567-8901",
    especialidades: ["saxofon", "flauta"],
    experiencia: 10,
    sedesAsignadas: [ObjectId("650a1234567890123456001"), ObjectId("650a1234567890123456003")],
    activo: true,
    fechaContratacion: new Date("2024-03-01")
  },
  {
    _id: ObjectId("651a1234567890123456006"),
    nombre: "Sofía Ramírez",
    documento: "67890123",
    email: "sofia.ramirez@campusmusic.com",
    telefono: "305-678-9012",
    especialidades: ["piano", "canto"],
    experiencia: 7,
    sedesAsignadas: [ObjectId("650a1234567890123456002")],
    activo: true,
    fechaContratacion: new Date("2024-03-15")
  },
  {
    _id: ObjectId("651a1234567890123456007"),
    nombre: "Miguel Ángel Vargas",
    documento: "78901234",
    email: "miguel.vargas@campusmusic.com",
    telefono: "306-789-0123",
    especialidades: ["guitarra", "bajo"],
    experiencia: 9,
    sedesAsignadas: [ObjectId("650a1234567890123456001")],
    activo: true,
    fechaContratacion: new Date("2024-04-01")
  },
  {
    _id: ObjectId("651a1234567890123456008"),
    nombre: "Laura Beatriz Moreno",
    documento: "89012345",
    email: "laura.moreno@campusmusic.com",
    telefono: "307-890-1234",
    especialidades: ["violin", "flauta"],
    experiencia: 11,
    sedesAsignadas: [ObjectId("650a1234567890123456003")],
    activo: true,
    fechaContratacion: new Date("2024-04-15")
  },
  {
    _id: ObjectId("651a1234567890123456009"),
    nombre: "Diego Alejandro Castro",
    documento: "90123456",
    email: "diego.castro@campusmusic.com",
    telefono: "308-901-2345",
    especialidades: ["bateria", "teoria_musical"],
    experiencia: 5,
    sedesAsignadas: [ObjectId("650a1234567890123456002")],
    activo: true,
    fechaContratacion: new Date("2024-05-01")
  },
  {
    _id: ObjectId("651a1234567890123456010"),
    nombre: "Valentina Ospina",
    documento: "01234567",
    email: "valentina.ospina@campusmusic.com",
    telefono: "309-012-3456",
    especialidades: ["canto", "piano"],
    experiencia: 4,
    sedesAsignadas: [ObjectId("650a1234567890123456001"), ObjectId("650a1234567890123456003")],
    activo: true,
    fechaContratacion: new Date("2024-05-15")
  }
];

db.profesores.insertMany(profesores);

// 3. INSERTAR ESTUDIANTES (15 estudiantes)
const estudiantes = [
  {
    _id: ObjectId("652a1234567890123456001"),
    nombre: "Juan Pablo Martínez",
    documento: "1001234567",
    email: "juan.martinez@email.com",
    telefono: "310-123-4567",
    edad: 25,
    nivelMusical: "basico",
    contactoEmergencia: {
      nombre: "Carmen Martínez",
      telefono: "320-987-6543",
      relacion: "Madre"
    },
    activo: true,
    fechaRegistro: new Date("2024-07-15")
  },
  {
    _id: ObjectId("652a1234567890123456002"),
    nombre: "Camila Andrea López",
    documento: "1002345678",
    email: "camila.lopez@email.com",
    telefono: "311-234-5678",
    edad: 19,
    nivelMusical: "intermedio",
    contactoEmergencia: {
      nombre: "Pedro López",
      telefono: "321-876-5432",
      relacion: "Padre"
    },
    activo: true,
    fechaRegistro: new Date("2024-07-20")
  },
  {
    _id: ObjectId("652a1234567890123456003"),
    nombre: "Sebastian Rodríguez",
    documento: "1003456789",
    email: "sebastian.rodriguez@email.com",
    telefono: "312-345-6789",
    edad: 22,
    nivelMusical: "avanzado",
    contactoEmergencia: {
      nombre: "Ana Rodríguez",
      telefono: "322-765-4321",
      relacion: "Madre"
    },
    activo: true,
    fechaRegistro: new Date("2024-07-25")
  },
  {
    _id: ObjectId("652a1234567890123456004"),
    nombre: "Isabella García",
    documento: "1004567890",
    email: "isabella.garcia@email.com",
    telefono: "313-456-7890",
    edad: 16,
    nivelMusical: "basico",
    contactoEmergencia: {
      nombre: "Carlos García",
      telefono: "323-654-3210",
      relacion: "Padre"
    },
    activo: true,
    fechaRegistro: new Date("2024-08-01")
  },
  {
    _id: ObjectId("652a1234567890123456005"),
    nombre: "Andrés Felipe Muñoz",
    documento: "1005678901",
    email: "andres.munoz@email.com",
    telefono: "314-567-8901",
    edad: 28,
    nivelMusical: "intermedio",
    contactoEmergencia: {
      nombre: "María Muñoz",
      telefono: "324-543-2109",
      relacion: "Esposa"
    },
    activo: true,
    fechaRegistro: new Date("2024-08-05")
  },
  {
    _id: ObjectId("652a1234567890123456006"),
    nombre: "Valentina Sánchez",
    documento: "1006789012",
    email: "valentina.sanchez@email.com",
    telefono: "315-678-9012",
    edad: 17,
    nivelMusical: "basico",
    contactoEmergencia: {
      nombre: "Luis Sánchez",
      telefono: "325-432-1098",
      relacion: "Padre"
    },
    activo: true,
    fechaRegistro: new Date("2024-08-10")
  },
  {
    _id: ObjectId("652a1234567890123456007"),
    nombre: "Daniel Alejandro Peña",
    documento: "1007890123",
    email: "daniel.pena@email.com",
    telefono: "316-789-0123",
    edad: 24,
    nivelMusical: "avanzado",
    contactoEmergencia: {
      nombre: "Rosa Peña",
      telefono: "326-321-0987",
      relacion: "Madre"
    },
    activo: true,
    fechaRegistro: new Date("2024-08-15")
  },
  {
    _id: ObjectId("652a1234567890123456008"),
    nombre: "Sofía Alejandra Herrera",
    documento: "1008901234",
    email: "sofia.herrera@email.com",
    telefono: "317-890-1234",
    edad: 20,
    nivelMusical: "intermedio",
    contactoEmergencia: {
      nombre: "Jorge Herrera",
      telefono: "327-210-9876",
      relacion: "Padre"
    },
    activo: true,
    fechaRegistro: new Date("2024-08-20")
  },
  {
    _id: ObjectId("652a1234567890123456009"),
    nombre: "Mateo Alejandro Jiménez",
    documento: "1009012345",
    email: "mateo.jimenez@email.com",
    telefono: "318-901-2345",
    edad: 15,
    nivelMusical: "basico",
    contactoEmergencia: {
      nombre: "Patricia Jiménez",
      telefono: "328-109-8765",
      relacion: "Madre"
    },
    activo: true,
    fechaRegistro: new Date("2024-08-25")
  },
  {
    _id: ObjectId("652a1234567890123456010"),
    nombre: "Mariana Cadavid",
    documento: "1010123456",
    email: "mariana.cadavid@email.com",
    telefono: "319-012-3456",
    edad: 26,
    nivelMusical: "avanzado",
    contactoEmergencia: {
      nombre: "Ricardo Cadavid",
      telefono: "329-098-7654",
      relacion: "Esposo"
    },
    activo: true,
    fechaRegistro: new Date("2024-08-30")
  },
  {
    _id: ObjectId("652a1234567890123456011"),
    nombre: "Santiago Morales",
    documento: "1011234567",
    email: "santiago.morales@email.com",
    telefono: "310-987-6543",
    edad: 18,
    nivelMusical: "intermedio",
    contactoEmergencia: {
      nombre: "Elena Morales",
      telefono: "330-987-6543",
      relacion: "Madre"
    },
    activo: true,
    fechaRegistro: new Date("2024-09-01")
  },
  {
    _id: ObjectId("652a1234567890123456012"),
    nombre: "Catalina Ruiz",
    documento: "1012345678",
    email: "catalina.ruiz@email.com",
    telefono: "311-876-5432",
    edad: 21,
    nivelMusical: "basico",
    contactoEmergencia: {
      nombre: "Fernando Ruiz",
      telefono: "331-876-5432",
      relacion: "Padre"
    },
    activo: true,
    fechaRegistro: new Date("2024-09-05")
  },
  {
    _id: ObjectId("652a1234567890123456013"),
    nombre: "Emilio Vásquez",
    documento: "1013456789",
    email: "emilio.vasquez@email.com",
    telefono: "312-765-4321",
    edad: 23,
    nivelMusical: "avanzado",
    contactoEmergencia: {
      nombre: "Gloria Vásquez",
      telefono: "332-765-4321",
      relacion: "Madre"
    },
    activo: true,
    fechaRegistro: new Date("2024-09-10")
  },
  {
    _id: ObjectId("652a1234567890123456014"),
    nombre: "Alejandra Mendoza",
    documento: "1014567890",
    email: "alejandra.mendoza@email.com",
    telefono: "313-654-3210",
    edad: 27,
    nivelMusical: "intermedio",
    contactoEmergencia: {
      nombre: "Mario Mendoza",
      telefono: "333-654-3210",
      relacion: "Hermano"
    },
    activo: true,
    fechaRegistro: new Date("2024-09-15")
  },
  {
    _id: ObjectId("652a1234567890123456015"),
    nombre: "Nicolás Herrera",
    documento: "1015678901",
    email: "nicolas.herrera@email.com",
    telefono: "314-543-2109",
    edad: 19,
    nivelMusical: "basico",
    contactoEmergencia: {
      nombre: "Claudia Herrera",
      telefono: "334-543-2109",
      relacion: "Madre"
    },
    activo: true,
    fechaRegistro: new Date("2024-09-20")
  }
];

db.estudiantes.insertMany(estudiantes);

// 4. INSERTAR CURSOS (15 cursos - 5 por sede)
const cursos = [
  // Cursos Sede Bogotá
  {
    _id: ObjectId("653a1234567890123456001"),
    nombre: "Piano Básico Mañana",
    instrumento: "piano",
    nivel: "basico",
    descripcion: "Curso introductorio de piano para principiantes",
    duracion: 12,
    cupoMaximo: 8,
    cuposDisponibles: 5,
    costo: 200000,
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456001"),
    horario: {
      dia: "lunes",
      horaInicio: "08:00",
      horaFin: "10:00"
    },
    fechaInicio: new Date("2024-08-01"),
    fechaFin: new Date("2024-10-31"),
    activo: true
  },
  {
    _id: ObjectId("653a1234567890123456002"),
    nombre: "Guitarra Intermedia",
    instrumento: "guitarra",
    nivel: "intermedio",
    descripcion: "Técnicas intermedias de guitarra acústica y eléctrica",
    duracion: 16,
    cupoMaximo: 6,
    cuposDisponibles: 3,
    costo: 280000,
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456002"),
    horario: {
      dia: "martes",
      horaInicio: "14:00",
      horaFin: "16:00"
    },
    fechaInicio: new Date("2024-07-15"),
    fechaFin: new Date("2024-11-15"),
    activo: true
  },
  {
    _id: ObjectId("653a1234567890123456003"),
    nombre: "Canto Popular",
    instrumento: "canto",
    nivel: "basico",
    descripcion: "Técnicas de canto popular y respiración",
    duracion: 10,
    cupoMaximo: 10,
    cuposDisponibles: 7,
    costo: 150000,
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456002"),
    horario: {
      dia: "miercoles",
      horaInicio: "16:00",
      horaFin: "18:00"
    },
    fechaInicio: new Date("2024-08-15"),
    fechaFin: new Date("2024-10-31"),
    activo: true
  },
  {
    _id: ObjectId("653a1234567890123456004"),
    nombre: "Teoría Musical Fundamental",
    instrumento: "teoria_musical",
    nivel: "basico",
    descripcion: "Fundamentos de teoría musical, solfeo y armonía básica",
    duracion: 8,
    cupoMaximo: 12,
    cuposDisponibles: 9,
    costo: 120000,
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456001"),
    horario: {
      dia: "jueves",
      horaInicio: "18:00",
      horaFin: "20:00"
    },
    fechaInicio: new Date("2024-09-01"),
    fechaFin: new Date("2024-10-31"),
    activo: true
  },
  {
    _id: ObjectId("653a1234567890123456005"),
    nombre: "Saxofón Jazz",
    instrumento: "saxofon",
    nivel: "avanzado",
    descripcion: "Técnicas avanzadas de saxofón orientadas al jazz",
    duracion: 20,
    cupoMaximo: 4,
    cuposDisponibles: 2,
    costo: 400000,
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456005"),
    horario: {
      dia: "viernes",
      horaInicio: "19:00",
      horaFin: "21:00"
    },
    fechaInicio: new Date("2024-07-01"),
    fechaFin: new Date("2024-11-30"),
    activo: true
  },
  
  // Cursos Sede Medellín
  {
    _id: ObjectId("653a1234567890123456006"),
    nombre: "Violín Clásico",
    instrumento: "violin",
    nivel: "intermedio",
    descripción: "Técnicas de violín clásico y repertorio tradicional",
    duracion: 18,
    cupoMaximo: 5,
    cuposDisponibles: 2,
    costo: 350000,
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456003"),
    horario: {
      dia: "lunes",
      horaInicio: "10:00",
      horaFin: "12:00"
    },
    fechaInicio: new Date("2024-07-20"),
    fechaFin: new Date("2024-12-01"),
    activo: true
  },
  {
    _id: ObjectId("653a1234567890123456007"),
    nombre: "Piano Avanzado",
    instrumento: "piano",
    nivel: "avanzado",
    descripcion: "Técnicas avanzadas de piano clásico y contemporáneo",
    duracion: 24,
    cupoMaximo: 3,
    cuposDisponibles: 1,
    costo: 480000,
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456006"),
    horario: {
      dia: "martes",
      horaInicio: "15:00",
      horaFin: "17:00"
    },
    fechaInicio: new Date("2024-06-01"),
    fechaFin: new Date("2024-12-15"),
    activo: true
  },
  {
    _id: ObjectId("653a1234567890123456008"),
    nombre: "Guitarra Clásica",
    instrumento: "guitarra",
    nivel: "basico",
    descripcion: "Introducción a la guitarra clásica",
    duracion: 14,
    cupoMaximo: 7,
    cuposDisponibles: 4,
    costo: 220000,
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456002"),
    horario: {
      dia: "miercoles",
      horaInicio: "14:00",
      horaFin: "16:00"
    },
    fechaInicio: new Date("2024-08-10"),
    fechaFin: new Date("2024-11-20"),
    activo: true
  },
  {
    _id: ObjectId("653a1234567890123456009"),
    nombre: "Batería Rock",
    instrumento: "bateria",
    nivel: "intermedio",
    descripcion: "Técnicas de batería para rock y música popular",
    duracion: 16,
    cupoMaximo: 6,
    cuposDisponibles: 3,
    costo: 300000,
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456009"),
    horario: {
      dia: "jueves",
      horaInicio: "17:00",
      horaFin: "19:00"
    },
    fechaInicio: new Date("2024-07-30"),
    fechaFin: new Date("2024-11-30"),
    activo: true
  },
  {
    _id: ObjectId("653a1234567890123456010"),
    nombre: "Canto Lírico",
    instrumento: "canto",
    nivel: "avanzado",
    descripcion: "Técnicas de canto lírico y ópera",
    duracion: 22,
    cupoMaximo: 4,
    cuposDisponibles: 2,
    costo: 440000,
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456006"),
    horario: {
      dia: "viernes",
      horaInicio: "16:00",
      horaFin: "18:00"
    },
    fechaInicio: new Date("2024-06-15"),
    fechaFin: new Date("2024-12-01"),
    activo: true
  },

  // Cursos Sede Cali
  {
    _id: ObjectId("653a1234567890123456011"),
    nombre: "Bajo Eléctrico",
    instrumento: "bajo",
    nivel: "basico",
    descripcion: "Fundamentos del bajo eléctrico en diferentes estilos",
    duracion: 12,
    cupoMaximo: 8,
    cuposDisponibles: 6,
    costo: 200000,
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456004"),
    horario: {
      dia: "lunes",
      horaInicio: "18:00",
      horaFin: "20:00"
    },
    fechaInicio: new Date("2024-08-05"),
    fechaFin: new Date("2024-10-31"),
    activo: true
  },
  {
    _id: ObjectId("653a1234567890123456012"),
    nombre: "Flauta Traversa",
    instrumento: "flauta",
    nivel: "intermedio",
    descripcion: "Técnicas intermedias de flauta traversa",
    duracion: 16,
    cupoMaximo: 5,
    cuposDisponibles: 3,
    costo: 280000,
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456008"),
    horario: {
      dia: "martes",
      horaInicio: "16:00",
      horaFin: "18:00"
    },
    fechaInicio: new Date("2024-07-25"),
    fechaFin: new Date("2024-11-25"),
    activo: true
  },
  {
    _id: ObjectId("653a1234567890123456013"),
    nombre: "Violín Popular",
    instrumento: "violin",
    nivel: "basico",
    descripcion: "Violín aplicado a música popular y folclórica",
    duracion: 14,
    cupoMaximo: 6,
    cuposDisponibles: 4,
    costo: 240000,
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456008"),
    horario: {
      dia: "miercoles",
      horaInicio: "15:00",
      horaFin: "17:00"
    },
    fechaInicio: new Date("2024-08-20"),
    fechaFin: new Date("2024-12-01"),
    activo: true
  },
  {
    _id: ObjectId("653a1234567890123456014"),
    nombre: "Piano Jazz",
    instrumento: "piano",
    nivel: "intermedio",
    descripcion: "Técnicas de piano jazz e improvisación",
    duracion: 18,
    cupoMaximo: 4,
    cuposDisponibles: 2,
    costo: 360000,
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456010"),
    horario: {
      dia: "jueves",
      horaInicio: "19:00",
      horaFin: "21:00"
    },
    fechaInicio: new Date("2024-07-10"),
    fechaFin: new Date("2024-11-30"),
    activo: true
  },
  {
    _id: ObjectId("653a1234567890123456015"),
    nombre: "Saxofón Popular",
    instrumento: "saxofon",
    nivel: "basico",
    descripcion: "Saxofón aplicado a música popular y latina",
    duracion: 12,
    cupoMaximo: 6,
    cuposDisponibles: 4,
    costo: 220000,
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456005"),
    horario: {
      dia: "viernes",
      horaInicio: "17:00",
      horaFin: "19:00"
    },
    fechaInicio: new Date("2024-08-30"),
    fechaFin: new Date("2024-11-30"),
    activo: true
  }
];

db.cursos.insertMany(cursos);

// 5. INSERTAR INSTRUMENTOS (20 instrumentos)
const instrumentos = [
  // Instrumentos Sede Bogotá
  {
    _id: ObjectId("654a1234567890123456001"),
    nombre: "Piano Yamaha P-001",
    tipo: "piano",
    marca: "Yamaha",
    modelo: "P-125",
    numeroSerie: "YAM001",
    sede: ObjectId("650a1234567890123456001"),
    estado: "excelente",
    disponible: true,
    valorComercial: 2500000,
    fechaAdquisicion: new Date("2024-01-20"),
    observaciones: "Piano digital 88 teclas"
  },
  {
    _id: ObjectId("654a1234567890123456002"),
    nombre: "Guitarra Fender G-001",
    tipo: "guitarra",
    marca: "Fender",
    modelo: "CD-60S",
    numeroSerie: "FEN001",
    sede: ObjectId("650a1234567890123456001"),
    estado: "bueno",
    disponible: true,
    valorComercial: 800000,
    fechaAdquisicion: new Date("2024-02-10"),
    observaciones: "Guitarra acústica"
  },
  {
    _id: ObjectId("654a1234567890123456003"),
    nombre: "Saxofón Alto S-001",
    tipo: "saxofon",
    marca: "Jupiter",
    modelo: "JAS-700",
    numeroSerie: "JUP001",
    sede: ObjectId("650a1234567890123456001"),
    estado: "excelente",
    disponible: false,
    valorComercial: 1800000,
    fechaAdquisicion: new Date("2024-02-15"),
    observaciones: "Saxofón alto dorado"
  },
  {
    _id: ObjectId("654a1234567890123456004"),
    nombre: "Violin Stentor V-001",
    tipo: "violin",
    marca: "Stentor",
    modelo: "Student I",
    numeroSerie: "STE001",
    sede: ObjectId("650a1234567890123456001"),
    estado: "bueno",
    disponible: true,
    valorComercial: 400000,
    fechaAdquisicion: new Date("2024-03-01"),
    observaciones: "Violín 4/4 para estudiantes"
  },
  {
    _id: ObjectId("654a1234567890123456005"),
    nombre: "Guitarra Eléctrica E-001",
    tipo: "guitarra",
    marca: "Squier",
    modelo: "Stratocaster",
    numeroSerie: "SQU001",
    sede: ObjectId("650a1234567890123456001"),
    estado: "excelente",
    disponible: true,
    valorComercial: 1200000,
    fechaAdquisicion: new Date("2024-03-15"),
    observaciones: "Guitarra eléctrica con amplificador"
  },
  {
    _id: ObjectId("654a1234567890123456006"),
    nombre: "Piano Digital P-002",
    tipo: "piano",
    marca: "Casio",
    modelo: "PX-770",
    numeroSerie: "CAS001",
    sede: ObjectId("650a1234567890123456001"),
    estado: "bueno",
    disponible: true,
    valorComercial: 2200000,
    fechaAdquisicion: new Date("2024-04-01"),
    observaciones: "Piano digital con pedales"
  },
  {
    _id: ObjectId("654a1234567890123456007"),
    nombre: "Flauta Traversa F-001",
    tipo: "flauta",
    marca: "Pearl",
    modelo: "PF-501E",
    numeroSerie: "PEA001",
    sede: ObjectId("650a1234567890123456001"),
    estado: "excelente",
    disponible: true,
    valorComercial: 900000,
    fechaAdquisicion: new Date("2024-04-20"),
    observaciones: "Flauta plateada con llaves cerradas"
  },

  // Instrumentos Sede Medellín  
  {
    _id: ObjectId("654a1234567890123456008"),
    nombre: "Piano Kawai P-003",
    tipo: "piano",
    marca: "Kawai",
    modelo: "ES110",
    numeroSerie: "KAW001",
    sede: ObjectId("650a1234567890123456002"),
    estado: "excelente",
    disponible: false,
    valorComercial: 2800000,
    fechaAdquisicion: new Date("2024-02-25"),
    observaciones: "Piano digital profesional"
  },
  {
    _id: ObjectId("654a1234567890123456009"),
    nombre: "Violín Profesional V-002",
    tipo: "violin",
    marca: "Cremona",
    modelo: "SV-175",
    numeroSerie: "CRE001",
    sede: ObjectId("650a1234567890123456002"),
    estado: "excelente",
    disponible: true,
    valorComercial: 800000,
    fechaAdquisicion: new Date("2024-03-10"),
    observaciones: "Violín de madera sólida"
  },
  {
    _id: ObjectId("654a1234567890123456010"),
    nombre: "Batería Mapex B-001",
    tipo: "bateria",
    marca: "Mapex",
    modelo: "Tornado",
    numeroSerie: "MAP001",
    sede: ObjectId("650a1234567890123456002"),
    estado: "bueno",
    disponible: true,
    valorComercial: 1500000,
    fechaAdquisicion: new Date("2024-03-20"),
    observaciones: "Batería completa con platillos"
  },
  {
    _id: ObjectId("654a1234567890123456011"),
    nombre: "Guitarra Clásica G-003",
    tipo: "guitarra",
    marca: "Córdoba",
    modelo: "C5",
    numeroSerie: "COR001",
    sede: ObjectId("650a1234567890123456002"),
    estado: "excelente",
    disponible: true,
    valorComercial: 1100000,
    fechaAdquisicion: new Date("2024-04-05"),
    observaciones: "Guitarra clásica española"
  },
  {
    _id: ObjectId("654a1234567890123456012"),
    nombre: "Violín Intermedio V-003",
    tipo: "violin",
    marca: "Eastman",
    modelo: "VL80",
    numeroSerie: "EAS001",
    sede: ObjectId("650a1234567890123456002"),
    estado: "bueno",
    disponible: true,
    valorComercial: 600000,
    fechaAdquisicion: new Date("2024-05-01"),
    observaciones: "Violín nivel intermedio"
  },
  {
    _id: ObjectId("654a1234567890123456013"),
    nombre: "Piano Vertical P-004",
    tipo: "piano",
    marca: "Yamaha",
    modelo: "U1",
    numeroSerie: "YAM002",
    sede: ObjectId("650a1234567890123456002"),
    estado: "excelente",
    disponible: true,
    valorComercial: 8500000,
    fechaAdquisicion: new Date("2024-01-30"),
    observaciones: "Piano acústico vertical"
  },

  // Instrumentos Sede Cali
  {
    _id: ObjectId("654a1234567890123456014"),
    nombre: "Bajo Fender B-001",
    tipo: "bajo",
    marca: "Fender",
    modelo: "Player Precision",
    numeroSerie: "FEN002",
    sede: ObjectId("650a1234567890123456003"),
    estado: "excelente",
    disponible: true,
    valorComercial: 2200000,
    fechaAdquisicion: new Date("2024-03-25"),
    observaciones: "Bajo eléctrico 4 cuerdas"
  },
  {
    _id: ObjectId("654a1234567890123456015"),
    nombre: "Flauta Student F-002",
    tipo: "flauta",
    marca: "Gemeinhardt",
    modelo: "2SP",
    numeroSerie: "GEM001",
    sede: ObjectId("650a1234567890123456003"),
    estado: "bueno",
    disponible: true,
    valorComercial: 700000,
    fechaAdquisicion: new Date("2024-04-10"),
    observaciones: "Flauta para estudiantes"
  },
  {
    _id: ObjectId("654a1234567890123456016"),
    nombre: "Violín Básico V-004",
    tipo: "violin",
    marca: "Mendini",
    modelo: "MV300",
    numeroSerie: "MEN001",
    sede: ObjectId("650a1234567890123456003"),
    estado: "regular",
    disponible: true,
    valorComercial: 300000,
    fechaAdquisicion: new Date("2024-05-15"),
    observaciones: "Violín para principiantes"
  },
  {
    _id: ObjectId("654a1234567890123456017"),
    nombre: "Saxofón Tenor S-002",
    tipo: "saxofon",
    marca: "Selmer",
    modelo: "AS42",
    numeroSerie: "SEL001",
    sede: ObjectId("650a1234567890123456003"),
    estado: "excelente",
    disponible: false,
    valorComercial: 3200000,
    fechaAdquisicion: new Date("2024-02-20"),
    observaciones: "Saxofón tenor profesional"
  },
  {
    _id: ObjectId("654a1234567890123456018"),
    nombre: "Piano Digital P-005",
    tipo: "piano",
    marca: "Roland",
    modelo: "FP-30X",
    numeroSerie: "ROL001",
    sede: ObjectId("650a1234567890123456003"),
    estado: "excelente",
    disponible: true,
    valorComercial: 2600000,
    fechaAdquisicion: new Date("2024-04-30"),
    observaciones: "Piano digital portátil"
  },
  {
    _id: ObjectId("654a1234567890123456019"),
    nombre: "Guitarra Acústica G-004",
    tipo: "guitarra",
    marca: "Taylor",
    modelo: "GS Mini",
    numeroSerie: "TAY001",
    sede: ObjectId("650a1234567890123456003"),
    estado: "excelente",
    disponible: true,
    valorComercial: 1800000,
    fechaAdquisicion: new Date("2024-06-01"),
    observaciones: "Guitarra de viaje de alta calidad"
  },
  {
    _id: ObjectId("654a1234567890123456020"),
    nombre: "Bajo Eléctrico B-002",
    tipo: "bajo",
    marca: "Ibanez",
    modelo: "GSR200",
    numeroSerie: "IBA001",
    sede: ObjectId("650a1234567890123456003"),
    estado: "bueno",
    disponible: true,
    valorComercial: 900000,
    fechaAdquisicion: new Date("2024-06-15"),
    observaciones: "Bajo de 4 cuerdas para estudiantes"
  }
];

db.instrumentos.insertMany(instrumentos);

// 6. INSERTAR INSCRIPCIONES (30 inscripciones)
const inscripciones = [
  {
    _id: ObjectId("655a1234567890123456001"),
    estudiante: ObjectId("652a1234567890123456001"),
    curso: ObjectId("653a1234567890123456001"),
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456001"),
    fechaInscripcion: new Date("2024-07-20"),
    estado: "activa",
    costoTotal: 200000,
    metodoPago: "tarjeta",
    observaciones: "Primera vez tomando piano"
  },
  {
    _id: ObjectId("655a1234567890123456002"),
    estudiante: ObjectId("652a1234567890123456002"),
    curso: ObjectId("653a1234567890123456002"),
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456002"),
    fechaInscripcion: new Date("2024-07-25"),
    estado: "activa",
    costoTotal: 280000,
    metodoPago: "transferencia",
    observaciones: "Estudiante con experiencia previa"
  },
  {
    _id: ObjectId("655a1234567890123456003"),
    estudiante: ObjectId("652a1234567890123456003"),
    curso: ObjectId("653a1234567890123456005"),
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456005"),
    fechaInscripcion: new Date("2024-07-30"),
    estado: "activa",
    costoTotal: 400000,
    metodoPago: "efectivo",
    observaciones: "Estudiante avanzado en jazz"
  },
  {
    _id: ObjectId("655a1234567890123456004"),
    estudiante: ObjectId("652a1234567890123456004"),
    curso: ObjectId("653a1234567890123456003"),
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456002"),
    fechaInscripcion: new Date("2024-08-02"),
    estado: "activa",
    costoTotal: 150000,
    metodoPago: "tarjeta",
    observaciones: "Menor de edad, autorización firmada"
  },
  {
    _id: ObjectId("655a1234567890123456005"),
    estudiante: ObjectId("652a1234567890123456005"),
    curso: ObjectId("653a1234567890123456004"),
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456001"),
    fechaInscripcion: new Date("2024-08-08"),
    estado: "activa",
    costoTotal: 120000,
    metodoPago: "transferencia",
    observaciones: "Interesado en composición musical"
  },
  {
    _id: ObjectId("655a1234567890123456006"),
    estudiante: ObjectId("652a1234567890123456006"),
    curso: ObjectId("653a1234567890123456001"),
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456001"),
    fechaInscripcion: new Date("2024-08-12"),
    estado: "activa",
    costoTotal: 200000,
    metodoPago: "tarjeta",
    observaciones: "Estudiante muy joven, requiere supervisión"
  },
  {
    _id: ObjectId("655a1234567890123456007"),
    estudiante: ObjectId("652a1234567890123456007"),
    curso: ObjectId("653a1234567890123456002"),
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456002"),
    fechaInscripcion: new Date("2024-08-18"),
    estado: "activa",
    costoTotal: 280000,
    metodoPago: "efectivo",
    observaciones: "Experiencia en bandas locales"
  },
  {
    _id: ObjectId("655a1234567890123456008"),
    estudiante: ObjectId("652a1234567890123456008"),
    curso: ObjectId("653a1234567890123456006"),
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456003"),
    fechaInscripcion: new Date("2024-08-22"),
    estado: "activa",
    costoTotal: 350000,
    metodoPago: "tarjeta",
    observaciones: "Interés en música de cámara"
  },
  {
    _id: ObjectId("655a1234567890123456009"),
    estudiante: ObjectId("652a1234567890123456009"),
    curso: ObjectId("653a1234567890123456008"),
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456002"),
    fechaInscripcion: new Date("2024-08-28"),
    estado: "activa",
    costoTotal: 220000,
    metodoPago: "transferencia",
    observaciones: "Menor de edad, pago por padres"
  },
  {
    _id: ObjectId("655a1234567890123456010"),
    estudiante: ObjectId("652a1234567890123456010"),
    curso: ObjectId("653a1234567890123456007"),
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456006"),
    fechaInscripcion: new Date("2024-09-02"),
    estado: "activa",
    costoTotal: 480000,
    metodoPago: "efectivo",
    observaciones: "Pianista profesional buscando perfeccionamiento"
  },
  {
    _id: ObjectId("655a1234567890123456011"),
    estudiante: ObjectId("652a1234567890123456011"),
    curso: ObjectId("653a1234567890123456009"),
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456009"),
    fechaInscripcion: new Date("2024-09-05"),
    estado: "activa",
    costoTotal: 300000,
    metodoPago: "tarjeta",
    observaciones: "Baterista de banda estudiantil"
  },
  {
    _id: ObjectId("655a1234567890123456012"),
    estudiante: ObjectId("652a1234567890123456012"),
    curso: ObjectId("653a1234567890123456010"),
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456006"),
    fechaInscripcion: new Date("2024-09-10"),
    estado: "activa",
    costoTotal: 440000,
    metodoPago: "transferencia",
    observaciones: "Cantante de coro universitario"
  },
  {
    _id: ObjectId("655a1234567890123456013"),
    estudiante: ObjectId("652a1234567890123456013"),
    curso: ObjectId("653a1234567890123456011"),
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456004"),
    fechaInscripcion: new Date("2024-09-15"),
    estado: "activa",
    costoTotal: 200000,
    metodoPago: "efectivo",
    observaciones: "Bajista principiante"
  },
  {
    _id: ObjectId("655a1234567890123456014"),
    estudiante: ObjectId("652a1234567890123456014"),
    curso: ObjectId("653a1234567890123456012"),
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456008"),
    fechaInscripcion: new Date("2024-09-18"),
    estado: "activa",
    costoTotal: 280000,
    metodoPago: "tarjeta",
    observaciones: "Flautista con formación clásica"
  },
  {
    _id: ObjectId("655a1234567890123456015"),
    estudiante: ObjectId("652a1234567890123456015"),
    curso: ObjectId("653a1234567890123456013"),
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456008"),
    fechaInscripcion: new Date("2024-09-22"),
    estado: "activa",
    costoTotal: 240000,
    metodoPago: "transferencia",
    observaciones: "Primer acercamiento al violín"
  },
  {
    _id: ObjectId("655a1234567890123456016"),
    estudiante: ObjectId("652a1234567890123456001"),
    curso: ObjectId("653a1234567890123456004"),
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456001"),
    fechaInscripcion: new Date("2024-08-15"),
    estado: "completada",
    costoTotal: 120000,
    metodoPago: "efectivo",
    observaciones: "Curso completado satisfactoriamente",
    fechaFinalizacion: new Date("2024-09-15")
  },
  {
    _id: ObjectId("655a1234567890123456017"),
    estudiante: ObjectId("652a1234567890123456003"),
    curso: ObjectId("653a1234567890123456014"),
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456010"),
    fechaInscripcion: new Date("2024-07-15"),
    estado: "activa",
    costoTotal: 360000,
    metodoPago: "tarjeta",
    observaciones: "Pianista de jazz experimentado"
  },
  {
    _id: ObjectId("655a1234567890123456018"),
    estudiante: ObjectId("652a1234567890123456005"),
    curso: ObjectId("653a1234567890123456015"),
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456005"),
    fechaInscripcion: new Date("2024-09-01"),
    estado: "activa",
    costoTotal: 220000,
    metodoPago: "transferencia",
    observaciones: "Interés en música latina"
  },
  {
    _id: ObjectId("655a1234567890123456019"),
    estudiante: ObjectId("652a1234567890123456007"),
    curso: ObjectId("653a1234567890123456006"),
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456003"),
    fechaInscripcion: new Date("2024-07-25"),
    estado: "cancelada",
    costoTotal: 350000,
    metodoPago: "efectivo",
    observaciones: "Cancelado por conflictos de horario",
    fechaFinalizacion: new Date("2024-08-10")
  },
  {
    _id: ObjectId("655a1234567890123456020"),
    estudiante: ObjectId("652a1234567890123456002"),
    curso: ObjectId("653a1234567890123456003"),
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456002"),
    fechaInscripcion: new Date("2024-08-20"),
    estado: "completada",
    costoTotal: 150000,
    metodoPago: "tarjeta",
    observaciones: "Excelente progreso en técnica vocal",
    fechaFinalizacion: new Date("2024-09-20")
  },
  {
    _id: ObjectId("655a1234567890123456021"),
    estudiante: ObjectId("652a1234567890123456004"),
    curso: ObjectId("653a1234567890123456001"),
    sede: ObjectId("650a1234567890123456001"),
    profesor: ObjectId("651a1234567890123456001"),
    fechaInscripcion: new Date("2024-07-10"),
    estado: "completada",
    costoTotal: 200000,
    metodoPago: "efectivo",
    observaciones: "Completó nivel básico exitosamente",
    fechaFinalizacion: new Date("2024-08-31")
  },
  {
    _id: ObjectId("655a1234567890123456022"),
    estudiante: ObjectId("652a1234567890123456008"),
    curso: ObjectId("653a1234567890123456007"),
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456006"),
    fechaInscripcion: new Date("2024-06-15"),
    estado: "completada",
    costoTotal: 480000,
    metodoPago: "transferencia",
    observaciones: "Nivel avanzado completado con honores",
    fechaFinalizacion: new Date("2024-08-30")
  },
  {
    _id: ObjectId("655a1234567890123456023"),
    estudiante: ObjectId("652a1234567890123456009"),
    curso: ObjectId("653a1234567890123456011"),
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456004"),
    fechaInscripcion: new Date("2024-08-10"),
    estado: "activa",
    costoTotal: 200000,
    metodoPago: "tarjeta",
    observaciones: "Progreso rápido en bajo eléctrico"
  },
  {
    _id: ObjectId("655a1234567890123456024"),
    estudiante: ObjectId("652a1234567890123456010"),
    curso: ObjectId("653a1234567890123456014"),
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456010"),
    fechaInscripcion: new Date("2024-07-20"),
    estado: "activa",
    costoTotal: 360000,
    metodoPago: "efectivo",
    observaciones: "Excelente técnica en improvisación"
  },
  {
    _id: ObjectId("655a1234567890123456025"),
    estudiante: ObjectId("652a1234567890123456006"),
    curso: ObjectId("653a1234567890123456008"),
    sede: ObjectId("650a1234567890123456002"),
    profesor: ObjectId("651a1234567890123456002"),
    fechaInscripcion: new Date("2024-08-25"),
    estado: "activa",
    costoTotal: 220000,
    metodoPago: "transferencia",
    observaciones: "Estudiante muy dedicada"
  },
  {
    _id: ObjectId("655a1234567890123456026"),
    estudiante: ObjectId("652a1234567890123456011"),
    curso: ObjectId("653a1234567890123456015"),
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456005"),
    fechaInscripcion: new Date("2024-09-05"),
    estado: "activa",
    costoTotal: 220000,
    metodoPago: "tarjeta",
    observaciones: "Interés en música colombiana"
  },
  {
    _id: ObjectId("655a1234567890123456027"),
    estudiante: ObjectId("652a1234567890123456012"),
    curso: ObjectId("653a1234567890123456013"),
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456008"),
    fechaInscripcion: new Date("2024-09-12"),
    estado: "activa",
    costoTotal: 240000,
    metodoPago: "efectivo",
    observaciones: "Primera experiencia con instrumentos de cuerda"
  },
  {
    _id: ObjectId("655a1234567890123456028"),
    estudiante: ObjectId("652a1234567890123456013"),
    curso: ObjectId("653a1234567890123456012"),
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456008"),
    fechaInscripcion: new Date("2024-08-30"),
    estado: "suspendida",
    costoTotal: 280000,
    metodoPago: "transferencia",
    observaciones: "Suspendido por motivos personales"
  },
  {
    _id: ObjectId("655a1234567890123456029"),
    estudiante: ObjectId("652a1234567890123456014"),
    curso: ObjectId("653a1234567890123456011"),
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456004"),
    fechaInscripcion: new Date("2024-09-20"),
    estado: "activa",
    costoTotal: 200000,
    metodoPago: "tarjeta",
    observaciones: "Segunda inscripción en la escuela"
  },
  {
    _id: ObjectId("655a1234567890123456030"),
    estudiante: ObjectId("652a1234567890123456015"),
    curso: ObjectId("653a1234567890123456015"),
    sede: ObjectId("650a1234567890123456003"),
    profesor: ObjectId("651a1234567890123456005"),
    fechaInscripcion: new Date("2024-09-25"),
    estado: "activa",
    costoTotal: 220000,
    metodoPago: "efectivo",
    observaciones: "Estudiante muy motivado"
  }
];

db.inscripciones.insertMany(inscripciones);

// 7. INSERTAR RESERVAS DE INSTRUMENTOS (10 reservas)
const reservasInstrumentos = [
  {
    _id: ObjectId("656a1234567890123456001"),
    estudiante: ObjectId("652a1234567890123456001"),
    instrumento: ObjectId("654a1234567890123456001"),
    fechaReserva: new Date("2024-08-01"),
    fechaInicio: new Date("2024-08-05"),
    fechaFin: new Date("2024-08-12"),
    estado: "devuelta",
    observacionesEntrega: "Piano en excelente estado",
    observacionesDevolucion: "Devuelto sin daños",
    empleadoEntrega: ObjectId("651a1234567890123456001"),
    empleadoDevolucion: ObjectId("651a1234567890123456001")
  },
  {
    _id: ObjectId("656a1234567890123456002"),
    estudiante: ObjectId("652a1234567890123456002"),
    instrumento: ObjectId("654a1234567890123456002"),
    fechaReserva: new Date("2024-08-10"),
    fechaInicio: new Date("2024-08-15"),
    fechaFin: new Date("2024-08-29"),
    estado: "devuelta",
    observacionesEntrega: "Guitarra con cuerdas nuevas",
    observacionesDevolucion: "Se recomienda cambio de cuerdas",
    empleadoEntrega: ObjectId("651a1234567890123456002"),
    empleadoDevolucion: ObjectId("651a1234567890123456002")
  },
  {
    _id: ObjectId("656a1234567890123456003"),
    estudiante: ObjectId("652a1234567890123456003"),
    instrumento: ObjectId("654a1234567890123456003"),
    fechaReserva: new Date("2024-08-20"),
    fechaInicio: new Date("2024-08-22"),
    fechaFin: new Date("2024-09-05"),
    estado: "en_prestamo",
    observacionesEntrega: "Saxofón recién calibrado",
    empleadoEntrega: ObjectId("651a1234567890123456005")
  },
  {
    _id: ObjectId("656a1234567890123456004"),
    estudiante: ObjectId("652a1234567890123456008"),
    instrumento: ObjectId("654a1234567890123456008"),
    fechaReserva: new Date("2024-08-25"),
    fechaInicio: new Date("2024-08-28"),
    fechaFin: new Date("2024-09-11"),
    estado: "en_prestamo",
    observacionesEntrega: "Piano digital profesional",
    empleadoEntrega: ObjectId("651a1234567890123456006")
  },
  {
    _id: ObjectId("656a1234567890123456005"),
    estudiante: ObjectId("652a1234567890123456004"),
    instrumento: ObjectId("654a1234567890123456004"),
    fechaReserva: new Date("2024-09-01"),
    fechaInicio: new Date("2024-09-03"),
    fechaFin: new Date("2024-09-17"),
    estado: "devuelta",
    observacionesEntrega: "Violín para estudiantes en buen estado",
    observacionesDevolucion: "Devuelto en perfectas condiciones",
    empleadoEntrega: ObjectId("651a1234567890123456001"),
    empleadoDevolucion: ObjectId("651a1234567890123456001")
  },
  {
    _id: ObjectId("656a1234567890123456006"),
    estudiante: ObjectId("652a1234567890123456013"),
    instrumento: ObjectId("654a1234567890123456014"),
    fechaReserva: new Date("2024-09-10"),
    fechaInicio: new Date("2024-09-15"),
    fechaFin: new Date("2024-09-29"),
    estado: "reservada",
    observacionesEntrega: "Bajo eléctrico con amplificador incluido"
  },
  {
    _id: ObjectId("656a1234567890123456007"),
    estudiante: ObjectId("652a1234567890123456014"),
    instrumento: ObjectId("654a1234567890123456015"),
    fechaReserva: new Date("2024-09-18"),
    fechaInicio: new Date("2024-09-20"),
    fechaFin: new Date("2024-10-04"),
    estado: "reservada",
    observacionesEntrega: "Flauta para estudiantes"
  },
  {
    _id: ObjectId("656a1234567890123456008"),
    estudiante: ObjectId("652a1234567890123456009"),
    instrumento: ObjectId("654a1234567890123456010"),
    fechaReserva: new Date("2024-08-15"),
    fechaInicio: new Date("2024-08-20"),
    fechaFin: new Date("2024-09-03"),
    estado: "devuelta",
    observacionesEntrega: "Batería completa con todos los accesorios",
    observacionesDevolucion: "Un platillo necesita limpieza",
    empleadoEntrega: ObjectId("651a1234567890123456009"),
    empleadoDevolucion: ObjectId("651a1234567890123456009")
  },
  {
    _id: ObjectId("656a1234567890123456009"),
    estudiante: ObjectId("652a1234567890123456005"),
    instrumento: ObjectId("654a1234567890123456017"),
    fechaReserva: new Date("2024-09-05"),
    fechaInicio: new Date("2024-09-10"),
    fechaFin: new Date("2024-09-24"),
    estado: "en_prestamo",
    observacionesEntrega: "Saxofón tenor profesional - manejo cuidadoso",
    empleadoEntrega: ObjectId("651a1234567890123456005")
  },
  {
    _id: ObjectId("656a1234567890123456010"),
    estudiante: ObjectId("652a1234567890123456012"),
    instrumento: ObjectId("654a1234567890123456019"),
    fechaReserva: new Date("2024-09-20"),
    fechaInicio: new Date("2024-09-25"),
    fechaFin: new Date("2024-10-09"),
    estado: "vencida",
    observacionesEntrega: "Guitarra acústica de alta calidad",
    empleadoEntrega: ObjectId("651a1234567890123456008")
  }
];

db.reservas_instrumentos.insertMany(reservasInstrumentos);

// 8. INSERTAR USUARIOS DEL SISTEMA (administradores, empleados y estudiantes)
const usuarios = [
  // Administradores
  {
    _id: ObjectId("657a1234567890123456001"),
    nombre: "Ana María Rodríguez",
    email: "admin@campusmusic.com",
    documento: "98765432",
    telefono: "310-000-0001",
    rol: "administrador",
    activo: true,
    fechaCreacion: new Date("2024-01-01")
  },
  {
    _id: ObjectId("657a1234567890123456002"),
    nombre: "Carlos Eduardo Pérez",
    email: "carlos.perez@campusmusic.com",
    documento: "98765433",
    telefono: "310-000-0002",
    rol: "administrador",
    activo: true,
    fechaCreacion: new Date("2024-01-01")
  },
  // Empleados de sede
  {
    _id: ObjectId("657a1234567890123456003"),
    nombre: "Lucía Fernández",
    email: "lucia.fernandez@campusmusic.com",
    documento: "98765434",
    telefono: "310-000-0003",
    rol: "empleado_sede",
    sedeAsignada: ObjectId("650a1234567890123456001"),
    activo: true,
    fechaCreacion: new Date("2024-01-15")
  },
  {
    _id: ObjectId("657a1234567890123456004"),
    nombre: "Miguel Santos",
    email: "miguel.santos@campusmusic.com",
    documento: "98765435",
    telefono: "310-000-0004",
    rol: "empleado_sede",
    sedeAsignada: ObjectId("650a1234567890123456002"),
    activo: true,
    fechaCreacion: new Date("2024-02-01")
  },
  {
    _id: ObjectId("657a1234567890123456005"),
    nombre: "Patricia Morales",
    email: "patricia.morales@campusmusic.com",
    documento: "98765436",
    telefono: "310-000-0005",
    rol: "empleado_sede",
    sedeAsignada: ObjectId("650a1234567890123456003"),
    activo: true,
    fechaCreacion: new Date("2024-02-15")
  },
  // Usuarios estudiantes (algunos de los estudiantes registrados)
  {
    _id: ObjectId("657a1234567890123456006"),
    nombre: "Juan Pablo Martínez",
    email: "juan.martinez@email.com",
    documento: "1001234567",
    telefono: "310-123-4567",
    rol: "estudiante",
    activo: true,
    fechaCreacion: new Date("2024-07-15")
  },
  {
    _id: ObjectId("657a1234567890123456007"),
    nombre: "Camila Andrea López",
    email: "camila.lopez@email.com",
    documento: "1002345678",
    telefono: "311-234-5678",
    rol: "estudiante",
    activo: true,
    fechaCreacion: new Date("2024-07-20")
  },
  {
    _id: ObjectId("657a1234567890123456008"),
    nombre: "Sebastian Rodríguez",
    email: "sebastian.rodriguez@email.com",
    documento: "1003456789",
    telefono: "312-345-6789",
    rol: "estudiante",
    activo: true,
    fechaCreacion: new Date("2024-07-25")
  }
];

db.usuarios.insertMany(usuarios);

console.log("✅ Datos de prueba insertados exitosamente:");
console.log("   - 3 Sedes");
console.log("   - 10 Profesores");
console.log("   - 15 Estudiantes");
console.log("   - 15 Cursos (5 por sede)");
console.log("   - 20 Instrumentos");
console.log("   - 30 Inscripciones");
console.log("   - 10 Reservas de instrumentos");
console.log("   - 8 Usuarios del sistema");
console.log("");
console.log("🔍 Base de datos poblada con datos realistas para testing");