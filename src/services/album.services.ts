import { axiosInstance } from '@/libs/axios'

const resource = '/albums'

export const getAlbumDetails = async (id: string) => {
	return axiosInstance.get(`${resource}/${id}`)
}
