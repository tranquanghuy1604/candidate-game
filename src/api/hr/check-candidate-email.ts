import axiosClient from "./axiosClient"

const checkCandidateEmailApi = {
    async handleCheckCandidateEmailApi(param: any){
        const url = '/check-candidate-email'
        return await axiosClient.post(url, param )
    },
}

export default checkCandidateEmailApi