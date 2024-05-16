import axiosClient from "../hr/axiosClient"


const candidateLoginApi = {
    async handleCandidateLoginApi(param: any){
        const url = '/candidate-login'
        return await axiosClient.post(url, param )
    },
}

export default candidateLoginApi