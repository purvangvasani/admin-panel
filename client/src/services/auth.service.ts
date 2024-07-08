import axios from "axios"
import api from "../api-client"
import { ApiConstants } from "../utils/ApiConstants"

class AuthService {

    static async verifySession() {
        try {
            const response = await api.get(ApiConstants.verifySession)
            console.log(response)
            return response
        } catch (error) {
            console.error("Error checking connection:", error)
            throw new Error("Error checking connection")
        }
    }

    static async registerUser(data) {
        try {
            const response = await api.post(`${ApiConstants.register}`, data)
            return response.data
        } catch (error) {
            console.error("Error registering user:", error)
            return { success: false, message: error.message || "Bad Response!" }
        }
    }

    static async login(data) {
        try {
            const authorization = window.btoa(data.email + ':' + data.password);
            const response = await axios.post(`${ApiConstants.login}`, data, {
                headers: {
                    'Authorization': 'Basic ' + authorization,
                    'Content-Type': 'application/json',
                    "customer": "HIIII"
                }
            })
            // const response = await api.post(`${ApiConstants.login}`, data)
            return response.data
        } catch (error) {
            console.error("Error registering user:", error)
            return { success: false, message: error.message || "Bad Response!" }
        }
    }

}

export default AuthService