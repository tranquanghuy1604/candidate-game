import axiosClientCandidate from "./axiosClientCandidate"


const finishGameApi = {
    async handleFinishGameApi(params: any){
        const url = '/finish-game'
        return await axiosClientCandidate.post(url,params)
    },
}

export default finishGameApi