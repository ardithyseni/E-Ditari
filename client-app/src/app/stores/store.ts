import StudentiStore from './studentiStore';
import { createContext } from 'react';
import ProfesoriStore from './profesoriStore';
import { useContext } from 'react';
import LibriStore from './libriStore';


interface Store {
    studentiStore: StudentiStore
    profesoriStore: ProfesoriStore
    libriStore: LibriStore
}

export const store: Store = {
    studentiStore: new StudentiStore(),
    profesoriStore: new ProfesoriStore(),
    libriStore: new LibriStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}