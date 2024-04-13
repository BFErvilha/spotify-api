import axios from 'axios'
import { refreshAccessToken } from '@/services/auth.services'

const axiosInstance = axios.create({
	baseURL: 'https://api.spotify.com/v1',
})

function getToken() {
	return localStorage.getItem('tokenSpotify')
}

axiosInstance.interceptors.request.use(
	config => {
		const token = getToken()

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config
		if (error.response && error.response.data.error && error.response.data.error.message === 'The access token expired' && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				const newAccessToken = await refreshAccessToken()
				localStorage.setItem('tokenSpotify', newAccessToken)
				originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
				return axiosInstance(originalRequest)
			} catch (refreshError) {
				return Promise.reject(refreshError)
			}
		}
		return Promise.reject(error)
	},
)

export { axiosInstance }
