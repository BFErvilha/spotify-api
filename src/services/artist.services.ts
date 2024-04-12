import { axiosInstance } from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/artists'

type Params = {
	[key: string]: string | number | boolean
}

export const getArtistDetails = async (id: string) => {
	return axiosInstance.get(`${resource}/${id}`)
}

export const getAlbums = async (id: string, params: Params) => {
	const parameters = urlString(params)
	return axiosInstance.get(`${resource}/${id}/albums?${parameters}`)
}

export const getTopTracks = async (id: string) => {
	return axiosInstance.get(`${resource}/${id}/top-tracks`)
}

export const getRelatedArtists = async (id: string) => {
	return axiosInstance.get(`${resource}/${id}/related-artists`)
}
