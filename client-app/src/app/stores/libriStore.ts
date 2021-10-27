import { makeAutoObservable, runInAction } from "mobx";
import { Libri } from './../models/libri';
import agentLibri from './../api/agentLibri';

export default class LibriStore {

    libriRegistry = new Map<string, Libri>();
    selectedLibri: Libri | undefined = undefined;
    editLibriMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get librat() {
        return Array.from(this.libriRegistry.values());
    }

    loadLibrat = async () => {
        this.loadingInitial = true;
        try {
            const librat = await agentLibri.Librat.listLibrat();
            runInAction(() => {
                librat.forEach(libri => {
                    this.setLibri(libri);
                })
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);

        }
    }

    loadLibri = async (id: string) => {
        let libri = this.getLibri(id);
        if(libri) {
            this.selectedLibri = libri;
            return libri;
        } 
        else {
            this.loadingInitial = true;
            try {
                libri = await agentLibri.Librat.detailsLibrat(id);
                this.setLibri(libri);
                runInAction(() => {
                    this.selectedLibri = libri;
                })
                this.setLoadingInitial(false);
                return libri;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getLibri = (id: string) => {
        return this.libriRegistry.get(id);
    }

    private setLibri = (libri: Libri) => {
        this.libriRegistry.set(libri.id, libri);
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // selectLibri = (id: string) => {
    //     this.selectedLibri = this.libriRegistry.get(id);
    // }

    // cancelSelectedLibri = () => {
    //     this.selectedLibri = undefined;
    // }

    // openLibriForm = (id?: string) => {
    //     id ? this.selectLibri(id) : this.cancelSelectedLibri();
    //     this.editLibriMode = true;
    // }

    // closeLibriForm = () => {
    //     this.editLibriMode = false;
    // }


    createLibri = async (libri: Libri) => {
        this.loading = true;

        try {
            await agentLibri.Librat.createLibrat(libri);
            runInAction(() => {
                this.libriRegistry.set(libri.id, libri);
                this.selectedLibri = libri;
                this.editLibriMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateLibri = async (libri: Libri) => {
        this.loading = true;

        try {
            await agentLibri.Librat.updateLibrat(libri);
            runInAction(() => {
                this.libriRegistry.set(libri.id, libri);
                this.selectedLibri = libri;
                this.editLibriMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteLibri = async (id: string) => {
        this.loading = true;

        try {
            await agentLibri.Librat.deleteLibrat(id);
            runInAction(() => {
                this.libriRegistry.delete(id);
                // if (this.selectedLibri?.id === id) this.cancelSelectedLibri();
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

