// db_config.js - Configuración de la base de datos Campus Music
// Definición de colecciones con $jsonSchema e índices

// Seleccionar la base de datos
use('campus_music');

// 1. COLECCIÓN USUARIOS
db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "email", "documento", "rol", "fechaCreacion"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Nombre completo del usuario"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Email válido del usuario"
        },
        documento: {
          bsonType: "string",
          description: "Documento de identidad único"
        },
        telefono: {
          bsonType: "string",
          description: "Número de teléfono"
        },
        rol: {
          enum: ["administrador", "empleado_sede", "estudiante"],
          description: "Rol del usuario en el sistema"
        },
        sedeAsignada: {
          bsonType: "objectId",
          description: "ID de la sede asignada (solo para empleados)"
        },
        activo: {
          bsonType: "bool",
          description: "Estado del usuario"
        },
        fechaCreacion: {
          bsonType: "date",
          description: "Fecha de creación del usuario"
        }
      }
    }
  }
});

// 2. COLECCIÓN SEDES
db.createCollection("sedes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "ciudad", "direccion", "capacidad", "activa"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Nombre de la sede"
        },
        ciudad: {
          bsonType: "string",
          description: "Ciudad donde se ubica la sede"
        },
        direccion: {
          bsonType: "string",
          description: "Dirección física de la sede"
        },
        telefono: {
          bsonType: "string",
          description: "Teléfono de contacto de la sede"
        },
        capacidad: {
          bsonType: "int",
          minimum: 1,
          description: "Capacidad máxima de estudiantes"
        },
        activa: {
          bsonType: "bool",
          description: "Estado de la sede"
        },
        fechaCreacion: {
          bsonType: "date",
          description: "Fecha de creación de la sede"
        }
      }
    }
  }
});

// 3. COLECCIÓN PROFESORES
db.createCollection("profesores", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "documento", "especialidades", "experiencia", "activo"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Nombre completo del profesor"
        },
        documento: {
          bsonType: "string",
          description: "Documento de identidad único"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Email del profesor"
        },
        telefono: {
          bsonType: "string",
          description: "Teléfono del profesor"
        },
        especialidades: {
          bsonType: "array",
          items: {
            enum: ["piano", "guitarra", "violin", "bajo", "bateria", "canto", "teoria_musical", "saxofon", "flauta"]
          },
          description: "Instrumentos/materias que puede enseñar"
        },
        experiencia: {
          bsonType: "int",
          minimum: 0,
          description: "Años de experiencia"
        },
        sedesAsignadas: {
          bsonType: "array",
          items: {
            bsonType: "objectId"
          },
          description: "IDs de las sedes donde trabaja"
        },
        activo: {
          bsonType: "bool",
          description: "Estado del profesor"
        },
        fechaContratacion: {
          bsonType: "date",
          description: "Fecha de contratación"
        }
      }
    }
  }
});

// 4. COLECCIÓN ESTUDIANTES
db.createCollection("estudiantes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "documento", "nivelMusical", "fechaRegistro"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Nombre completo del estudiante"
        },
        documento: {
          bsonType: "string",
          description: "Documento de identidad único"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Email del estudiante"
        },
        telefono: {
          bsonType: "string",
          description: "Teléfono del estudiante"
        },
        edad: {
          bsonType: "int",
          minimum: 5,
          maximum: 99,
          description: "Edad del estudiante"
        },
        nivelMusical: {
          enum: ["basico", "intermedio", "avanzado"],
          description: "Nivel musical del estudiante"
        },
        contactoEmergencia: {
          bsonType: "object",
          properties: {
            nombre: { bsonType: "string" },
            telefono: { bsonType: "string" },
            relacion: { bsonType: "string" }
          },
          description: "Contacto de emergencia"
        },
        activo: {
          bsonType: "bool",
          description: "Estado del estudiante"
        },
        fechaRegistro: {
          bsonType: "date",
          description: "Fecha de registro del estudiante"
        }
      }
    }
  }
});

// 5. COLECCIÓN CURSOS
db.createCollection("cursos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "instrumento", "nivel", "duracion", "cupoMaximo", "cuposDisponibles", "costo", "sede", "profesor", "horario"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Nombre del curso"
        },
        instrumento: {
          enum: ["piano", "guitarra", "violin", "bajo", "bateria", "canto", "teoria_musical", "saxofon", "flauta"],
          description: "Instrumento o materia del curso"
        },
        nivel: {
          enum: ["basico", "intermedio", "avanzado"],
          description: "Nivel del curso"
        },
        descripcion: {
          bsonType: "string",
          description: "Descripción detallada del curso"
        },
        duracion: {
          bsonType: "int",
          minimum: 4,
          maximum: 52,
          description: "Duración en semanas"
        },
        cupoMaximo: {
          bsonType: "int",
          minimum: 1,
          maximum: 20,
          description: "Cupo máximo de estudiantes"
        },
        cuposDisponibles: {
          bsonType: "int",
          minimum: 0,
          description: "Cupos actualmente disponibles"
        },
        costo: {
          bsonType: "double",
          minimum: 0,
          description: "Costo del curso"
        },
        sede: {
          bsonType: "objectId",
          description: "ID de la sede donde se imparte"
        },
        profesor: {
          bsonType: "objectId",
          description: "ID del profesor asignado"
        },
        horario: {
          bsonType: "object",
          required: ["dia", "horaInicio", "horaFin"],
          properties: {
            dia: {
              enum: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"],
              description: "Día de la semana"
            },
            horaInicio: {
              bsonType: "string",
              pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$",
              description: "Hora de inicio (formato HH:MM)"
            },
            horaFin: {
              bsonType: "string",
              pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$",
              description: "Hora de fin (formato HH:MM)"
            }
          }
        },
        fechaInicio: {
          bsonType: "date",
          description: "Fecha de inicio del curso"
        },
        fechaFin: {
          bsonType: "date",
          description: "Fecha de finalización del curso"
        },
        activo: {
          bsonType: "bool",
          description: "Estado del curso"
        }
      }
    }
  }
});

// 6. COLECCIÓN INSCRIPCIONES
db.createCollection("inscripciones", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["estudiante", "curso", "fechaInscripcion", "estado", "costoTotal"],
      properties: {
        estudiante: {
          bsonType: "objectId",
          description: "ID del estudiante inscrito"
        },
        curso: {
          bsonType: "objectId",
          description: "ID del curso"
        },
        sede: {
          bsonType: "objectId",
          description: "ID de la sede"
        },
        profesor: {
          bsonType: "objectId",
          description: "ID del profesor"
        },
        fechaInscripcion: {
          bsonType: "date",
          description: "Fecha de inscripción"
        },
        estado: {
          enum: ["activa", "completada", "cancelada", "suspendida"],
          description: "Estado de la inscripción"
        },
        costoTotal: {
          bsonType: "double",
          minimum: 0,
          description: "Costo total pagado"
        },
        metodoPago: {
          enum: ["efectivo", "tarjeta", "transferencia"],
          description: "Método de pago utilizado"
        },
        observaciones: {
          bsonType: "string",
          description: "Observaciones adicionales"
        },
        fechaFinalizacion: {
          bsonType: "date",
          description: "Fecha de finalización de la inscripción"
        }
      }
    }
  }
});

// 7. COLECCIÓN INSTRUMENTOS
db.createCollection("instrumentos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "tipo", "marca", "sede", "estado", "disponible"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Nombre/código del instrumento"
        },
        tipo: {
          enum: ["piano", "guitarra", "violin", "bajo", "bateria", "saxofon", "flauta"],
          description: "Tipo de instrumento"
        },
        marca: {
          bsonType: "string",
          description: "Marca del instrumento"
        },
        modelo: {
          bsonType: "string",
          description: "Modelo del instrumento"
        },
        numeroSerie: {
          bsonType: "string",
          description: "Número de serie"
        },
        sede: {
          bsonType: "objectId",
          description: "ID de la sede donde se encuentra"
        },
        estado: {
          enum: ["excelente", "bueno", "regular", "malo", "en_reparacion"],
          description: "Estado físico del instrumento"
        },
        disponible: {
          bsonType: "bool",
          description: "Disponibilidad para préstamo"
        },
        valorComercial: {
          bsonType: "double",
          minimum: 0,
          description: "Valor comercial del instrumento"
        },
        fechaAdquisicion: {
          bsonType: "date",
          description: "Fecha de adquisición"
        },
        observaciones: {
          bsonType: "string",
          description: "Observaciones sobre el instrumento"
        }
      }
    }
  }
});

// 8. COLECCIÓN RESERVAS_INSTRUMENTOS
db.createCollection("reservas_instrumentos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["estudiante", "instrumento", "fechaReserva", "fechaInicio", "fechaFin", "estado"],
      properties: {
        estudiante: {
          bsonType: "objectId",
          description: "ID del estudiante que reserva"
        },
        instrumento: {
          bsonType: "objectId",
          description: "ID del instrumento reservado"
        },
        fechaReserva: {
          bsonType: "date",
          description: "Fecha en que se hizo la reserva"
        },
        fechaInicio: {
          bsonType: "date",
          description: "Fecha de inicio del préstamo"
        },
        fechaFin: {
          bsonType: "date",
          description: "Fecha de finalización del préstamo"
        },
        estado: {
          enum: ["reservada", "en_prestamo", "devuelta", "vencida", "cancelada"],
          description: "Estado de la reserva"
        },
        observacionesEntrega: {
          bsonType: "string",
          description: "Observaciones al momento de la entrega"
        },
        observacionesDevolucion: {
          bsonType: "string",
          description: "Observaciones al momento de la devolución"
        },
        empleadoEntrega: {
          bsonType: "objectId",
          description: "ID del empleado que entregó el instrumento"
        },
        empleadoDevolucion: {
          bsonType: "objectId",
          description: "ID del empleado que recibió el instrumento"
        }
      }
    }
  }
});

// CREACIÓN DE ÍNDICES

// Índices para usuarios
db.usuarios.createIndex({ "documento": 1 }, { unique: true });
db.usuarios.createIndex({ "email": 1 }, { unique: true });
db.usuarios.createIndex({ "rol": 1, "activo": 1 });
db.usuarios.createIndex({ "sedeAsignada": 1 });

// Índices para sedes
db.sedes.createIndex({ "ciudad": 1, "activa": 1 });
db.sedes.createIndex({ "nombre": 1 }, { unique: true });

// Índices para profesores
db.profesores.createIndex({ "documento": 1 }, { unique: true });
db.profesores.createIndex({ "especialidades": 1 });
db.profesores.createIndex({ "sedesAsignadas": 1 });
db.profesores.createIndex({ "activo": 1 });

// Índices para estudiantes
db.estudiantes.createIndex({ "documento": 1 }, { unique: true });
db.estudiantes.createIndex({ "email": 1 });
db.estudiantes.createIndex({ "nivelMusical": 1, "activo": 1 });
db.estudiantes.createIndex({ "fechaRegistro": -1 });

// Índices para cursos
db.cursos.createIndex({ "sede": 1, "activo": 1 });
db.cursos.createIndex({ "instrumento": 1, "nivel": 1 });
db.cursos.createIndex({ "profesor": 1 });
db.cursos.createIndex({ "horario.dia": 1, "sede": 1 });
db.cursos.createIndex({ "fechaInicio": 1, "fechaFin": 1 });
db.cursos.createIndex({ "cuposDisponibles": 1 });

// Índices para inscripciones
db.inscripciones.createIndex({ "estudiante": 1, "estado": 1 });
db.inscripciones.createIndex({ "curso": 1 });
db.inscripciones.createIndex({ "sede": 1, "fechaInscripcion": -1 });
db.inscripciones.createIndex({ "profesor": 1 });
db.inscripciones.createIndex({ "fechaInscripcion": -1 });

// Índices para instrumentos
db.instrumentos.createIndex({ "sede": 1, "disponible": 1 });
db.instrumentos.createIndex({ "tipo": 1, "estado": 1 });
db.instrumentos.createIndex({ "numeroSerie": 1 }, { unique: true, sparse: true });

// Índices para reservas de instrumentos
db.reservas_instrumentos.createIndex({ "estudiante": 1, "estado": 1 });
db.reservas_instrumentos.createIndex({ "instrumento": 1, "estado": 1 });
db.reservas_instrumentos.createIndex({ "fechaInicio": 1, "fechaFin": 1 });
db.reservas_instrumentos.createIndex({ "fechaReserva": -1 });

console.log("✅ Base de datos y colecciones creadas exitosamente");
console.log("✅ Esquemas de validación aplicados");
console.log("✅ Índices creados correctamente");