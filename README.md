# Campus Music - Sistema de Gestión Musical

Sistema completo de administración para escuelas de música implementado con MongoDB, diseñado para gestionar estudiantes, profesores, cursos, inscripciones e instrumentos de manera eficiente y escalable.

## 📋 Índice

1. [Introducción](#introducción)
2. [Justificación del uso de MongoDB](#justificación-del-uso-de-mongodb)
3. [Diseño del modelo de datos](#diseño-del-modelo-de-datos)
4. [Validaciones $jsonSchema](#validaciones-jsonschema)
5. [Índices](#índices)
6. [Estructura de los datos de prueba](#estructura-de-los-datos-de-prueba)
7. [Consultas analíticas](#consultas-analíticas)
8. [Transacciones MongoDB](#transacciones-mongodb)
9. [Sistema de roles y seguridad](#sistema-de-roles-y-seguridad)
10. [Instalación y configuración](#instalación-y-configuración)
11. [Conclusiones y mejoras posibles](#conclusiones-y-mejoras-posibles)

## 🎵 Introducción

Campus Music es una solución integral para la administración de escuelas de música que operan en múltiples ciudades. El sistema reemplaza las hojas de cálculo tradicionales con una base de datos robusta que elimina la duplicación de datos, mejora la integridad de la información y soporta operaciones transaccionales complejas.

### Características principales:

- **Gestión multinivel**: Administradores, empleados de sede y estudiantes
- **Control de inscripciones**: Sistema transaccional con validación de cupos
- **Gestión de instrumentos**: Sistema de préstamos y reservas
- **Reportes analíticos**: Consultas avanzadas con agregaciones
- **Seguridad granular**: Roles y permisos específicos por tipo de usuario
- **Integridad de datos**: Validaciones exhaustivas con $jsonSchema

## 🔧 Justificación del uso de MongoDB

### ¿Por qué MongoDB?

1. **Flexibilidad de esquema**: Permite evolucionar el modelo de datos sin migraciones complejas
2. **Documentos embebidos**: Ideal para almacenar información relacionada como horarios, contactos de emergencia
3. **Escalabilidad horizontal**: Preparado para crecer con múltiples sedes
4. **Consultas analíticas potentes**: Framework de agregación para reportes complejos
5. **Transacciones ACID**: Garantiza integridad en operaciones críticas como inscripciones
6. **Índices eficientes**: Optimización para consultas frecuentes por sede, instrumento, fecha
7. **Validaciones nativas**: $jsonSchema para mantener calidad de datos

### Ventajas sobre sistemas relacionales:

- **Desarrollo ágil**: Menos joins, consultas más naturales
- **Almacenamiento eficiente**: Documentos autocontenidos reducen redundancia
- **Escalabilidad**: Sharding nativo para crecimiento horizontal
- **Disponibilidad**: Replica sets para alta disponibilidad

## 📊 Diseño del modelo de datos

### Arquitectura de colecciones

El sistema está compuesto por 8 colecciones principales interconectadas:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   USUARIOS  │    │    SEDES    │    │ PROFESORES  │
│             │    │             │    │             │
│ - admin     │    │ - Bogotá    │    │ - Carlos R. │
│ - empleados │◄───┤ - Medellín  ├───►│ - María G.  │
│ - estudiant │    │ - Cali      │    │ - José H.   │
└─────────────┘    └─────────────┘    └─────────────┘
                           │                   │
                           ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ ESTUDIANTES │    │   CURSOS    │    │INSCRIPCIONES│
│             │    │             │    │             │
│ - Juan P.   │◄───┤ - Piano     ├───►│ - Activas   │
│ - Camila L. │    │ - Guitarra  │    │ - Completas │
│ - Sebastian │    │ - Violín    │    │ - Canceladas│
└─────────────┘    └─────────────┘    └─────────────┘
       │                                      │
       ▼                                      ▼
┌─────────────┐    ┌─────────────────────────────────┐
│INSTRUMENTOS │    │     RESERVAS_INSTRUMENTOS      │
│             │    │                                 │
│ - Pianos    │◄───┤ - Estado: reservada/prestamo   │
│ - Guitarras │    │ - Fechas inicio/fin             │
│ - Violines  │    │ - Observaciones entrega         │
└─────────────┘    └─────────────────────────────────┘
```

### Decisiones de diseño

#### Referencias vs Embebidos

**Referencias utilizadas para:**
- `sede` en cursos, profesores, instrumentos (datos maestros)
- `profesor` en cursos (asignación dinámica)
- `estudiante`, `curso` en inscripciones (entidades independientes)

**Documentos embebidos para:**
- `horario` en cursos (datos específicos del curso)
- `contactoEmergencia` en estudiantes (información complementaria)

#### Justificación técnica:

1. **Referencias**: Entidades que cambian independientemente o se consultan por separado
2. **Embebidos**: Datos que siempre se consultan juntos y no tienen sentido por separado
3. **Consistencia**: Referencias mantienen integridad referencial
4. **Performance**: Embebidos reducen joins y mejoran velocidad de consulta

## ✅ Validaciones $jsonSchema

### Principios de validación

Cada colección implementa validaciones exhaustivas para garantizar la calidad de los datos:

#### Colección USUARIOS
```javascript
{
  "required": ["nombre", "email", "documento", "rol", "fechaCreacion"],
  "properties": {
    "email": {
      "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    },
    "rol": {
      "enum": ["administrador", "empleado_sede", "estudiante"]
    }
  }
}
```

#### Colección CURSOS
```javascript
{
  "properties": {
    "cupoMaximo": { "minimum": 1, "maximum": 20 },
    "costo": { "minimum": 0 },
    "horario.horaInicio": {
      "pattern": "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
    }
  }
}
```

### Validaciones por colección:

1. **Usuarios**: Email válido, roles específicos, documentos únicos
2. **Estudiantes**: Edad entre 5-99 años, niveles musicales válidos
3. **Profesores**: Especialidades predefinidas, experiencia ≥ 0
4. **Cursos**: Cupos 1-20, costos ≥ 0, horarios formato HH:MM
5. **Inscripciones**: Estados válidos, costos ≥ 0, fechas coherentes
6. **Instrumentos**: Estados definidos, valores comerciales ≥ 0
7. **Reservas**: Estados de préstamo válidos, fechas lógicas

## 🚀 Índices

### Estrategia de indexación

Los índices se diseñaron basándose en patrones de consulta reales:

#### Índices por colección:

**USUARIOS**
```javascript
// Búsquedas de autenticación
{ "documento": 1 } // unique
{ "email": 1 } // unique
{ "rol": 1, "activo": 1 } // compound
```

**CURSOS**
```javascript
// Consultas por sede y disponibilidad
{ "sede": 1, "activo": 1 } // compound
{ "instrumento": 1, "nivel": 1 } // compound
{ "cuposDisponibles": 1 } // disponibilidad
```

**INSCRIPCIONES**
```javascript
// Reportes y consultas estudiante
{ "estudiante": 1, "estado": 1 } // compound
{ "sede": 1, "fechaInscripcion": -1 } // reportes por sede
{ "fechaInscripcion": -1 } // cronológico
```

### Justificación técnica:

1. **Índices únicos**: Previenen duplicados en campos críticos
2. **Índices compuestos**: Optimizan consultas multi-campo frecuentes
3. **Índices de rango**: Aceleran consultas por fecha y disponibilidad
4. **Índices sparse**: Para campos opcionales como números de serie

## 📊 Estructura de los datos de prueba

### Dataset realista y coherente

El sistema incluye datos de prueba que representan un escenario real de operación:

#### Distribución de datos:
- **3 Sedes**: Bogotá (150 cap.), Medellín (120 cap.), Cali (100 cap.)
- **10 Profesores**: Distribuidos por especialidades y sedes
- **15 Estudiantes**: Diferentes niveles y edades (15-28 años)
- **15 Cursos**: 5 por sede, diversos instrumentos y niveles
- **20 Instrumentos**: Variedad de marcas, tipos y estados
- **30 Inscripciones**: Estados mixtos (activas, completadas, canceladas)
- **10 Reservas**: Diferentes estados de préstamo

#### Coherencia de datos:
- Profesores asignados según especialidades
- Estudiantes inscritos en cursos apropiados a su nivel
- Cupos de cursos reflejando inscripciones reales
- Fechas lógicas y progresivas
- Costos variables según duración y nivel
- Instrumentos distribuidos por sede

## 📈 Consultas analíticas

### Framework de agregación implementado

El sistema incluye 8 consultas analíticas avanzadas usando el pipeline de agregación de MongoDB:

#### 1. Estudiantes inscritos por sede (último mes)
```javascript
db.inscripciones.aggregate([
  { $match: { fechaInscripcion: { $gte: fechaLimite } } },
  { $lookup: { from: "sedes", localField: "sede", foreignField: "_id", as: "sedeInfo" } },
  { $group: { _id: "$sede", totalInscripciones: { $sum: 1 } } }
])
```

#### 2. Cursos más demandados por sede
- Utiliza `$lookup` múltiple para enriquecer datos
- `$group` anidado para ranking por sede
- `$slice` para top 3 por sede

#### 3. Ingresos totales por sede
- Suma de `costoTotal` de inscripciones activas/completadas
- Cálculo de promedio por inscripción
- Ordenamiento por ingresos descendente

#### 4. Profesores con más estudiantes
- `$addToSet` para contar estudiantes únicos
- Evita duplicados por múltiples inscripciones
- Incluye información de especialidades

#### 5. Instrumentos más reservados
- Agrupación por tipo de instrumento
- Conteo de reservas activas vs totales
- Análisis de disponibilidad

#### 6. Historial de cursos por estudiante
- Join de 4 colecciones (estudiante, curso, sede, profesor)
- Ordenamiento cronológico
- Información completa por inscripción

#### 7. Cursos en ejecución por sede
- Filtro por fechas de inicio/fin vs fecha actual
- Agrupación por sede con detalles de horarios
- Información de cupos disponibles

#### 8. Detección de cursos excedidos
- Comparación inscripciones vs cupo máximo
- Cálculo de porcentaje de ocupación
- Identificación de sobrecupos

### Ventajas del pipeline de agregación:
- **Performance**: Procesamiento server-side eficiente
- **Flexibilidad**: Consultas complejas con múltiples etapas
- **Escalabilidad**: Paralelización automática en clusters
- **Expresividad**: Operadores especializados para análisis

## 🔒 Transacciones MongoDB

### Implementación de ACID properties

#### Escenario principal: Inscripción de estudiante

La transacción más crítica del sistema garantiza la integridad en el proceso de inscripción:

```javascript
function inscribirEstudianteEnCurso(estudianteId, cursoId, metodoPago, observaciones) {
  const session = db.getMongo().startSession();
  
  try {
    session.startTransaction({
      readConcern: { level: "snapshot" },
      writeConcern: { w: "majority" }
    });
    
    // 1. Validar estudiante activo
    // 2. Validar curso activo y con cupos
    // 3. Verificar no duplicación
    // 4. Insertar inscripción
    // 5. Decrementar cupos disponibles
    // 6. Commit
    
  } catch (error) {
    session.abortTransaction(); // Rollback automático
  }
}
```

#### Pasos de la transacción:

1. **Validación de estudiante**: Existe y está activo
2. **Validación de curso**: Activo y con cupos disponibles
3. **Prevención de duplicados**: No inscripción previa activa
4. **Creación de inscripción**: INSERT en colección inscripciones
5. **Actualización de cupos**: UPDATE en colección cursos
6. **Commit/Rollback**: Confirmación o reversión automática

#### Casos de uso cubiertos:

- ✅ **Inscripción exitosa**: Todos los pasos se ejecutan correctamente
- ❌ **Estudiante inactivo**: Rollback automático, datos intactos
- ❌ **Curso sin cupos**: Transacción abortada, estado consistente
- ❌ **Inscripción duplicada**: Prevención de duplicados
- ❌ **Error de sistema**: Rollback garantiza consistencia

### Transacciones adicionales implementadas:

#### Cancelación de inscripción
- Cambio de estado a "cancelada"
- Liberación automática de cupo
- Actualización de fechas y observaciones

### Garantías ACID:

1. **Atomicidad**: Todas las operaciones se ejecutan o ninguna
2. **Consistencia**: Estado válido antes y después
3. **Aislamiento**: Transacciones concurrentes no interfieren  
4. **Durabilidad**: Cambios confirmados son permanentes

## 👥 Sistema de roles y seguridad

### Arquitectura de autorización

El sistema implementa 3 roles principales con permisos granulares:

#### 1. Administrador (`administrador_campus`)
**Permisos completos:**
- CRUD en todas las colecciones
- Creación de usuarios, sedes, cursos
- Operaciones de mantenimiento (índices, colecciones)
- Acceso a métricas y estadísticas

#### 2. Empleado de sede (`empleado_sede_campus`)
**Permisos limitados por sede:**
- Lectura: estudiantes, profesores, cursos de su sede
- Escritura: inscripciones, reservas de instrumentos
- Actualización: información de cursos
- Prohibido: crear usuarios, acceso a otras sedes

#### 3. Estudiante (`estudiante_campus`)
**Permisos de autogestión:**
- Lectura: su propia información, cursos disponibles
- Escritura: inscripciones propias, reservas de instrumentos
- Actualización: su información personal
- Prohibido: ver información de otros estudiantes

### Usuarios de ejemplo creados:

```javascript
// Administrador
{ user: "admin_campus", pwd: "admin123_campus", role: "administrador_campus" }

// Empleados por sede
{ user: "empleado_bogota", pwd: "emp123_bogota", sedeAsignada: "Bogotá" }
{ user: "empleado_medellin", pwd: "emp123_medellin", sedeAsignada: "Medellín" }
{ user: "empleado_cali", pwd: "emp123_cali", sedeAsignada: "Cali" }

// Estudiantes
{ user: "juan_martinez", pwd: "est123_juan", estudianteId: "..." }
{ user: "camila_lopez", pwd: "est123_camila", estudianteId: "..." }
{ user: "sebastian_rodriguez", pwd: "est123_sebastian", estudianteId: "..." }
```

### Funciones de validación de seguridad:

El sistema incluye funciones JavaScript para validar permisos en la aplicación:

```javascript
function validarAccesoSede(usuario, sedeId) {
  if (usuario.rol === 'administrador') return true;
  if (usuario.rol === 'empleado_sede') {
    return usuario.sedeAsignada.equals(sedeId);
  }
  return false;
}
```

### Principios de seguridad implementados:

1. **Menor privilegio**: Cada rol tiene solo los permisos necesarios
2. **Separación de responsabilidades**: Roles específicos por función
3. **Validación por contexto**: Permisos basados en sede/estudiante
4. **Auditoría**: Logs de acceso y operaciones sensibles

## 🛠️ Instalación y configuración

### Requisitos del sistema

- **MongoDB**: Versión 4.4 o superior (soporte completo para transacciones)
- **Sistema operativo**: Linux, macOS o Windows
- **RAM**: Mínimo 4GB recomendado
- **Almacenamiento**: 10GB para datos y logs

### Pasos de instalación:

#### 1. Clonar el repositorio
```bash
git clone https://github.com/usuario/campus-music.git
cd campus-music
```

#### 2. Configurar MongoDB
```bash
# Iniciar MongoDB
mongod --replSet rs0

# Configurar replica set (requerido para transacciones)
mongo --eval "rs.initiate()"
```

#### 3. Ejecutar scripts de configuración
```bash
# 1. Crear colecciones y esquemas
mongo campus_music < db_config.js

# 2. Poblar con datos de prueba
mongo campus_music < test_dataset.js

# 3. Crear roles y usuarios
mongo campus_music < roles.js
```

#### 4. Verificar instalación
```bash
# Ejecutar consultas analíticas
mongo campus_music < aggregations.js

# Probar transacciones
mongo campus_music < transactions.js
```

### Configuración recomendada para producción:

#### MongoDB
```javascript
// mongod.conf
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log
net:
  port: 27017
  bindIp: 127.0.0.1
security:
  authorization: enabled
```

#### Variables de entorno
```bash
export MONGO_URL="mongodb://localhost:27017/campus_music"
export MONGO_OPTIONS="?replicaSet=rs0&authSource=admin"
```

### Estructura de directorios:
```
campus_music/
├── db_config.js          # Configuración de BD
├── test_dataset.js       # Datos de prueba
├── aggregations.js       # Consultas analíticas
├── roles.js              # Sistema de roles
├── transactions.js       # Transacciones ACID
├── README.md            # Documentación
├── docs/                # Documentación adicional
│   ├── api.md          # API Reference
│   ├── security.md     # Guía de seguridad
│   └── deployment.md   # Guía de despliegue
└── scripts/             # Scripts de utilidad
    ├── backup.sh       # Respaldo de datos
    ├── restore.sh      # Restauración
    └── monitoring.sh   # Monitoreo
```

## 🔮 Conclusiones y mejoras posibles

### Logros del proyecto:

#### ✅ Objetivos cumplidos:
1. **Migración exitosa**: De hojas de cálculo a base de datos robusta
2. **Eliminación de duplicación**: Modelo normalizado con referencias
3. **Transacciones ACID**: Integridad garantizada en operaciones críticas
4. **Seguridad implementada**: Roles granulares y validaciones
5. **Reportes analíticos**: 8 consultas avanzadas con agregaciones
6. **Escalabilidad**: Diseño preparado para múltiples sedes
7. **Mantenimiento**: Validaciones automáticas y índices optimizados

#### 🎯 Beneficios obtenidos:
- **Consistencia de datos**: Eliminación de errores por duplicación
- **Performance mejorado**: Consultas optimizadas con índices
- **Seguridad robusta**: Control de acceso por roles
- **Escalabilidad**: Preparado para crecimiento horizontal
- **Integridad transaccional**: Operaciones críticas protegidas
- **Reportes en tiempo real**: Análisis instantáneo de métricas
- **Gestión centralizada**: Una sola fuente de verdad

### 🚀 Mejoras futuras sugeridas:

#### Corto plazo (1-3 meses):
1. **API REST completa**
   - Endpoints para todas las operaciones CRUD
   - Autenticación JWT
   - Documentación OpenAPI/Swagger
   - Rate limiting y throttling

2. **Interfaz web administrativa**
   - Dashboard para administradores
   - Portal de empleados de sede
   - Portal de estudiantes
   - Reportes visuales interactivos

3. **Notificaciones automatizadas**
   - Email/SMS para vencimiento de cursos
   - Recordatorios de pagos
   - Notificaciones de disponibilidad de instrumentos
   - Alertas de cupos disponibles

#### Mediano plazo (3-6 meses):
4. **Módulo de facturación**
   - Generación automática de facturas
   - Control de pagos y cartera
   - Reportes financieros avanzados
   - Integración con pasarelas de pago

5. **Sistema de calificaciones**
   - Evaluaciones por profesor
   - Progreso del estudiante
   - Certificados automáticos
   - Historial académico completo

6. **Gestión de horarios inteligente**
   - Detección de conflictos automática
   - Sugerencias de horarios optimizados
   - Reserva de salones
   - Calendario integrado

#### Largo plazo (6-12 meses):
7. **Analytics avanzados e IA**
   - Predicción de deserción estudiantil
   - Recomendaciones de cursos
   - Optimización automática de horarios
   - Análisis predictivo de demanda

8. **Mobile App nativa**
   - App iOS/Android para estudiantes
   - Notificaciones push
   - Reserva de instrumentos móvil
   - Pago desde app

9. **Integración con LMS**
   - Plataforma de aprendizaje online
   - Contenido multimedia
   - Exámenes virtuales
   - Clases híbridas

### 🏗️ Escalabilidad y arquitectura:

#### Preparación para crecimiento:
1. **Sharding horizontal**: Distribución por ciudad/región
2. **Read replicas**: Separación de lecturas y escrituras
3. **Caché distribuido**: Redis/Memcached para consultas frecuentes
4. **CDN**: Contenido estático y multimedia
5. **Load balancing**: Distribución de carga automática
6. **Monitoring**: Métricas detalladas y alertas proactivas

### 📊 Métricas de éxito esperadas:

#### Operacionales:
- **Tiempo de consulta**: < 100ms para operaciones básicas
- **Disponibilidad**: 99.9% uptime
- **Throughput**: 1000+ transacciones/segundo
- **Concurrencia**: 100+ usuarios simultáneos

#### De negocio:
- **Reducción de errores**: 95% menos errores vs hojas de cálculo
- **Tiempo de inscripción**: Reducción 70% en tiempo de proceso
- **Satisfacción del usuario**: > 90% satisfacción
- **Eficiencia operativa**: 50% reducción en tiempo administrativo

### 🎼 Reflexión final:

Campus Music representa una evolución significativa en la gestión de escuelas musicales, transformando procesos manuales propensos a errores en un sistema robusto, escalable y confiable. La elección de MongoDB como base de datos se justifica plenamente por su flexibilidad, potencia analítica y capacidades transaccionales.

El sistema no solo resuelve los problemas inmediatos de duplicación de datos y errores manuales, sino que establece las bases para un crecimiento sostenible y la implementación de funcionalidades avanzadas que transformarán la experiencia educativa musical.

La implementación de transacciones ACID garantiza la integridad de operaciones críticas, mientras que el sistema de roles proporciona la seguridad necesaria para un entorno multi-usuario. Las consultas analíticas ofrecen insights valiosos para la toma de decisiones basada en datos.

Con una base sólida y un diseño orientado al futuro, Campus Music está preparado para evolucionar y adaptarse a las necesidades cambiantes del sector educativo musical, manteniendo siempre la excelencia en la gestión de datos y la experiencia del usuario.

---

## 📞 Contacto y soporte

Para soporte técnico, contribuciones o consultas sobre el proyecto:

- **Documentación técnica**: `/docs`
- **Issues y bugs**: GitHub Issues
- **Contribuciones**: Pull Requests bienvenidos
- **Licencia**: MIT License

---

*Campus Music - Transformando la educación musical a través de la tecnología* 🎵