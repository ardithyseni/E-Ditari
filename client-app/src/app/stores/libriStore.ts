import { makeAutoObservable, runInAction } from "mobx";
import { Libri } from './../models/libri';
import { v4 as uuid } from 'uuid';
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
        

        try {
            const librat = await agentLibri.Librat.listLibrat();
            runInAction(() => {
                librat.forEach(libri => {
                    this.libriRegistry.set(libri.id, libri);
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

    selectLibri = (id: string) => {
        this.selectedLibri = this.libriRegistry.get(id);
    }

    cancelSelectedLibri = () => {
        this.selectedLibri = undefined;
    }

    openLibriForm = (id?: string) => {
        id ? this.selectLibri(id) : this.cancelSelectedLibri();
        this.editLibriMode = true;
    }

    closeLibriForm = () => {
        this.editLibriMode = false;
    }


    createLibri = async (libri: Libri) => {
        this.loading = true;
        libri.id = uuid();

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
                if (this.selectedLibri?.id === id) this.cancelSelectedLibri();
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

