import api from "./api"

function getAlumnoByCorreo(correo) {
    return api.get(`/alumnos/${correo}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching alumno by correo:", error);
            throw error;
        });
}

export { getAlumnoByCorreo }