import { createContext, useContext } from "react";
import CategoryStore from "./categoryStore";
import CommonStore from "./commonStore";

interface Store{
    categoryStore: CategoryStore;
    commonStore: CommonStore;
}

export const store: Store ={
    categoryStore: new CategoryStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext)
}