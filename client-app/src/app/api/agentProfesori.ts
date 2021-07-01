import axios, { AxiosResponse } from 'axios';
import { Profesori } from '../models/profesori';

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

const Profesorat = {
    listProfesorat: () => requests.get<Profesori[]>('/profesorat'),
    detailsProfesori: (id: string) => requests.get<Profesori>(`/profesorat/${id}`),
    createProfesori: (profesori: Profesori) => axios.post<void>('/profesorat', profesori),
    updateProfesori: (profesori: Profesori) => axios.put<void>(`/profesorat/${profesori.profesoriID}`, profesori),
    deleteProfesori: (id: string) => axios.delete<void>(`/profesorat/${id}`)
}

const agentProfesori = {
    Profesorat
}

export default agentProfesori;