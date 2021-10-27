import { makeAutoObservable, runInAction } from "mobx";
import { Profesori } from './../models/profesori';
import agentProfesori from './../api/agentProfesori';

export default class ProfesoriStore {

    profesoriRegistry = new Map<string, Profesori>();
    selectedProfesori: Profesori | undefined = undefined;
    editProfesoriMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get profesoratByDate() {
        return Array.from(this.profesoriRegistry.values()).sort((a, b) =>
            Date.parse(a.datelindja) - Date.parse(b.datelindja));
    }

    loadProfesorat = async () => {
        this.loadingInitial = true;
        try {
            const profesorat = await agentProfesori.Profesorat.listProfesorat();
            runInAction(() => {
                profesorat.forEach(profesori => {
                    this.setProfesori(profesori);
                })
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadProfesori = async (id: string) => {
        let profesori = this.getProfesori(id);
        if (profesori) {
            this.selectedProfesori = profesori;
            return profesori;
        }
        else {
            this.loadingInitial = true;
            try {
                profesori = await agentProfesori.Profesorat.detailsProfesori(id);
                this.setProfesori(profesori);
                runInAction(() => {
                    this.selectedProfesori = profesori;
                })
                this.setLoadingInitial(false);
                return profesori;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getProfesori = (id: string) => {
        return this.profesoriRegistry.get(id);
    }

    private setProfesori = (profesori: Profesori) => {
        profesori.datelindja = profesori.datelindja.split('T')[0];
        this.profesoriRegistry.set(profesori.profesoriID, profesori);

    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    // selectProfesori = (id: string) => {
    //     this.selectedProfesori = this.profesoriRegistry.get(id);
    // }

    // cancelSelectedProfesori = () => {
    //     this.selectedProfesori = undefined;
    // }

    // openProfesoriForm = (id?: string) => {
    //     id ? this.selectProfesori(id) : this.cancelSelectedProfesori();
    //     this.editProfesoriMode = true;
    // }

    // closeProfesoriForm = () => {
    //     this.editProfesoriMode = false;
    // }


    createProfesori = async (profesori: Profesori) => {
        this.loading = true;

        try {
            await agentProfesori.Profesorat.createProfesori(profesori);
            runInAction(() => {
                this.profesoriRegistry.set(profesori.profesoriID, profesori);
                this.selectedProfesori = profesori;
                this.editProfesoriMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateProfesori = async (profesori: Profesori) => {
        this.loading = true;

        try {
            await agentProfesori.Profesorat.updateProfesori(profesori);
            runInAction(() => {
                this.profesoriRegistry.set(profesori.profesoriID, profesori);
                this.selectedProfesori = profesori;
                this.editProfesoriMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteProfesori = async (id: string) => {
        this.loading = true;

        try {
            await agentProfesori.Profesorat.deleteProfesori(id);
            runInAction(() => {
                this.profesoriRegistry.delete(id);
                // if (this.selectedProfesori?.profesoriID === id) this.cancelSelectedProfesori();
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