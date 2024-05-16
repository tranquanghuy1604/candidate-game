import axiosClient from "./axiosClient"

const copyAssessmentApi = {
    async handleCopyAssessmentApi(data: any){
        const url = '/copy-assessment'
        return await axiosClient.post(url,data )
    },
}

export default copyAssessmentApi