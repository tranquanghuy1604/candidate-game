import axiosClient from "./axiosClient"

const loginApi = {
    async handleLoginApi(params : any){
        const url = '/logout'
        return await axiosClient.post(url)
    },
    
}

export default loginApi