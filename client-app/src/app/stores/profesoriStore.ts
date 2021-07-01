import { makeAutoObservable } from "mobx";
import { Profesori } from './../models/profesori';

export default class ProfesoriStore {
    
    profesorat: Profesori[] = [];
    selectedProfesori: Profesori | null = null;
    editProfesoriMode = false;
    loading = false;
    

    constructor() {
        makeAutoObservable(this)
    }
}