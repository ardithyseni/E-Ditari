import { createContext, useContext } from "react";
import StudentiStore from './studentiStore';


interface StoreForStudents {

    studentiStore : StudentiStore
}

export const store: StoreForStudents = {
    studentiStore: new StudentiStore()
}

export const StoreContext = createContext(store);

export function useStudentiStore() {
    return useContext(StoreContext);
}