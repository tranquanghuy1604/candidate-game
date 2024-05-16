import axiosClient from "./axiosClient"

const createAssessmentApi = {
    async handleCreateAssessmentApi(data: any){
        const url = '/create-assessment'
        return await axiosClient.post(url,data)
    },
    
}

export default createAssessmentApi