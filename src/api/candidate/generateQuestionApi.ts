import axiosClientCandidate from "./axiosClientCandidate"


const generateQuestionApi = {
    async handleGetGenerateQuestionApi(params: any){
        const url = '/generate-question'
        return await axiosClientCandidate.post(url,params)
    },
}

export default generateQuestionApi