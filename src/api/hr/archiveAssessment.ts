import axiosClient from "./axiosClient"

const archiveAssessmentApi = {
    async handleArchiveAssessmentApi(data: any){
        const url = '/archive-assessment'
        return await axiosClient.post(url,data )
    },
}

export default archiveAssessmentApi