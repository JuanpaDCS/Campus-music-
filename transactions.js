// transactions.js - Transacciones MongoDB para Campus Music
// Implementación de transacciones ACID para operaciones críticas

use('campus_music');

console.log("=== TRANSACCIONES MONGODB - CAMPUS MUSIC ===");
console.log("Sistema de inscripciones con integridad de datos\n");

// ============================================================================
// FUNCIÓN PRINCIPAL DE INSCRIPCIÓN CON TRANSACCIONES
// ============================================================================

/**
 * Función para inscribir un estudiante en un curso usando transacciones MongoDB
 * Esta función garantiza la integridad de los datos mediante ACID properties
 * 
 * @param {ObjectId} estudianteId - ID del estudiante
 * @param {ObjectId} cursoId - ID del curso
 * @param {string} metodoPago - Método de pago (efectivo, tarjeta, transferencia)
 * @param {string} observaciones - Observaciones adicionales
 */
function inscribirEstudianteEnCurso(estudianteId, cursoId, metodoPago = "tarjeta", observaciones = "") {
  
  console.log("🎯 INICIANDO TRANSACCIÓN DE INSCRIPCIÓN");
  console.log("=========================================");
  
  // Iniciar una sesión para la transacción
  const session = db.getMongo().startSession();
  
  try {
    // Iniciar la transacción
    session.startTransaction({
      readConcern: { level: "snapshot" },
      writeConcern: { w: "majority" }
    });
    
    console.log("✅ Transacción iniciada exitosamente");
    console.log(`📝 Estudiante ID: ${estudianteId}`);
    console.log(`📚 Curso ID: ${cursoId}`);
    console.log(`💳 Método de pago: ${metodoPago}`);
    
    // ========================================================================
    // PASO 1: Validar que el estudiante existe y está activo
    // ========================================================================
    console.log("\n🔍 PASO 1: Validando estudiante...");
    
    const estudiante = db.estudiantes.findOne(
      { _id: estudianteId, activo: true },
      { session: session }
    );
    
    if (!estudiante) {
      throw new Error(`Estudiante con ID ${estudianteId} no encontrado o inactivo`);
    }
    
    console.log(`✅ Estudiante validado: ${estudiante.nombre}`);
    console.log(`   Documento: ${estudiante.documento}`);
    console.log(`   Nivel musical: ${estudiante.nivelMusical}`);
    
    // ========================================================================
    // PASO 2: Validar que el curso existe, está activo y tiene cupos
    // ========================================================================
    console.log("\n🔍 PASO 2: Validando curso y disponibilidad...");
    
    const curso = db.cursos.findOne(
      { _id: cursoId, activo: true },
      { session: session }
    );
    
    if (!curso) {
      throw new Error(`Curso con ID ${cursoId} no encontrado o inactivo`);
    }
    
    console.log(`✅ Curso validado: ${curso.nombre}`);
    console.log(`   Instrumento: ${curso.instrumento}`);
    console.log(`   Nivel: ${curso.nivel}`);
    console.log(`   Cupos disponibles: ${curso.cuposDisponibles}/${curso.cupoMaximo}`);
    console.log(`   Costo: $${curso.costo.toLocaleString()}`);
    
    // Verificar cupos disponibles
    if (curso.cuposDisponibles <= 0) {
      throw new Error(`El curso "${curso.nombre}" no tiene cupos disponibles`);
    }
    
    // ========================================================================
    // PASO 3: Verificar que el estudiante no esté ya inscrito en el curso
    // ========================================================================
    console.log("\n🔍 PASO 3: Verificando inscripciones existentes...");
    
    const inscripcionExistente = db.inscripciones.findOne(
      {
        estudiante: estudianteId,
        curso: cursoId,
        estado: { $in: ["activa", "reservada"] }
      },
      { session: session }
    );
    
    if (inscripcionExistente) {
      throw new Error(`El estudiante ya está inscrito en el curso "${curso.nombre}"`);
    }
    
    console.log("✅ No hay inscripciones duplicadas");
    
    // ========================================================================
    // PASO 4: Obtener información adicional (sede y profesor)
    // ========================================================================
    console.log("\n🔍 PASO 4: Obteniendo información complementaria...");
    
    const sede = db.sedes.findOne(
      { _id: curso.sede },
      { session: session }
    );
    
    const profesor = db.profesores.findOne(
      { _id: curso.profesor },
      { session: session }
    );
    
    if (!sede || !profesor) {
      throw new Error("Error al obtener información de sede o profesor");
    }
    
    console.log(`✅ Sede: ${sede.nombre} (${sede.ciudad})`);
    console.log(`✅ Profesor: ${profesor.nombre}`);
    
    // ========================================================================
    // PASO 5: Crear la inscripción (INSERT en tabla inscripciones)
    // ========================================================================
    console.log("\n📝 PASO 5: Creando registro de inscripción...");
    
    const nuevaInscripcion = {
      estudiante: estudianteId,
      curso: cursoId,
      sede: curso.sede,
      profesor: curso.profesor,
      fechaInscripcion: new Date(),
      estado: "activa",
      costoTotal: curso.costo,
      metodoPago: metodoPago,
      observaciones: observaciones || `Inscripción automática en ${curso.nombre}`
    };
    
    const resultadoInscripcion = db.inscripciones.insertOne(
      nuevaInscripcion,
      { session: session }
    );
    
    if (!resultadoInscripcion.insertedId) {
      throw new Error("Error al crear la inscripción");
    }
    
    console.log(`✅ Inscripción creada con ID: ${resultadoInscripcion.insertedId}`);
    
    // ========================================================================
    // PASO 6: Actualizar cupos disponibles del curso (UPDATE en tabla cursos)
    // ========================================================================
    console.log("\n🔄 PASO 6: Actualizando cupos disponibles...");
    
    const resultadoActualizacion = db.cursos.updateOne(
      { _id: cursoId },
      { 
        $inc: { cuposDisponibles: -1 },
        $set: { fechaActualizacion: new Date() }
      },
      { session: session }
    );
    
    if (resultadoActualizacion.modifiedCount !== 1) {
      throw new Error("Error al actualizar los cupos del curso");
    }
    
    const nuevoCupo = curso.cuposDisponibles - 1;
    console.log(`✅ Cupos actualizados: ${nuevoCupo}/${curso.cupoMaximo}`);
    
    // ========================================================================
    // PASO 7: Confirmar la transacción (COMMIT)
    // ========================================================================
    console.log("\n💾 PASO 7: Confirmando transacción...");
    
    session.commitTransaction();
    console.log("✅ TRANSACCIÓN CONFIRMADA EXITOSAMENTE");
    
    // ========================================================================
    // RESUMEN DE LA OPERACIÓN EXITOSA
    // ========================================================================
    console.log("\n🎉 INSCRIPCIÓN COMPLETADA");
    console.log("=========================");
    console.log(`Estudiante: ${estudiante.nombre}`);
    console.log(`Curso: ${curso.nombre}`);
    console.log(`Sede: ${sede.nombre} (${sede.ciudad})`);
    console.log(`Profesor: ${profesor.nombre}`);
    console.log(`Costo: $${curso.costo.toLocaleString()}`);
    console.log(`Método de pago: ${metodoPago}`);
    console.log(`ID Inscripción: ${resultadoInscripcion.insertedId}`);
    console.log(`Fecha: ${new Date().toISOString().split('T')[0]}`);
    console.log(`Cupos restantes: ${nuevoCupo}/${curso.cupoMaximo}`);
    
    return {
      success: true,
      inscripcionId: resultadoInscripcion.insertedId,
      estudiante: estudiante.nombre,
      curso: curso.nombre,
      costo: curso.costo,
      cuposRestantes: nuevoCupo
    };
    
  } catch (error) {
    // ========================================================================
    // MANEJO DE ERRORES - ROLLBACK DE LA TRANSACCIÓN
    // ========================================================================
    console.log("\n❌ ERROR EN LA TRANSACCIÓN");
    console.log("===========================");
    console.log(`Error: ${error.message}`);
    
    try {
      session.abortTransaction();
      console.log("🔙 Transacción revertida (ROLLBACK)");
      console.log("   - No se creó la inscripción");
      console.log("   - No se modificaron los cupos");
      console.log("   - Estado de la base de datos restaurado");
    } catch (abortError) {
      console.log(`❌ Error al revertir transacción: ${abortError.message}`);
    }
    
    return {
      success: false,
      error: error.message,
      timestamp: new Date()
    };
    
  } finally {
    // ========================================================================
    // LIMPIEZA - CERRAR LA SESIÓN
    // ========================================================================
    session.endSession();
    console.log("🔒 Sesión de transacción cerrada");
  }
}

// ============================================================================
// EJEMPLOS DE USO DE LA FUNCIÓN DE TRANSACCIONES
// ============================================================================

console.log("\n" + "=".repeat(50));
console.log("EJEMPLOS DE EJECUCIÓN DE TRANSACCIONES");
console.log("=".repeat(50) + "\n");

// EJEMPLO 1: Inscripción exitosa
console.log("📚 EJEMPLO 1: INSCRIPCIÓN EXITOSA");
console.log("-".repeat(35));

const resultado1 = inscribirEstudianteEnCurso(
  ObjectId("652a1234567890123456001"), // Juan Pablo Martínez
  ObjectId("653a1234567890123456003"), // Curso: Canto Popular
  "tarjeta",
  "Primera inscripción del estudiante en canto"
);

console.log("\nResultado:", resultado1);

console.log("\n" + "=".repeat(50));

// EJEMPLO 2: Intento de inscripción duplicada (debe fallar)
console.log("📚 EJEMPLO 2: INSCRIPCIÓN DUPLICADA (DEBE FALLAR)");
console.log("-".repeat(48));

const resultado2 = inscribirEstudianteEnCurso(
  ObjectId("652a1234567890123456001"), // Mismo estudiante Juan Pablo
  ObjectId("653a1234567890123456001"), // Piano Básico (ya inscrito)
  "efectivo",
  "Intento de inscripción duplicada"
);

console.log("\nResultado:", resultado2);

console.log("\n" + "=".repeat(50));

// EJEMPLO 3: Inscripción en curso sin cupos (debe fallar)
console.log("📚 EJEMPLO 3: CURSO SIN CUPOS DISPONIBLES");
console.log("-".repeat(40));

const resultado3 = inscribirEstudianteEnCurso(
  ObjectId("652a1234567890123456014"), // Alejandra Mendoza
  ObjectId("653a1234567890123456007"), // Piano Avanzado (1 cupo disponible)
  "transferencia",
  "Intento de inscripción en curso lleno"
);

console.log("\nResultado:", resultado3);

// ============================================================================
// FUNCIÓN ADICIONAL: TRANSACCIÓN PARA CANCELAR INSCRIPCIÓN
// ============================================================================

console.log("\n" + "=".repeat(50));
console.log("TRANSACCIÓN ADICIONAL: CANCELAR INSCRIPCIÓN");
console.log("=".repeat(50) + "\n");

/**
 * Función para cancelar una inscripción y liberar el cupo
 * @param {ObjectId} inscripcionId - ID de la inscripción a cancelar
 * @param {string} motivoCancelacion - Motivo de la cancelación
 */
function cancelarInscripcion(inscripcionId, motivoCancelacion = "Cancelación voluntaria") {
  
  console.log("🚫 INICIANDO CANCELACIÓN DE INSCRIPCIÓN");
  console.log("=======================================");
  
  const session = db.getMongo().startSession();
  
  try {
    session.startTransaction({
      readConcern: { level: "snapshot" },
      writeConcern: { w: "majority" }
    });
    
    console.log(`📝 ID Inscripción: ${inscripcionId}`);
    console.log(`📋 Motivo: ${motivoCancelacion}`);
    
    // PASO 1: Validar que la inscripción existe y está activa
    const inscripcion = db.inscripciones.findOne(
      { _id: inscripcionId, estado: "activa" },
      { session: session }
    );
    
    if (!inscripcion) {
      throw new Error("Inscripción no encontrada o ya cancelada");
    }
    
    // PASO 2: Obtener información del curso
    const curso = db.cursos.findOne(
      { _id: inscripcion.curso },
      { session: session }
    );
    
    if (!curso) {
      throw new Error("Curso asociado no encontrado");
    }
    
    console.log(`✅ Inscripción encontrada para curso: ${curso.nombre}`);
    
    // PASO 3: Actualizar estado de inscripción
    const resultadoCancelacion = db.inscripciones.updateOne(
      { _id: inscripcionId },
      { 
        $set: { 
          estado: "cancelada",
          fechaFinalizacion: new Date(),
          observaciones: inscripcion.observaciones + ` | CANCELADA: ${motivoCancelacion}`
        }
      },
      { session: session }
    );
    
    if (resultadoCancelacion.modifiedCount !== 1) {
      throw new Error("Error al cancelar la inscripción");
    }
    
    // PASO 4: Liberar el cupo en el curso
    const resultadoLiberacion = db.cursos.updateOne(
      { _id: inscripcion.curso },
      { 
        $inc: { cuposDisponibles: 1 },
        $set: { fechaActualizacion: new Date() }
      },
      { session: session }
    );
    
    if (resultadoLiberacion.modifiedCount !== 1) {
      throw new Error("Error al liberar el cupo del curso");
    }
    
    session.commitTransaction();
    
    console.log("✅ CANCELACIÓN EXITOSA");
    console.log(`   Cupo liberado en: ${curso.nombre}`);
    console.log(`   Nuevos cupos disponibles: ${curso.cuposDisponibles + 1}/${curso.cupoMaximo}`);
    
    return {
      success: true,
      inscripcionId: inscripcionId,
      curso: curso.nombre,
      cuposLiberados: 1
    };
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    session.abortTransaction();
    console.log("🔙 Transacción de cancelación revertida");
    
    return {
      success: false,
      error: error.message
    };
    
  } finally {
    session.endSession();
  }
}

// EJEMPLO DE CANCELACIÓN
console.log("🚫 EJEMPLO: CANCELAR UNA INSCRIPCIÓN");
console.log("-".repeat(35));

// Buscar una inscripción activa para cancelar
const inscripcionParaCancelar = db.inscripciones.findOne({
  estado: "activa"
});

if (inscripcionParaCancelar) {
  const resultadoCancelacion = cancelarInscripcion(
    inscripcionParaCancelar._id,
    "Cancelación por cambio de horario del estudiante"
  );
  console.log("\nResultado cancelación:", resultadoCancelacion);
} else {
  console.log("No se encontraron inscripciones activas para cancelar");
}

// ============================================================================
// RESUMEN Y RECOMENDACIONES
// ============================================================================

console.log("\n" + "=".repeat(60));
console.log("RESUMEN DE IMPLEMENTACIÓN DE TRANSACCIONES");
console.log("=".repeat(60));

console.log(`
✅ CARACTERÍSTICAS IMPLEMENTADAS:
  • Transacciones ACID para inscripciones
  • Validaciones de integridad de datos
  • Manejo automático de rollback en errores
  • Actualización atómica de cupos
  • Prevención de inscripciones duplicadas
  • Funciones de cancelación con liberación de cupos
  
🛡️ GARANTÍAS DE INTEGRIDAD:
  • Atomicidad: Todas las operaciones se ejecutan o ninguna
  • Consistencia: Estado válido antes y después de la transacción
  • Aislamiento: Las transacciones no interfieren entre sí
  • Durabilidad: Los cambios confirmados son permanentes
  
💡 CASOS DE USO CUBIERTOS:
  • Inscripción exitosa de estudiante
  • Prevención de inscripciones duplicadas
  • Control de cupos disponibles
  • Cancelación con liberación de cupos
  • Manejo de errores con rollback automático
  
🔧 RECOMENDACIONES PARA PRODUCCIÓN:
  1. Implementar logs detallados de todas las transacciones
  2. Configurar timeouts apropiados para transacciones largas
  3. Implementar retry logic para transacciones fallidas por concurrencia
  4. Usar índices apropiados para mejorar performance
  5. Monitorear métricas de transacciones (tiempo, éxito/fallo)
  6. Implementar notificaciones para errores críticos
  7. Usar connection pooling para optimizar recursos
  8. Implementar circuit breakers para alta disponibilidad
`);

console.log("\n🎯 PRÓXIMOS PASOS SUGERIDOS:");
console.log("1. Extender transacciones a reservas de instrumentos");
console.log("2. Implementar transacciones para cambios de horario de cursos");
console.log("3. Agregar transacciones para procesos de facturación");
console.log("4. Crear sistema de auditoría de transacciones");
console.log("5. Implementar transacciones distribuidas si se requiere escalabilidad");

console.log("\n=== TRANSACCIONES MONGODB IMPLEMENTADAS EXITOSAMENTE ===");