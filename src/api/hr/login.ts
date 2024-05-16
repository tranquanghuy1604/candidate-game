import axiosClient from "./axiosClient"

const loginApi = {
    async getLoginApi(data: any){
        const url = '/login'
        return await axiosClient.post(url,data)
    },
    
}

export default loginApi