import axiosClient from "./axiosClient"

const detailAssessmentApi = {
    async handleGetDetailAssessmentApi(param: any){
        const url = `/detail-assessment?assessment_id=${param}`
        return await axiosClient.get(url,param)
    },
}

export default detailAssessmentApi