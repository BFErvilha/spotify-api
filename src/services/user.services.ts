import { axiosInstance } from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/me'

export const getUserData = async () => {
	return axiosInstance.get(`${resource}`)
}

export const getTopArtists = async (params: any) => {
	const parameters = urlString(params)
	return axiosInstance.get(`${resource}/top/artists?${parameters}`)
}
