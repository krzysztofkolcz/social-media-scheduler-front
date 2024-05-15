import axios from 'axios'
import {Method} from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post["Content-Type"]= 'application/json'


export const request = (method: Method | string, url: string, data: string) => {
    return axios({
        method: method,
        url: url,
        data: data
    })
}