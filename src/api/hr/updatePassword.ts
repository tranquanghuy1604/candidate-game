import axiosClient from "./axiosClient"

const updatePasswordApi = {
    async updatePassword(data: any){
        const url = '/update-password'
        return await axiosClient.post(url,data)
    },
}

export default updatePasswordApi