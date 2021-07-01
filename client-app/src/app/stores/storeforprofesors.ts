import { createContext, useContext } from "react";
import ProfesoriStore from './profesoriStore';


interface StoreForProfesors {

    profesoriStore : ProfesoriStore
}

export const store: StoreForProfesors = {
    profesoriStore: new ProfesoriStore()
}

export const StoreContext = createContext(store);

export function useProfesoriStore() {
    return useContext(StoreContext);
}