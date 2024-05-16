import getListGameApi from "@/api/candidate/listGameApi";
import { useState } from "react";
import { create } from "zustand";

interface State{
    isLoading: boolean,
    data: any,
    getListGame: any
}

const useListGame = create((set) => ({
    isLoading: false,
    data: null,
    getListGame: async () => {
        try {
              const res = await getListGameApi.handleGetListGameApi();
              set((state: State) => ({
                ...state,
                data: res?.data?.data?.games,
                isLoading: true
              }));          
          } catch (error) {
            set((state: State) => ({
                ...state,
                isLoading:false
              }));
          }
    },
}))


export default useListGame