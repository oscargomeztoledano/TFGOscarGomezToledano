import axios from 'axios'

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: "http://localhost:3000"
});
export default api