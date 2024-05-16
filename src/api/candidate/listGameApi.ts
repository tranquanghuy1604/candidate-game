import axiosClientCandidate from "./axiosClientCandidate"


const getListGameApi = {
    async handleGetListGameApi(){
        const url = '/list-game'
        return await axiosClientCandidate.get(url)
    },
}

export default getListGameApi