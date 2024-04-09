import { axiosInstance } from '@/libs/axios'

const resource = '/me'

export const getUserData = async () => {
	return axiosInstance.get(`${resource}`)
}
