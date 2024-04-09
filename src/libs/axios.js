import axios from 'axios'
import { refreshAccessToken } from '@/services/auth.services'

const axiosInstance = axios.create({
	baseURL: 'https://api.spotify.com/v1',
})

axiosInstance.interceptors.request.use(config => {
	let token = localStorage.getItem('tokenSpotify')

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

axiosInstance.interceptors.response.use(
	response => {
		return response
	},
	async error => {
		if (error.response && error.response.data.error && error.response.data.error.message === 'The access token expired') {
			try {
				console.log('chamando refreshToken')
				const newAccessToken = await refreshAccessToken()
				localStorage.setItem('tokenSpotify', newAccessToken)

				error.config.headers['Authorization'] = `Bearer ${newAccessToken}`
				return axios(error.config)
			} catch (refreshError) {
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	},
)

export { axiosInstance }
