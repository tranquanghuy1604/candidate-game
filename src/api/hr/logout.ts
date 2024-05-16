import axiosClient from "./axiosClient"

const logoutApi = {
    async handleGetLogoutApi(){
        const url = '/logout'
        return await axiosClient.post(url)
    },
    
}

export default logoutApi