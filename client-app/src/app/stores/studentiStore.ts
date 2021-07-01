import { makeAutoObservable } from "mobx";
import { Studenti } from './../models/studenti';

export default class StudentiStore {
    
    studentat: Studenti[] = [];
    selectedStudenti: Studenti | null = null;
    editStudentiMode = false;
    loading = false;
    

    constructor() {
        makeAutoObservable(this)
    }
}