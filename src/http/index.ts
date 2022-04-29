import axios, { AxiosInstance } from "axios"

const ClienteHttp: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/'
})

export default ClienteHttp