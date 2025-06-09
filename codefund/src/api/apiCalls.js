import api from "./api"

// alumno
function getAlumnoByCorreo(correo) {
    return api.get(`/alumnos/correo/${encodeURIComponent(correo)}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching alumno by correo:", error);
            throw error;
        });
}

function postAlumno(alumno) {
    return api.post('/alumnos', alumno)
        .then(response => response.data)
        .catch(error => {
            console.error("Error creating alumno:", error);
            throw error;
        });
}

function guardarProgresoAlumno(correo, usuarioActualizado) {
    return api.patch(`/alumnos/guardarprogreso/${encodeURIComponent(correo)}`,  usuarioActualizado)
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating niveles:", error);
            throw error;
        });
}

// aulas
function getMundosByAula(aula) {
    return api.get(`/aulas/${aula}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching mundos by aula:", error);
            throw error;
        });
}
function guardarMundoAula(aula, aulaActualizada) {
    return api.patch(`/aulas/guardarMundo/${aula}`, aulaActualizada)
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating mundos:", error);
            throw error;
        });
}
    
// puntos
function getAllAlumnosPuntosAula(aula) {
    return api.get(`/alumnos/clasificacion/${aula}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching all alumnos puntos:", error);
            throw error;
        });
}

// profesores
function getProfesorByCorreo(correo) { 
    return api.get(`/profesores/correo/${encodeURIComponent(correo)}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching profesor by correo:", error);
            throw error;
        });
}
function guardarProgresoProfesor(correo, usuarioActualizado) {
    return api.patch(`/profesores/guardarprogreso/${encodeURIComponent(correo)}`,  usuarioActualizado)
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating niveles:", error);
            throw error;
        });
}


export { 
    guardarProgresoAlumno, 
    guardarProgresoProfesor,
    getAllAlumnosPuntosAula,
    getMundosByAula ,
    getAlumnoByCorreo, 
    postAlumno,
    guardarMundoAula, 
    getProfesorByCorreo,
     
}
