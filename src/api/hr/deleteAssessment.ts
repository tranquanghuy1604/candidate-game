import axiosClient from "./axiosClient"

const deleteAssessmentApi = {
    async handleDeleteAssessmentApi(param: any){
        const url = '/delete-assessment'
        return await axiosClient.post(url, param )
    },
}

export default deleteAssessmentApi