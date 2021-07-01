import axios, { AxiosResponse } from 'axios';
import { Studenti } from '../models/studenti';


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}


axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(900);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),

} 

const Studentat = {
    list: () => requests.get<Studenti[]>('/studentat'),
    details: (id: string) => requests.get<Studenti>(`/studentat/${id}`),
    create: (studenti: Studenti) => axios.post<void>('/studentat', studenti),
    update: (studenti: Studenti) => axios.put<void>(`/studentat/${studenti.studentiID}`, studenti),
    delete: (id: string) => axios.delete<void>(`/studentat/${id}`)
}

const agentStudenti = {
    Studentat
}
export default agentStudenti;

