import api from "./api"

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


function getMundosByAula(aula) {
    return api.get(`/aulas/${encodeURIComponent(aula)}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching mundos by aula:", error);
            throw error;
        });
    }
        
function guardarProgreso(correo, usuarioActualizado) {
    return api.patch(`/alumnos/guardarprogreso/${encodeURIComponent(correo)}`,  usuarioActualizado)
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating niveles:", error);
            throw error;
        });
}
function putAvatarByCorreo(correo, avatar) {
    return api.patch(`/alumnos/updateAvatar/${encodeURIComponent(correo)}`,  {avatar} )
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating avatar:", error);
            throw error;
        });
}

function getAllAlumnosPuntosAula(aula) {
    return api.get(`/alumnos/clasificacion/${aula}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching all alumnos puntos:", error);
            throw error;
        });
}
export { 
    guardarProgreso, 
    getAllAlumnosPuntosAula,
    getMundosByAula ,
    getAlumnoByCorreo, 
    postAlumno, 
    putAvatarByCorreo 
}
