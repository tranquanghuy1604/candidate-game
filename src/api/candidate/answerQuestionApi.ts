import axiosClient from "../hr/axiosClient"
import axiosClientCandidate from "./axiosClientCandidate"


const answerQuestionApi = {
    async handleGetQuestionAnswerApi(params: any){
        const url = '/answer-question'
        return await axiosClientCandidate.post(url, params )
    },
}

export default answerQuestionApi