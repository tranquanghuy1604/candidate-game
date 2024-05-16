import axiosClient from "./axiosClient"

const getListGameApi = {
    async getListGameApi(){
        const url = '/list-game'
        return await axiosClient.get(url)
    },
}

export default getListGameApi