import { create } from "zustand";

interface State {
    data: any,
    upDateAuth: (item: string) => void,
}

const useAuth = create<State>((set) => ({
    data: null,
    upDateAuth: async (item : string) => {
      try {
        set(((state: State) => ({
            ...state,
            data: item
        })))
      } catch (error) {
        console.log(error);
      }
    } 
}))


export default useAuth