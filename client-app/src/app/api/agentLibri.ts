import axios, { AxiosResponse } from 'axios';
import { Libri } from './../models/libri';

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

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),

}

const Librat = {
    listLibrat: () => requests.get<Libri[]>('/librat'),
    detailsLibrat: (id: string) => requests.get<Libri>(`/librat/${id}`),
    createLibrat: (libri: Libri) => axios.post<void>('/librat', libri),
    updateLibrat: (libri: Libri) => axios.put<void>(`/librat/${libri.id}`, libri),
    deleteLibrat: (id: string) => axios.delete<void>(`/librat/${id}`)
}

const agentLibri = {
    Librat
}

export default agentLibri;