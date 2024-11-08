import axios from "axios"

// define a conexa com a api do backend
export const api = new axios.create({
    baseURL: 'http://localhost:3333'
})