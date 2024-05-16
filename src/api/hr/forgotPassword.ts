import axiosClient from "./axiosClient"

const getForgotPassword = {
    async getForgotPasswordApi(data: any){
        const url = '/forgot-password'
        return await axiosClient.post(url,data)
    },
}

export default getForgotPassword