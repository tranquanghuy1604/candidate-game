import axiosClient from "./axiosClient"

const getListAssessment = {
    async handleGetListAssessmentApi(params: any){
        const url = '/list-assessment'
        
        return await axiosClient.get(url,{params})
    },
}

export default getListAssessment