import axiosClient from "./axiosClient"

const editAssessmentApi = {
    async handleEditAssessmentApi(params: any){
        const url = `/edit-assessment`
        return await axiosClient.post(url,params)
    },
}

export default editAssessmentApi