import axiosClient from "./axiosClient"

const unArchiveAssessmentApi = {
    async handleUnArchiveAssessmentApi(data: any){
        const url = '/unarchive-assessment'
        return await axiosClient.post(url,data)
    },
}

export default unArchiveAssessmentApi