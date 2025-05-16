import api from "./api"

function getAlumnoByCorreo(correo) {
    return api.get(`/alumnos/${encodeURIComponent(correo)}`)
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

function putAvatarByCorreo(correo, avatar) {
    return api.put(`/alumnos/updateAvatar/${encodeURIComponent(correo)}`, { avatar })
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating avatar:", error);
            throw error;
        });
}
function getMundosByAula(aula) {
    return api.get(`/aulas/${aula}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching mundos by aula:", error);
            throw error;
        });
    }
        
function updateNivelesByCorreo(correo, mundos) {
    return api.put(`/alumnos/updateNiveles/${encodeURIComponent(correo)}`, { mundos })
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating niveles:", error);
            throw error;
        });
}
export { updateNivelesByCorreo,getMundosByAula ,getAlumnoByCorreo, postAlumno, putAvatarByCorreo }