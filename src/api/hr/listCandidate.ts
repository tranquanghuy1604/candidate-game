import axiosClient from "./axiosClient"

const getListCandidateApi = {
    async handleGetListCandidateApi(params : any){
        const url = '/list-candidate'
        return await axiosClient.get(url, {params: params})
    },
}



export default getListCandidateApi

