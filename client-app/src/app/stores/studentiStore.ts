import { makeAutoObservable, runInAction } from "mobx";
import { Studenti } from './../models/studenti';
import agentStudenti from './../api/agentStudenti';


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
        this.loadingInitial = true;
        try {
            const studentat = await agentStudenti.Studentat.list();
            runInAction(() => {
                studentat.forEach(studenti => {
                    this.setStudenti(studenti);
                })
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);

        }
    }

    loadStudenti = async (id: string) => { 
        let studenti = this.getStudenti(id);
        if(studenti) {
            this.selectedStudenti = studenti;
            return studenti;
        } 
        else {
            this.loadingInitial = true;
            try {
                studenti = await agentStudenti.Studentat.details(id);
                this.setStudenti(studenti);
                runInAction(() => {
                    this.selectedStudenti = studenti;
                })
                
                this.setLoadingInitial(false);
                return studenti;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getStudenti = (id: string) => {
        return this.studentiRegistry.get(id);
    }

    private setStudenti = (studenti: Studenti) => {
        studenti.datelindja = studenti.datelindja.split('T')[0];
        this.studentiRegistry.set(studenti.studentiID, studenti);
        
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // selectStudenti = (id: string) => {
    //     this.selectedStudenti = this.studentiRegistry.get(id);
    // }

    // cancelSelectedStudenti = () => {
    //     this.selectedStudenti = undefined;
    // }

    // openStudentiForm = (id?: string) => {
    //     id ? this.selectStudenti(id) : this.cancelSelectedStudenti();
    //     this.editStudentiMode = true;
    // }

    // closeStudentiForm = () => {
    //     this.editStudentiMode = false;
    // }


    createStudenti = async (studenti: Studenti) => {
        this.loading = true;

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
                // if (this.selectedStudenti?.studentiID === id) this.cancelSelectedStudenti();
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
