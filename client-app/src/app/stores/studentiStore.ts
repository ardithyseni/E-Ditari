import { makeAutoObservable, runInAction } from "mobx";
import { Studenti } from './../models/studenti';
import agentStudenti from './../api/agentStudenti';
import { v4 as uuid } from 'uuid';

export default class StudentiStore {

    studentiRegistry = new Map<string, Studenti>();
    selectedStudenti: Studenti | undefined = undefined;
    editStudentiMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get studentatByDate() {
        return Array.from(this.studentiRegistry.values()).sort((a, b) => 
            Date.parse(a.datelindja) - Date.parse(b.datelindja));
    }


    loadStudentat = async () => {

        try {
            const studentat = await agentStudenti.Studentat.list();
            runInAction(() => {
                studentat.forEach(studenti => {
                    studenti.datelindja = studenti.datelindja.split('T')[0];
                    this.studentiRegistry.set(studenti.studentiID, studenti);
                })
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);

        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectStudenti = (id: string) => {
        this.selectedStudenti = this.studentiRegistry.get(id);
    }

    cancelSelectedStudenti = () => {
        this.selectedStudenti = undefined;
    }

    openStudentiForm = (id?: string) => {
        id ? this.selectStudenti(id) : this.cancelSelectedStudenti();
        this.editStudentiMode = true;
    }

    closeStudentiForm = () => {
        this.editStudentiMode = false;
    }


    createStudenti = async (studenti: Studenti) => {
        this.loading = true;
        studenti.studentiID = uuid();

        try {
            await agentStudenti.Studentat.create(studenti);
            runInAction(() => {
                this.studentiRegistry.set(studenti.studentiID, studenti);
                this.selectedStudenti = studenti;
                this.editStudentiMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateStudenti = async (studenti: Studenti) => {
        this.loading = true;

        try {
            await agentStudenti.Studentat.update(studenti);
            runInAction(() => {
                this.studentiRegistry.set(studenti.studentiID, studenti);
                this.selectedStudenti = studenti;
                this.editStudentiMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteStudenti = async (id: string) => {
        this.loading = true;

        try {
            await agentStudenti.Studentat.delete(id);
            runInAction(() => {
                this.studentiRegistry.delete(id);
                if (this.selectedStudenti?.studentiID === id) this.cancelSelectedStudenti();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

    }

}
