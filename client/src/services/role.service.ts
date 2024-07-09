import axios from "axios"
import api from "../api-client"
import { ApiConstants } from "../utils/ApiConstants"

class RoleService {

    static async getRoles() {
        try {
            const response = await api.get(ApiConstants.getRoles)
            return response.data
        } catch (error) {
            console.error("Error checking connection:", error)
            throw new Error("Error checking connection")
        }
    }

    static async addRole(data) {
        try {
            const response = await api.post(`${ApiConstants.addRole}`, data)
            return response.data
        } catch (error) {
            console.error("Error adding role:", error)
            return { success: false, message: error.message || "Bad Response!" }
        }
    }

    static async updateRole(data) {
        try {
            const response = await api.post(`${ApiConstants.updateRole}`, data)
            return response.data
        } catch (error) {
            console.error("Error adding role:", error)
            return { success: false, message: error.message || "Bad Response!" }
        }
    }

    static async deleteRole(data) {
        try {
            const response = await api.post(`${ApiConstants.deleteRole}`, data)
            return response.data
        } catch (error) {
            console.error("Error adding role:", error)
            return { success: false, message: error.message || "Bad Response!" }
        }
    }

}

export default RoleService