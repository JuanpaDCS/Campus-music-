// aggregations.js - Consultas analíticas con framework de agregación
// Campus Music - Reportes y análisis de datos

use('campus_music');

console.log("=== CONSULTAS ANALÍTICAS CAMPUS MUSIC ===\n");

// 1. ¿Cuántos estudiantes se inscribieron por sede en el último mes?
console.log("1. ESTUDIANTES INSCRITOS POR SEDE (ÚLTIMO MES)");
console.log("===============================================");

const fechaLimite = new Date();
fechaLimite.setMonth(fechaLimite.getMonth() - 1);

const estudiantesPorSede = db.inscripciones.aggregate([
  {
    $match: {
      fechaInscripcion: { $gte: fechaLimite },
      estado: { $ne: "cancelada" }
    }
  },
  {
    $lookup: {
      from: "sedes",
      localField: "sede",
      foreignField: "_id",
      as: "sedeInfo"
    }
  },
  {
    $unwind: "$sedeInfo"
  },
  {
    $group: {
      _id: "$sede",
      sede: { $first: "$sedeInfo.nombre" },
      ciudad: { $first: "$sedeInfo.ciudad" },
      totalInscripciones: { $sum: 1 },
      estudiantesUnicos: { $addToSet: "$estudiante" }
    }
  },
  {
    $project: {
      sede: 1,
      ciudad: 1,
      totalInscripciones: 1,
      estudiantesUnicos: { $size: "$estudiantesUnicos" }
    }
  },
  {
    $sort: { totalInscripciones: -1 }
  }
]);

estudiantesPorSede.forEach(doc => {
  console.log(`${doc.sede} (${doc.ciudad}): ${doc.estudiantesUnicos} estudiantes únicos, ${doc.totalInscripciones} inscripciones`);
});

console.log("\n");

// 2. ¿Cuáles son los cursos más demandados en cada sede?
console.log("2. CURSOS MÁS DEMANDADOS POR SEDE");
console.log("==================================");

const cursosPorSede = db.inscripciones.aggregate([
  {
    $match: {
      estado: { $in: ["activa", "completada"] }
    }
  },
  {
    $lookup: {
      from: "cursos",
      localField: "curso",
      foreignField: "_id",
      as: "cursoInfo"
    }
  },
  {
    $unwind: "$cursoInfo"
  },
  {
    $lookup: {
      from: "sedes",
      localField: "sede",
      foreignField: "_id",
      as: "sedeInfo"
    }
  },
  {
    $unwind: "$sedeInfo"
  },
  {
    $group: {
      _id: {
        sede: "$sede",
        curso: "$curso"
      },
      sede: { $first: "$sedeInfo.nombre" },
      curso: { $first: "$cursoInfo.nombre" },
      instrumento: { $first: "$cursoInfo.instrumento" },
      nivel: { $first: "$cursoInfo.nivel" },
      totalInscripciones: { $sum: 1 }
    }
  },
  {
    $sort: { "_id.sede": 1, totalInscripciones: -1 }
  },
  {
    $group: {
      _id: "$_id.sede",
      sede: { $first: "$sede" },
      cursos: {
        $push: {
          curso: "$curso",
          instrumento: "$instrumento",
          nivel: "$nivel",
          inscripciones: "$totalInscripciones"
        }
      }
    }
  },
  {
    $project: {
      sede: 1,
      top3Cursos: { $slice: ["$cursos", 3] }
    }
  }
]);

cursosPorSede.forEach(sede => {
  console.log(`\n${sede.sede}:`);
  sede.top3Cursos.forEach((curso, index) => {
    console.log(`  ${index + 1}. ${curso.curso} (${curso.instrumento} ${curso.nivel}) - ${curso.inscripciones} inscripciones`);
  });
});

console.log("\n");

// 3. ¿Cuál es el ingreso total generado por inscripciones en cada sede?
console.log("3. INGRESOS POR SEDE");
console.log("====================");

const ingresosPorSede = db.inscripciones.aggregate([
  {
    $match: {
      estado: { $in: ["activa", "completada"] }
    }
  },
  {
    $lookup: {
      from: "sedes",
      localField: "sede",
      foreignField: "_id",
      as: "sedeInfo"
    }
  },
  {
    $unwind: "$sedeInfo"
  },
  {
    $group: {
      _id: "$sede",
      sede: { $first: "$sedeInfo.nombre" },
      ciudad: { $first: "$sedeInfo.ciudad" },
      ingresoTotal: { $sum: "$costoTotal" },
      totalInscripciones: { $sum: 1 },
      ingresoPromedio: { $avg: "$costoTotal" }
    }
  },
  {
    $sort: { ingresoTotal: -1 }
  }
]);

ingresosPorSede.forEach(sede => {
  console.log(`${sede.sede} (${sede.ciudad}):`);
  console.log(`  Ingreso total: ${sede.ingresoTotal.toLocaleString()}`);
  console.log(`  Inscripciones: ${sede.totalInscripciones}`);
  console.log(`  Promedio por inscripción: ${Math.round(sede.ingresoPromedio).toLocaleString()}`);
});

console.log("\n");

// 4. ¿Qué profesor tiene más estudiantes asignados?
console.log("4. PROFESORES CON MÁS ESTUDIANTES ASIGNADOS");
console.log("===========================================");

const profesoresConEstudiantes = db.inscripciones.aggregate([
  {
    $match: {
      estado: "activa"
    }
  },
  {
    $lookup: {
      from: "profesores",
      localField: "profesor",
      foreignField: "_id",
      as: "profesorInfo"
    }
  },
  {
    $unwind: "$profesorInfo"
  },
  {
    $group: {
      _id: "$profesor",
      profesor: { $first: "$profesorInfo.nombre" },
      especialidades: { $first: "$profesorInfo.especialidades" },
      estudiantesUnicos: { $addToSet: "$estudiante" },
      cursosActivos: { $addToSet: "$curso" },
      totalInscripciones: { $sum: 1 }
    }
  },
  {
    $project: {
      profesor: 1,
      especialidades: 1,
      totalEstudiantes: { $size: "$estudiantesUnicos" },
      cursosActivos: { $size: "$cursosActivos" },
      totalInscripciones: 1
    }
  },
  {
    $sort: { totalEstudiantes: -1 }
  },
  {
    $limit: 5
  }
]);

profesoresConEstudiantes.forEach((prof, index) => {
  console.log(`${index + 1}. ${prof.profesor}`);
  console.log(`   Estudiantes activos: ${prof.totalEstudiantes}`);
  console.log(`   Cursos activos: ${prof.cursosActivos}`);
  console.log(`   Especialidades: ${prof.especialidades.join(', ')}`);
});

console.log("\n");

// 5. ¿Qué instrumento es el más reservado?
console.log("5. INSTRUMENTOS MÁS RESERVADOS");
console.log("==============================");

const instrumentosMasReservados = db.reservas_instrumentos.aggregate([
  {
    $lookup: {
      from: "instrumentos",
      localField: "instrumento",
      foreignField: "_id",
      as: "instrumentoInfo"
    }
  },
  {
    $unwind: "$instrumentoInfo"
  },
  {
    $group: {
      _id: "$instrumentoInfo.tipo",
      tipoInstrumento: { $first: "$instrumentoInfo.tipo" },
      totalReservas: { $sum: 1 },
      reservasActivas: {
        $sum: {
          $cond: [
            { $in: ["$estado", ["reservada", "en_prestamo"]] },
            1,
            0
          ]
        }
      },
      instrumentosUnicos: { $addToSet: "$instrumento" }
    }
  },
  {
    $project: {
      tipoInstrumento: 1,
      totalReservas: 1,
      reservasActivas: 1,
      instrumentosDisponibles: { $size: "$instrumentosUnicos" }
    }
  },
  {
    $sort: { totalReservas: -1 }
  }
]);

instrumentosMasReservados.forEach((tipo, index) => {
  console.log(`${index + 1}. ${tipo.tipoInstrumento.toUpperCase()}`);
  console.log(`   Total reservas: ${tipo.totalReservas}`);
  console.log(`   Reservas activas: ${tipo.reservasActivas}`);
  console.log(`   Instrumentos disponibles: ${tipo.instrumentosDisponibles}`);
});

console.log("\n");

// 6. Mostrar el historial de cursos de un estudiante específico
console.log("6. HISTORIAL DE CURSOS DE ESTUDIANTE");
console.log("====================================");

const estudianteEjemplo = ObjectId("652a1234567890123456001"); // Juan Pablo Martínez

const historialEstudiante = db.inscripciones.aggregate([
  {
    $match: {
      estudiante: estudianteEjemplo
    }
  },
  {
    $lookup: {
      from: "estudiantes",
      localField: "estudiante",
      foreignField: "_id",
      as: "estudianteInfo"
    }
  },
  {
    $lookup: {
      from: "cursos",
      localField: "curso",
      foreignField: "_id",
      as: "cursoInfo"
    }
  },
  {
    $lookup: {
      from: "sedes",
      localField: "sede",
      foreignField: "_id",
      as: "sedeInfo"
    }
  },
  {
    $lookup: {
      from: "profesores",
      localField: "profesor",
      foreignField: "_id",
      as: "profesorInfo"
    }
  },
  {
    $unwind: "$estudianteInfo"
  },
  {
    $unwind: "$cursoInfo"
  },
  {
    $unwind: "$sedeInfo"
  },
  {
    $unwind: "$profesorInfo"
  },
  {
    $project: {
      estudiante: "$estudianteInfo.nombre",
      fecha: "$fechaInscripcion",
      sede: "$sedeInfo.nombre",
      curso: "$cursoInfo.nombre",
      profesor: "$profesorInfo.nombre",
      nivel: "$cursoInfo.nivel",
      instrumento: "$cursoInfo.instrumento",
      costo: "$costoTotal",
      estado: 1,
      fechaFinalizacion: 1
    }
  },
  {
    $sort: { fecha: -1 }
  }
]);

const historial = historialEstudiante.toArray();
if (historial.length > 0) {
  console.log(`Estudiante: ${historial[0].estudiante}\n`);
  historial.forEach((curso, index) => {
    console.log(`${index + 1}. ${curso.curso}`);
    console.log(`   Fecha: ${curso.fecha.toISOString().split('T')[0]}`);
    console.log(`   Sede: ${curso.sede}`);
    console.log(`   Profesor: ${curso.profesor}`);
    console.log(`   Nivel: ${curso.nivel} | Instrumento: ${curso.instrumento}`);
    console.log(`   Costo: ${curso.costo.toLocaleString()}`);
    console.log(`   Estado: ${curso.estado}`);
    if (curso.fechaFinalizacion) {
      console.log(`   Finalizado: ${curso.fechaFinalizacion.toISOString().split('T')[0]}`);
    }
    console.log("");
  });
}

console.log("\n");

// 7. Listar los cursos actualmente en ejecución en cada sede
console.log("7. CURSOS ACTUALMENTE EN EJECUCIÓN POR SEDE");
console.log("===========================================");

const fechaActual = new Date();

const cursosEnEjecucion = db.cursos.aggregate([
  {
    $match: {
      activo: true,
      fechaInicio: { $lte: fechaActual },
      fechaFin: { $gte: fechaActual }
    }
  },
  {
    $lookup: {
      from: "sedes",
      localField: "sede",
      foreignField: "_id",
      as: "sedeInfo"
    }
  },
  {
    $lookup: {
      from: "profesores",
      localField: "profesor",
      foreignField: "_id",
      as: "profesorInfo"
    }
  },
  {
    $unwind: "$sedeInfo"
  },
  {
    $unwind: "$profesorInfo"
  },
  {
    $project: {
      sede: "$sedeInfo.nombre",
      ciudad: "$sedeInfo.ciudad",
      curso: "$nombre",
      instrumento: 1,
      nivel: 1,
      profesor: "$profesorInfo.nombre",
      horario: 1,
      cupoMaximo: 1,
      cuposDisponibles: 1,
      fechaFin: 1
    }
  },
  {
    $group: {
      _id: "$sede",
      ciudad: { $first: "$ciudad" },
      cursos: {
        $push: {
          nombre: "$curso",
          instrumento: "$instrumento",
          nivel: "$nivel",
          profesor: "$profesor",
          horario: "$horario",
          cupoMaximo: "$cupoMaximo",
          cuposDisponibles: "$cuposDisponibles",
          fechaFin: "$fechaFin"
        }
      }
    }
  },
  {
    $sort: { "_id": 1 }
  }
]);

cursosEnEjecucion.forEach(sede => {
  console.log(`\n${sede._id} (${sede.ciudad}):`);
  console.log(`Total cursos activos: ${sede.cursos.length}`);
  sede.cursos.forEach((curso, index) => {
    console.log(`\n  ${index + 1}. ${curso.nombre}`);
    console.log(`     Instrumento: ${curso.instrumento} | Nivel: ${curso.nivel}`);
    console.log(`     Profesor: ${curso.profesor}`);
    console.log(`     Horario: ${curso.horario.dia} ${curso.horario.horaInicio}-${curso.horario.horaFin}`);
    console.log(`     Cupos: ${curso.cuposDisponibles}/${curso.cupoMaximo} disponibles`);
    console.log(`     Finaliza: ${curso.fechaFin.toISOString().split('T')[0]}`);
  });
});

console.log("\n");

// 8. Detectar cursos que excedieron el cupo permitido
console.log("8. CURSOS QUE EXCEDIERON EL CUPO PERMITIDO");
console.log("==========================================");

const cursosExcedidos = db.inscripciones.aggregate([
  {
    $match: {
      estado: { $in: ["activa", "completada"] }
    }
  },
  {
    $group: {
      _id: "$curso",
      totalInscripciones: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "cursos",
      localField: "_id",
      foreignField: "_id",
      as: "cursoInfo"
    }
  },
  {
    $unwind: "$cursoInfo"
  },
  {
    $lookup: {
      from: "sedes",
      localField: "cursoInfo.sede",
      foreignField: "_id",
      as: "sedeInfo"
    }
  },
  {
    $lookup: {
      from: "profesores",
      localField: "cursoInfo.profesor",
      foreignField: "_id",
      as: "profesorInfo"
    }
  },
  {
    $unwind: "$sedeInfo"
  },
  {
    $unwind: "$profesorInfo"
  },
  {
    $project: {
      curso: "$cursoInfo.nombre",
      sede: "$sedeInfo.nombre",
      profesor: "$profesorInfo.nombre",
      cupoMaximo: "$cursoInfo.cupoMaximo",
      totalInscripciones: 1,
      exceso: { $subtract: ["$totalInscripciones", "$cursoInfo.cupoMaximo"] },
      porcentajeOcupacion: {
        $multiply: [
          { $divide: ["$totalInscripciones", "$cursoInfo.cupoMaximo"] },
          100
        ]
      }
    }
  },
  {
    $match: {
      exceso: { $gt: 0 }
    }
  },
  {
    $sort: { exceso: -1 }
  }
]);

const cursosExcedidosArray = cursosExcedidos.toArray();
if (cursosExcedidosArray.length > 0) {
  cursosExcedidosArray.forEach((curso, index) => {
    console.log(`${index + 1}. ${curso.curso} (${curso.sede})`);
    console.log(`   Profesor: ${curso.profesor}`);
    console.log(`   Cupo máximo: ${curso.cupoMaximo}`);
    console.log(`   Inscripciones actuales: ${curso.totalInscripciones}`);
    console.log(`   Exceso: ${curso.exceso} estudiantes`);
    console.log(`   Ocupación: ${Math.round(curso.porcentajeOcupacion)}%`);
  });
} else {
  console.log("✅ No se encontraron cursos que hayan excedido su cupo máximo");
}

console.log("\n");

// CONSULTA ADICIONAL: Resumen general del sistema
console.log("9. RESUMEN GENERAL DEL SISTEMA");
console.log("==============================");

const resumenGeneral = db.sedes.aggregate([
  {
    $lookup: {
      from: "cursos",
      localField: "_id",
      foreignField: "sede",
      as: "cursos"
    }
  },
  {
    $lookup: {
      from: "inscripciones",
      localField: "_id",
      foreignField: "sede",
      as: "inscripciones"
    }
  },
  {
    $lookup: {
      from: "instrumentos",
      localField: "_id",
      foreignField: "sede",
      as: "instrumentos"
    }
  },
  {
    $project: {
      sede: "$nombre",
      ciudad: 1,
      totalCursos: { $size: "$cursos" },
      cursosActivos: {
        $size: {
          $filter: {
            input: "$cursos",
            cond: { $eq: ["$this.activo", true] }
          }
        }
      },
      totalInscripciones: { $size: "$inscripciones" },
      inscripcionesActivas: {
        $size: {
          $filter: {
            input: "$inscripciones",
            cond: { $eq: ["$this.estado", "activa"] }
          }
        }
      },
      totalInstrumentos: { $size: "$instrumentos" },
      instrumentosDisponibles: {
        $size: {
          $filter: {
            input: "$instrumentos",
            cond: { $eq: ["$this.disponible", true] }
          }
        }
      },
      ingresosTotales: {
        $sum: {
          $map: {
            input: {
              $filter: {
                input: "$inscripciones",
                cond: { $in: ["$this.estado", ["activa", "completada"]] }
              }
            },
            as: "inscripcion",
            in: "$inscripcion.costoTotal"
          }
        }
      }
    }
  }
]);

console.log("Resumen por sede:\n");
resumenGeneral.forEach(sede => {
  console.log(`${sede.sede} (${sede.ciudad}):`);
  console.log(`  Cursos: ${sede.cursosActivos}/${sede.totalCursos} activos`);
  console.log(`  Inscripciones: ${sede.inscripcionesActivas}/${sede.totalInscripciones} activas`);
  console.log(`  Instrumentos: ${sede.instrumentosDisponibles}/${sede.totalInstrumentos} disponibles`);
  console.log(`  Ingresos totales: ${sede.ingresosTotales.toLocaleString()}`);
  console.log("");
});

console.log("=== FIN DE CONSULTAS ANALÍTICAS ===");