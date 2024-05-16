import axiosClient from "./axiosClient"

const inviteCandidateApi = {
    async handleInviteCandidateApi(params: any){
        const url = '/invite-candidate'
        return await axiosClient.post(url, params )
    },
}

export default inviteCandidateApi