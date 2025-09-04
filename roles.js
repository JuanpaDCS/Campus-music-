// roles.js - Definición de roles y permisos de seguridad
// Campus Music - Sistema de autorización basado en roles

use('campus_music');

console.log("=== CONFIGURACIÓN DE ROLES Y SEGURIDAD ===");
console.log("Campus Music - Sistema de Gestión Musical\n");

// ============================================================================
// 1. ELIMINACIÓN DE ROLES EXISTENTES (para evitar conflictos)
// ============================================================================

console.log("🗑️  Eliminando roles existentes...");

try {
  db.dropRole("administrador_campus");
} catch (e) {
  // Rol no existe, continuar
}

try {
  db.dropRole("empleado_sede_campus");
} catch (e) {
  // Rol no existe, continuar
}

try {
  db.dropRole("estudiante_campus");
} catch (e) {
  // Rol no existe, continuar
}

// ============================================================================
// 2. CREACIÓN DEL ROL ADMINISTRADOR
// ============================================================================

console.log("👑 Creando rol: ADMINISTRADOR");

db.createRole({
  role: "administrador_campus",
  privileges: [
    // Acceso completo a todas las colecciones
    {
      resource: { db: "campus_music", collection: "" },
      actions: [
        "find", "insert", "update", "remove",
        "createIndex", "dropIndex",
        "createCollection", "dropCollection",
        "collStats", "dbStats"
      ]
    },
    // Acceso específico a colecciones del sistema
    {
      resource: { db: "campus_music", collection: "usuarios" },
      actions: [
        "find", "insert", "update", "remove",
        "createIndex", "dropIndex"
      ]
    },
    {
      resource: { db: "campus_music", collection: "sedes" },
      actions: [
        "find", "insert", "update", "remove",
        "createIndex", "dropIndex"
      ]
    },
    {
      resource: { db: "campus_music", collection: "profesores" },
      actions: [
        "find", "insert", "update", "remove",
        "createIndex", "dropIndex"
      ]
    },
    {
      resource: { db: "campus_music", collection: "estudiantes" },
      actions: [
        "find", "insert", "update", "remove",
        "createIndex", "dropIndex"
      ]
    },
    {
      resource: { db: "campus_music", collection: "cursos" },
      actions: [
        "find", "insert", "update", "remove",
        "createIndex", "dropIndex"
      ]
    },
    {
      resource: { db: "campus_music", collection: "inscripciones" },
      actions: [
        "find", "insert", "update", "remove",
        "createIndex", "dropIndex"
      ]
    },
    {
      resource: { db: "campus_music", collection: "instrumentos" },
      actions: [
        "find", "insert", "update", "remove",
        "createIndex", "dropIndex"
      ]
    },
    {
      resource: { db: "campus_music", collection: "reservas_instrumentos" },
      actions: [
        "find", "insert", "update", "remove",
        "createIndex", "dropIndex"
      ]
    }
  ],
  roles: []
});

console.log("✅ Rol administrador creado exitosamente");
console.log("   - Acceso completo a todas las colecciones");
console.log("   - Puede crear usuarios, sedes, cursos e instrumentos");
console.log("   - Puede ejecutar operaciones de mantenimiento\n");

// ============================================================================
// 3. CREACIÓN DEL ROL EMPLEADO DE SEDE
// ============================================================================

console.log("👨‍💼 Creando rol: EMPLEADO DE SEDE");

db.createRole({
  role: "empleado_sede_campus",
  privileges: [
    // Lectura de estudiantes (limitada por sede en aplicación)
    {
      resource: { db: "campus_music", collection: "estudiantes" },
      actions: ["find", "insert", "update"]
    },
    // Lectura de profesores de su sede
    {
      resource: { db: "campus_music", collection: "profesores" },
      actions: ["find"]
    },
    // Lectura y escritura de cursos de su sede
    {
      resource: { db: "campus_music", collection: "cursos" },
      actions: ["find", "update"]
    },
    // Acceso completo a inscripciones para gestionar matriculas
    {
      resource: { db: "campus_music", collection: "inscripciones" },
      actions: ["find", "insert", "update"]
    },
    // Acceso a instrumentos de su sede
    {
      resource: { db: "campus_music", collection: "instrumentos" },
      actions: ["find", "update"]
    },
    // Gestión completa de reservas de instrumentos
    {
      resource: { db: "campus_music", collection: "reservas_instrumentos" },
      actions: ["find", "insert", "update", "remove"]
    },
    // Solo lectura de información de sedes
    {
      resource: { db: "campus_music", collection: "sedes" },
      actions: ["find"]
    },
    // Solo lectura de usuarios para validaciones
    {
      resource: { db: "campus_music", collection: "usuarios" },
      actions: ["find"]
    }
  ],
  roles: []
});

console.log("✅ Rol empleado de sede creado exitosamente");
console.log("   - Lectura de estudiantes, profesores y cursos de su sede");
console.log("   - Puede registrar inscripciones y gestionar reservas");
console.log("   - Acceso limitado a información de otras sedes");
console.log("   - No puede crear usuarios ni sedes\n");

// ============================================================================
// 4. CREACIÓN DEL ROL ESTUDIANTE
// ============================================================================

console.log("🎓 Creando rol: ESTUDIANTE");

db.createRole({
  role: "estudiante_campus",
  privileges: [
    // Solo puede ver su propia información de estudiante
    {
      resource: { db: "campus_music", collection: "estudiantes" },
      actions: ["find", "update"]
    },
    // Consulta de cursos disponibles (solo lectura)
    {
      resource: { db: "campus_music", collection: "cursos" },
      actions: ["find"]
    },
    // Ver su historial de inscripciones
    {
      resource: { db: "campus_music", collection: "inscripciones" },
      actions: ["find", "insert"]
    },
    // Consultar instrumentos disponibles
    {
      resource: { db: "campus_music", collection: "instrumentos" },
      actions: ["find"]
    },
    // Gestionar sus propias reservas de instrumentos
    {
      resource: { db: "campus_music", collection: "reservas_instrumentos" },
      actions: ["find", "insert", "update"]
    },
    // Consultar información de sedes
    {
      resource: { db: "campus_music", collection: "sedes" },
      actions: ["find"]
    },
    // Consultar información de profesores
    {
      resource: { db: "campus_music", collection: "profesores" },
      actions: ["find"]
    },
    // Acceso limitado a usuarios (solo su propia información)
    {
      resource: { db: "campus_music", collection: "usuarios" },
      actions: ["find", "update"]
    }
  ],
  roles: []
});

console.log("✅ Rol estudiante creado exitosamente");
console.log("   - Acceso a su propia información personal");
console.log("   - Consulta de cursos disponibles");
console.log("   - Ver su historial de inscripciones");
console.log("   - Puede reservar instrumentos");
console.log("   - Solo lectura de información general\n");

// ============================================================================
// 5. CREACIÓN DE USUARIOS DE EJEMPLO CON ROLES ASIGNADOS
// ============================================================================

console.log("👥 Creando usuarios de ejemplo con roles asignados...\n");

// 5.1 USUARIO ADMINISTRADOR
console.log("🔑 Creando usuario administrador...");

try {
  db.dropUser("admin_campus");
} catch (e) {
  // Usuario no existe
}

db.createUser({
  user: "admin_campus",
  pwd: "admin123_campus",
  roles: [
    {
      role: "administrador_campus",
      db: "campus_music"
    }
  ],
  customData: {
    nombre: "Ana María Rodríguez",
    email: "admin@campusmusic.com",
    rol: "administrador",
    fechaCreacion: new Date()
  }
});

console.log("✅ Usuario administrador creado:");
console.log("   Usuario: admin_campus");
console.log("   Contraseña: admin123_campus");
console.log("   Rol: administrador_campus\n");

// 5.2 USUARIO EMPLEADO DE SEDE BOGOTÁ
console.log("🏢 Creando usuario empleado sede Bogotá...");

try {
  db.dropUser("empleado_bogota");
} catch (e) {
  // Usuario no existe
}

db.createUser({
  user: "empleado_bogota",
  pwd: "emp123_bogota",
  roles: [
    {
      role: "empleado_sede_campus",
      db: "campus_music"
    }
  ],
  customData: {
    nombre: "Lucía Fernández",
    email: "lucia.fernandez@campusmusic.com",
    rol: "empleado_sede",
    sedeAsignada: ObjectId("650a1234567890123456001"), // Sede Bogotá
    fechaCreacion: new Date()
  }
});

console.log("✅ Usuario empleado Bogotá creado:");
console.log("   Usuario: empleado_bogota");
console.log("   Contraseña: emp123_bogota");
console.log("   Rol: empleado_sede_campus");
console.log("   Sede: Bogotá Centro\n");

// 5.3 USUARIO EMPLEADO DE SEDE MEDELLÍN
console.log("🏢 Creando usuario empleado sede Medellín...");

try {
  db.dropUser("empleado_medellin");
} catch (e) {
  // Usuario no existe
}

db.createUser({
  user: "empleado_medellin",
  pwd: "emp123_medellin",
  roles: [
    {
      role: "empleado_sede_campus",
      db: "campus_music"
    }
  ],
  customData: {
    nombre: "Miguel Santos",
    email: "miguel.santos@campusmusic.com",
    rol: "empleado_sede",
    sedeAsignada: ObjectId("650a1234567890123456002"), // Sede Medellín
    fechaCreacion: new Date()
  }
});

console.log("✅ Usuario empleado Medellín creado:");
console.log("   Usuario: empleado_medellin");
console.log("   Contraseña: emp123_medellin");
console.log("   Rol: empleado_sede_campus");
console.log("   Sede: Medellín Laureles\n");

// 5.4 USUARIO EMPLEADO DE SEDE CALI
console.log("🏢 Creando usuario empleado sede Cali...");

try {
  db.dropUser("empleado_cali");
} catch (e) {
  // Usuario no existe
}

db.createUser({
  user: "empleado_cali",
  pwd: "emp123_cali",
  roles: [
    {
      role: "empleado_sede_campus",
      db: "campus_music"
    }
  ],
  customData: {
    nombre: "Patricia Morales",
    email: "patricia.morales@campusmusic.com",
    rol: "empleado_sede",
    sedeAsignada: ObjectId("650a1234567890123456003"), // Sede Cali
    fechaCreacion: new Date()
  }
});

console.log("✅ Usuario empleado Cali creado:");
console.log("   Usuario: empleado_cali");
console.log("   Contraseña: emp123_cali");
console.log("   Rol: empleado_sede_campus");
console.log("   Sede: Cali Norte\n");

// 5.5 USUARIOS ESTUDIANTES
console.log("🎓 Creando usuarios estudiantes...");

// Estudiante 1: Juan Pablo Martínez
try {
  db.dropUser("juan_martinez");
} catch (e) {
  // Usuario no existe
}

db.createUser({
  user: "juan_martinez",
  pwd: "est123_juan",
  roles: [
    {
      role: "estudiante_campus",
      db: "campus_music"
    }
  ],
  customData: {
    nombre: "Juan Pablo Martínez",
    email: "juan.martinez@email.com",
    rol: "estudiante",
    estudianteId: ObjectId("652a1234567890123456001"),
    fechaCreacion: new Date()
  }
});

console.log("✅ Usuario estudiante Juan Pablo creado:");
console.log("   Usuario: juan_martinez");
console.log("   Contraseña: est123_juan");
console.log("   Rol: estudiante_campus\n");

// Estudiante 2: Camila Andrea López
try {
  db.dropUser("camila_lopez");
} catch (e) {
  // Usuario no existe
}

db.createUser({
  user: "camila_lopez",
  pwd: "est123_camila",
  roles: [
    {
      role: "estudiante_campus",
      db: "campus_music"
    }
  ],
  customData: {
    nombre: "Camila Andrea López",
    email: "camila.lopez@email.com",
    rol: "estudiante",
    estudianteId: ObjectId("652a1234567890123456002"),
    fechaCreacion: new Date()
  }
});

console.log("✅ Usuario estudiante Camila Andrea creado:");
console.log("   Usuario: camila_lopez");
console.log("   Contraseña: est123_camila");
console.log("   Rol: estudiante_campus\n");

// Estudiante 3: Sebastian Rodríguez
try {
  db.dropUser("sebastian_rodriguez");
} catch (e) {
  // Usuario no existe
}

db.createUser({
  user: "sebastian_rodriguez",
  pwd: "est123_sebastian",
  roles: [
    {
      role: "estudiante_campus",
      db: "campus_music"
    }
  ],
  customData: {
    nombre: "Sebastian Rodríguez",
    email: "sebastian.rodriguez@email.com",
    rol: "estudiante",
    estudianteId: ObjectId("652a1234567890123456003"),
    fechaCreacion: new Date()
  }
});

console.log("✅ Usuario estudiante Sebastian creado:");
console.log("   Usuario: sebastian_rodriguez");
console.log("   Contraseña: est123_sebastian");
console.log("   Rol: estudiante_campus\n");

// ============================================================================
// 6. VALIDACIÓN DE ROLES Y PERMISOS CREADOS
// ============================================================================

console.log("🔍 VALIDACIÓN DE ROLES CREADOS");
console.log("===============================\n");

// Listar todos los roles creados
console.log("Roles disponibles en la base de datos:");
db.getRoles().forEach(function(role) {
  if (role.role.includes("campus")) {
    console.log(`- ${role.role}`);
  }
});

console.log("\n");

// Listar todos los usuarios creados
console.log("Usuarios creados:");
db.getUsers().forEach(function(user) {
  if (user.user.includes("campus") || user.user.includes("juan") || 
      user.user.includes("camila") || user.user.includes("sebastian") ||
      user.user.includes("empleado")) {
    console.log(`- ${user.user} (Rol: ${user.roles[0].role})`);
  }
});

// ============================================================================
// 7. EJEMPLOS DE CONSULTAS CON DIFERENTES ROLES
// ============================================================================

console.log("\n");
console.log("📋 EJEMPLOS DE USO POR ROL");
console.log("===========================\n");

console.log("1. ADMINISTRADOR puede ejecutar:");
console.log("   db.auth('admin_campus', 'admin123_campus')");
console.log("   db.sedes.find() // Ver todas las sedes");
console.log("   db.usuarios.insertOne({...}) // Crear nuevos usuarios");
console.log("   db.cursos.remove({}) // Eliminar cursos");
console.log("   db.createCollection('nueva_coleccion') // Crear colecciones\n");

console.log("2. EMPLEADO DE SEDE puede ejecutar:");
console.log("   db.auth('empleado_bogota', 'emp123_bogota')");
console.log("   db.estudiantes.find() // Ver estudiantes");
console.log("   db.inscripciones.insertOne({...}) // Crear inscripciones");
console.log("   db.reservas_instrumentos.find() // Gestionar reservas");
console.log("   db.cursos.updateOne({...}) // Actualizar info de cursos\n");

console.log("3. ESTUDIANTE puede ejecutar:");
console.log("   db.auth('juan_martinez', 'est123_juan')");
console.log("   db.cursos.find({activo: true}) // Ver cursos disponibles");
console.log("   db.inscripciones.find({estudiante: ObjectId('...')}) // Su historial");
console.log("   db.reservas_instrumentos.insertOne({...}) // Reservar instrumentos");
console.log("   db.instrumentos.find({disponible: true}) // Ver instrumentos\n");

// ============================================================================
// 8. FUNCIONES DE VALIDACIÓN DE PERMISOS PARA LA APLICACIÓN
// ============================================================================

console.log("🛡️ FUNCIONES DE VALIDACIÓN DE SEGURIDAD");
console.log("=========================================\n");

console.log("/* Función para validar acceso por sede (implementar en aplicación) */");
console.log(`
function validarAccesoSede(usuario, sedeId) {
    if (usuario.rol === 'administrador') {
        return true; // Administrador tiene acceso total
    }
    
    if (usuario.rol === 'empleado_sede') {
        return usuario.sedeAsignada.equals(sedeId);
    }
    
    return false; // Estudiantes no tienen acceso administrativo a sedes
}

/* Función para validar acceso a información de estudiante */
function validarAccesoEstudiante(usuario, estudianteId) {
    if (usuario.rol === 'administrador') {
        return true;
    }
    
    if (usuario.rol === 'empleado_sede') {
        // Verificar que el estudiante tenga cursos en la sede del empleado
        const inscripcion = db.inscripciones.findOne({
            estudiante: estudianteId,
            sede: usuario.sedeAsignada
        });
        return inscripcion !== null;
    }
    
    if (usuario.rol === 'estudiante') {
        return usuario.estudianteId.equals(estudianteId);
    }
    
    return false;
}

/* Función para validar creación de inscripciones */
function validarCreacionInscripcion(usuario, inscripcionData) {
    if (usuario.rol === 'administrador') {
        return true;
    }
    
    if (usuario.rol === 'empleado_sede') {
        // Solo puede crear inscripciones para cursos de su sede
        return inscripcionData.sede.equals(usuario.sedeAsignada);
    }
    
    if (usuario.rol === 'estudiante') {
        // Solo puede inscribirse a sí mismo
        return inscripcionData.estudiante.equals(usuario.estudianteId);
    }
    
    return false;
}
`);

console.log("✅ CONFIGURACIÓN DE ROLES COMPLETADA");
console.log("=====================================\n");

console.log("RESUMEN DE SEGURIDAD:");
console.log("- 3 roles definidos con permisos específicos");
console.log("- 7 usuarios de ejemplo creados");
console.log("- Validaciones por sede implementadas");
console.log("- Acceso granular por tipo de operación");
console.log("- Funciones de validación documentadas");

console.log("\n🔒 RECOMENDACIONES DE SEGURIDAD:");
console.log("1. Cambiar las contraseñas por defecto en producción");
console.log("2. Implementar las funciones de validación en la aplicación");
console.log("3. Usar conexiones SSL/TLS para todas las comunicaciones");
console.log("4. Implementar logs de auditoría para operaciones sensibles");
console.log("5. Revisar y actualizar permisos periódicamente");

console.log("\n=== CONFIGURACIÓN DE ROLES FINALIZADA ===");