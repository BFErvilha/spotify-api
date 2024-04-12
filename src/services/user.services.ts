import { axiosInstance } from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/me'
const resourceUser = '/users'

export const getUserData = async () => {
	return axiosInstance.get(`${resource}`)
}

export const getTopArtists = async (params: any) => {
	const parameters = urlString(params)
	return axiosInstance.get(`${resource}/top/artists?${parameters}`)
}

export const getUserPlaylists = async (id: string, params: any) => {
	const parameters = urlString(params)
	return axiosInstance.get(`${resourceUser}/${id}/playlists?${parameters}`)
}

export const postUserPlaylist = async (id: string, params: any) => {
	return axiosInstance.post(`${resourceUser}/${id}/playlists`, params)
}
